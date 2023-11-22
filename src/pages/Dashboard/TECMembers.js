import React, { useState, useEffect, useRef } from "react"
import { Table, Input, Button, Row, Col, Spinner, Container } from "reactstrap"
import Switch from "react-switch"
import Pagination from "react-js-pagination"
import isEqual from "lodash/isEqual"
import TimelineModal from "./TECTimeline"

const OffSymbol = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      fontSize: 12,
      color: "#fff",
      paddingRight: 2,
    }}
  >
    No
  </div>
)

const OnSymbol = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      fontSize: 12,
      color: "#fff",
      paddingRight: 2,
    }}
  >
    Yes
  </div>
)

const generateNegativeNumber = () => {
  const randomNumber = Math.floor(Math.random() * Math.pow(10, 6))
  const negativeNumber = -1 * randomNumber
  return negativeNumber
}

const TECMember = () => {
  const baseUrl = process.env.REACT_APP_BASE_URL
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState([])
  const [switches, setSwitches] = useState({})
  const [editableProjects, setEditableProjects] = useState({})
  const [editableMembers, setEditableMembers] = useState({})
  const [editableComments, setEditableComments] = useState({})
  const inputRefs = useRef({})
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)
  const [initialData, setInitialData] = useState([])
  const [searchTerm, setSearchTerm] = useState("")

  const [isSaving, setIsSaving] = useState(false)

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage

  const filteredData = data.filter(item => {
    const member = item.member ? item.member.toLowerCase() : ""
    const project = item.project ? item.project.toLowerCase() : ""
    const comments = item.comments ? item.comments.toLowerCase() : ""

    return (
      member.includes(searchTerm.toLowerCase()) ||
      project.includes(searchTerm.toLowerCase()) ||
      comments.includes(searchTerm.toLowerCase())
    )
  })

  const handleSearchChange = event => {
    setSearchTerm(event.target.value)
  }

  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem)

  const [isTimelineModalOpen, setTimelineModalOpen] = useState(false)
  const activityData = [
    {
      date: "Nov 10 1:30PM",
      text: "Had a staring contest with the 'Loading...' spinner. It blinked first.",
    },
    {
      date: "Nov 8 4:45PM",
      text: "Tried to explain code to a rubber duck. The duck looked confused but nodded in agreement.",
    },
    {
      date: "Nov 6 10:15AM",
      text: "Accidentally pushed code to production while practicing my drumming on the keyboard. Surprisingly, no one noticed.",
    },
    {
      date: "Nov 4 3:20PM",
      text: "Attended a 'Stand-up' meeting while actually lying down. Nailed it!",
    },
  ]

  const [selectedProject, setSelectedProject] = useState(null)

  const toggleTimlineModal = project => {
    setTimelineModalOpen(!isTimelineModalOpen)
    setSelectedProject(project) // Store the selected project
  }

  // Change page
  const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber)
  }

  const fetchData = async () => {
    try {
      const [tecResp] = await Promise.all([fetch(baseUrl + "/tecmember")])
      const tecData = await tecResp.json()
      setData(tecData.data)
      setInitialData(tecData.data)
      setSwitches(
        tecData.data.reduce((acc, item) => {
          acc[item.id] = item.isavailable
          return acc
        }, {})
      )

      setEditableComments(
        tecData.data.reduce((acc, item) => {
          acc[item.id] = false
          return acc
        }, {})
      )
      setEditableMembers(
        tecData.data.reduce((acc, item) => {
          acc[item.id] = false
          return acc
        }, {})
      )
      setEditableProjects(
        tecData.data.reduce((acc, item) => {
          acc[item.id] = false
          return acc
        }, {})
      )
      setIsLoading(false)
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])
  const handleSwitchChange = id => {
    setSwitches(prevSwitches => ({
      ...prevSwitches,
      [id]: !prevSwitches[id],
    }))

    setData(prevData => {
      return prevData.map(item => {
        if (item.id === id) {
          return {
            ...item,
            isavailable: switches[id] ? 0 : 1, // Toggle the value
            updatedon: new Date(),
          }
        }
        return item
      })
    })
  }

  const handleProjectEditToggle = id => {
    setEditableProjects(prevEditableProjects => ({
      ...prevEditableProjects,
      [id]: !prevEditableProjects[id],
    }))
  }

  const handleMemberEditToggle = id => {
    setEditableMembers(prevEditableMembers => ({
      ...prevEditableMembers,
      [id]: !prevEditableMembers[id],
    }))
  }

  const handleCommentsEditToggle = (id, comment) => {
    setEditableComments(prevEditableComments => ({
      ...prevEditableComments,
      [id]: !prevEditableComments[id],
    }))
  }

  const handleProjectChange = (id, event) => {
    const updatedData = data.map(item => {
      if (item.id === id) {
        return {
          ...item,
          project: event.target.value,
          updatedon: new Date(),
        }
      }
      return item
    })

    setData(updatedData)
  }

  const handleMemberChange = (id, event) => {
    const updatedData = data.map(item => {
      if (item.id === id) {
        return {
          ...item,
          member: event.target.value,
          updatedon: new Date(),
        }
      }
      return item
    })

    setData(updatedData)
  }

  const handleCommentsChange = (id, event) => {
    const updatedData = data.map(item => {
      if (item.id === id) {
        return {
          ...item,
          comments: event.target.value,
          updatedon: new Date(),
        }
      }
      return item
    })

    setData(updatedData)
  }

  const handleBlur = id => {
    setEditableComments(prevEditableComments => ({
      ...prevEditableComments,
      [id]: false,
    }))
    setEditableMembers(prevEditableMembers => ({
      ...prevEditableMembers,
      [id]: false,
    }))
    setEditableProjects(prevEditableProjects => ({
      ...prevEditableProjects,
      [id]: false,
    }))
  }

  const handleInputRef = (id, ref) => {
    inputRefs.current[id] = ref
  }

  const handleSaveTec = async () => {
    try {
      setIsSaving(true)

      const modifiedData = data.filter(
        item =>
          !isEqual(
            item,
            initialData.find(initialItem => initialItem.id === item.id)
          )
      )

      modifiedData.forEach(item => {
        if (item.isavailable !== undefined) {
          item.isavailable = item.isavailable ? 1 : 0
        }
      })

      console.log("mod", modifiedData)

      if (modifiedData.length > 0) {
        await saveData(modifiedData)
        fetchData()
      } else {
        console.log("No changes to save.")
      }
    } catch (error) {
      console.error("Error saving data:", error)
    } finally {
      setIsSaving(false)
    }
  }

  const saveData = async modifiedData => {
    try {
      const response = await fetch(baseUrl + "/tecmember", {
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

  const handleAddRow = () => {
    const newId = generateNegativeNumber()
    const newRow = {
      id: newId,
      comments: "",
      project: "",
      member: "",
      updatedon: new Date(),
    }

    setData(prevData => [newRow, ...prevData])
    setSwitches(prevSwitches => ({ ...prevSwitches, [newId]: false }))
    setEditableComments(prevEditableComments => ({
      ...prevEditableComments,
      [newId]: true,
    }))
    setEditableMembers(prevEditableMembers => ({
      ...prevEditableMembers,
      [newId]: true,
    }))
    setEditableProjects(prevEditableProjects => ({
      ...prevEditableProjects,
      [newId]: true,
    }))
  }

  useEffect(() => {
    const handleClick = event => {
      Object.values(inputRefs.current).forEach(ref => {
        if (ref && !ref.contains(event.target)) {
          handleBlur(ref.getAttribute("data-id"))
        }
      })
    }

    document.addEventListener("mousedown", handleClick)

    return () => {
      document.removeEventListener("mousedown", handleClick)
    }
  }, [])

  return (
    <>
      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center">
          <Spinner type="grow" className="ms-2" color="success" />
          <Spinner type="grow" className="ms-2" color="danger" />
          <Spinner type="grow" className="ms-2" color="warning" />
          <Spinner type="grow" className="ms-2" color="info" />
        </div>
      ) : (
        <Container fluid>
          <Row className="mb-2">
            <Col sm="6">
              <h4 className="card-title">TEC Members Snapshot</h4>
            </Col>
            <Col
              sm="6"
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
              />
              <Button color="primary" onClick={handleAddRow}>
                <i className="ion ion-md-add"></i>
              </Button>
              <Button
                color="primary"
                onClick={handleSaveTec}
                disabled={isSaving}
              >
                {isSaving ? (
                  <Spinner size="sm" color="light" />
                ) : (
                  <i className="ion ion-md-save"></i>
                )}
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
                      <th scope="col">TEC Member</th>
                      <th scope="col">Project</th>
                      <th scope="col">Availability</th>
                      <th scope="col">Comments</th>
                      <th scope="col">Last updated</th>
                      <th scope="col">Activity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentData.map(item => (
                      <tr key={item.id}>
                        <td
                          className="text-left"
                          onDoubleClick={() => handleMemberEditToggle(item.id)}
                        >
                          {editableMembers[item.id] ? (
                            <Input
                              type="text"
                              value={item.member}
                              onChange={e => handleMemberChange(item.id, e)}
                              onBlur={() => handleBlur(item.id)}
                              innerRef={ref => handleInputRef(item.id, ref)}
                              data-id={item.id}
                              autoFocus={item.id === data[0].id} // Add autoFocus to focus on the first row's "Member" input
                            />
                          ) : (
                            item.member
                          )}
                        </td>
                        <td
                          className="text-left"
                          onDoubleClick={() => handleProjectEditToggle(item.id)}
                        >
                          {editableProjects[item.id] ? (
                            <Input
                              type="text"
                              value={item.project}
                              name="project"
                              onChange={e => handleProjectChange(item.id, e)}
                              onBlur={() => handleBlur(item.id)}
                              innerRef={ref => handleInputRef(item.id, ref)}
                              data-id={item.id}
                            />
                          ) : (
                            item.project
                          )}
                        </td>
                        <td className="text-left">
                          <Switch
                            uncheckedIcon={<OffSymbol />}
                            name="isavailable"
                            checkedIcon={<OnSymbol />}
                            offColor="#f1734f"
                            onColor="#02a499"
                            onChange={() => handleSwitchChange(item.id)}
                            checked={Boolean(switches[item.id])}
                            height={19}
                          />
                        </td>
                        <td
                          className="text-left"
                          onDoubleClick={() =>
                            handleCommentsEditToggle(item.id)
                          }
                        >
                          {editableComments[item.id] ? (
                            <Input
                              type="text"
                              value={item.comments}
                              name="comments" // Set the name attribute to "comments"
                              onChange={e => handleCommentsChange(item.id, e)}
                              onBlur={() => handleBlur(item.id)}
                              innerRef={ref => handleInputRef(item.id, ref)}
                              data-id={item.id}
                            />
                          ) : (
                            item.comments
                          )}
                        </td>
                        <td className="text-left">
                          {new Date(item.updatedon).toLocaleDateString()}
                        </td>
                        <td className="text-left">
                          <i
                            style={{
                              paddingLeft: "16px",
                              cursor: "pointer",
                              fontSize: "22px",
                            }}
                            className="ion ion-md-time"
                            onClick={() => toggleTimlineModal(item.project)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <TimelineModal
                  isOpen={isTimelineModalOpen}
                  toggle={() => toggleTimlineModal(null)}
                  activityData={activityData}
                  selectedProject={selectedProject}
                />
              </div>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col style={{ display: "flex", justifyContent: "end" }}>
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={itemsPerPage}
                totalItemsCount={data.length}
                pageRangeDisplayed={5}
                onChange={handlePageChange}
                itemClass="page-item"
                linkClass="page-link"
              />
            </Col>
          </Row>
        </Container>
      )}
    </>
  )
}

export default TECMember
