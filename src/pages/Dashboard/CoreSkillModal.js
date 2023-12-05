import React, { useState, useEffect, useRef } from "react"
import {
  Modal,
  ModalBody,
  ModalHeader,
  Spinner,
  Container,
  Row,
  Col,
  Input,
  Button,
  Table,
} from "reactstrap"
import Pagination from "react-js-pagination"
import isEqual from "lodash/isEqual"

const CoreSkillMaster = ({ isOpen, toggle }) => {
  const baseUrl = process.env.REACT_APP_BASE_URL

  const [skillData, setSkillData] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [editableSkills, setEditableSkills] = useState({})
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)
  const [initialData, setInitialData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const inputRefs = useRef({})
  const handleSearchChange = event => {
    setSearchTerm(event.target.value)
  }
  const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber)
  }
  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage

  const filteredData = skillData.filter(item => {
    const skill = item.skill ? item.skill.toLowerCase() : ""

    return skill.includes(searchTerm.toLowerCase())
  })

  const formatDateTime = dateTimeString => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
    const formattedDate = new Date(dateTimeString).toLocaleString(
      "en-US",
      options
    )
    return formattedDate
  }

  const fetchData = async () => {
    try {
      setLoading(true)

      const skillResp = await fetch(baseUrl + "/skills")
      const data = await skillResp.json()
      setSkillData(data.data)
      setInitialData(data.data)
    } catch (error) {
      console.error("Error fetching data from the API:", error)
    } finally {
      setLoading(false)
    }
  }
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem)
  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (isOpen && skillData.length === 0) {
      fetchData()
    }
  }, [isOpen])

  const generateNegativeNumber = () => {
    const randomNumber = Math.floor(Math.random() * Math.pow(10, 6))
    const negativeNumber = -1 * randomNumber
    return negativeNumber
  }

  const handleAddRow = () => {
    const newId = generateNegativeNumber()
    const newRow = {
      id: newId,
      skill: "",
      updatedon: new Date(),
    }

    setSkillData(prevData => [newRow, ...prevData])
    setEditableSkills(prevEditableSkills => ({
      ...prevEditableSkills,
      [newId]: true,
    }))
  }

  const handleInputRef = (id, ref) => {
    inputRefs.current[id] = ref
  }

  const handleBlur = id => {
    setEditableSkills(prevEditableSkills => ({
      ...prevEditableSkills,
      [id]: false,
    }))
  }

  const handleSkillEditToggle = id => {
    setEditableSkills(prevEditableSkills => ({
      ...prevEditableSkills,
      [id]: !prevEditableSkills[id],
    }))
  }

  const handleSkillChange = (id, event) => {
    const updatedData = skillData.map(item => {
      if (item.id === id) {
        return {
          ...item,
          skill: event.target.value,
        }
      }
      return item
    })

    setSkillData(updatedData)
  }
  const handleSaveCoreSkills = async () => {
    try {
      setIsSaving(true)

      const modifiedData = skillData.filter(
        item =>
          !isEqual(
            item,
            initialData.find(initialItem => initialItem.id === item.id)
          )
      )

      if (modifiedData.length > 0) {
        await saveData(modifiedData)
        fetchData()
      } else {
        console.log("No changes to save.")
      }
    } catch (error) {
      console.error("Error saving data :", error)
    } finally {
      setIsSaving(false)
    }
  }

  const saveData = async modifiedData => {
    try {
      const response = await fetch(baseUrl + "/skills", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(modifiedData),
      })

      if (!response.ok) {
        throw new Error("Failed to save data")
      }
    } catch (error) {
      console.error("Error saving data:", error)
    }
  }
  const handleReloadClick = async () => {
    setIsLoading(true)
    try {
      await fetchData()
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
      centered
      size="lg"
      style={{ maxHeight: "100vh" }}
    >
      <ModalHeader toggle={toggle}>Core Skill Master</ModalHeader>
      <ModalBody
        className="timeline-scrollbar"
        style={{ maxHeight: "100vh", overflowY: "auto" }}
      >
        {loading ? (
          <div className="d-flex justify-content-center align-items-center">
            <Spinner type="grow" className="ms-2" color="success" />
            <Spinner type="grow" className="ms-2" color="danger" />
            <Spinner type="grow" className="ms-2" color="warning" />
            <Spinner type="grow" className="ms-2" color="info" />
          </div>
        ) : (
          <Container fluid>
            <Row className="mb-2">
              <Col
                sm="12"
                style={{
                  display: "flex",
                  justifyContent: "end",
                  gap: "0.3rem",
                }}
              >
                <Input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  style={{ width: "15rem" }}
                />

                <Button color="primary" onClick={handleAddRow}>
                  <i className="ion ion-md-add"></i>
                </Button>
                <Button
                  color="primary"
                  onClick={handleSaveCoreSkills}
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <Spinner size="sm" color="light" />
                  ) : (
                    <i className="ion ion-md-save"></i>
                  )}
                </Button>
                <Button color="primary" onClick={handleReloadClick}>
                  <i className="mdi mdi-reload"></i>
                </Button>
              </Col>
            </Row>
            <Row>
              <Col sm="12">
                <div className="table-responsive">
                  <Table
                    className="table table-hover table-centered table-nowrap mb-0"
                    style={{ backgroundColor: "white" }}
                  >
                    <thead>
                      <tr>
                        <th scope="col">Core Skill</th>
                        <th scope="col">Last updated</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentData.map(item => (
                        <tr key={item.id}>
                          <td
                            className="text-left"
                            onDoubleClick={() => handleSkillEditToggle(item.id)}
                          >
                            {editableSkills[item.id] ? (
                              <Input
                                type="text"
                                value={item.skill}
                                onChange={e => handleSkillChange(item.id, e)}
                                onBlur={() => handleBlur(item.id)}
                                innerRef={ref => handleInputRef(item.id, ref)}
                                data-id={item.id}
                                autoFocus={item.id === skillData[0].id}
                              />
                            ) : (
                              item.skill
                            )}
                          </td>
                          <td> {formatDateTime(item.updatedon)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col style={{ display: "flex", justifyContent: "end" }}>
                <Pagination
                  activePage={currentPage}
                  itemsCountPerPage={itemsPerPage}
                  totalItemsCount={skillData.length}
                  pageRangeDisplayed={5}
                  onChange={handlePageChange}
                  itemClass="page-item"
                  linkClass="page-link"
                />
              </Col>
            </Row>
          </Container>
        )}
      </ModalBody>
    </Modal>
  )
}

export default CoreSkillMaster
