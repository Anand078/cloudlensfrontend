import React, { useState, useEffect, useRef } from "react"
import { Table, Button, Row, Col, Spinner, Container, Input } from "reactstrap"
import Pagination from "react-js-pagination"
import isEqual from "lodash/isEqual"

const useEditableState = (data, initialValue = false) => {
  return data.reduce((ts, item) => {
    ts[item.id] = initialValue
    return ts
  }, {})
}

const EditableInput = ({
  id,
  value,
  editable,
  onChange,
  onBlur,
  inputRef,
  autoFocus,
}) =>
  editable ? (
    <Input
      type="text"
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      innerRef={inputRef}
      data-id={id}
      autoFocus={autoFocus}
    />
  ) : (
    value
  )

const TechSessions = () => {
  const baseUrl = process.env.REACT_APP_BASE_URL
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)
  const [editableState, setEditableState] = useState({
    topics: useEditableState(data),
    links: useEditableState(data),
  })
  const [isSaving, setIsSaving] = useState(false)
  const [initialData, setInitialData] = useState([])
  const inputRefs = useRef({})
  const [searchTerm, setSearchTerm] = useState("")

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentData = data.slice(indexOfFirstItem, indexOfLastItem)

  const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber)
  }

  const fetchData = async () => {
    try {
      const [tsResp] = await Promise.all([fetch(baseUrl + "/techsession")])
      const tsData = await tsResp.json()

      const filteredData = tsData.data.filter(item =>
        Object.values(item).some(value =>
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      )

      setData(filteredData)
      setInitialData(filteredData)
      setEditableState({
        topics: useEditableState(filteredData),
        links: useEditableState(filteredData),
      })

      setIsLoading(false)
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  const generateNegativeNumber = () => {
    const randomNumber = Math.floor(Math.random() * Math.pow(10, 6))
    const negativeNumber = -1 * randomNumber
    return negativeNumber
  }

  const handleAddRow = () => {
    const newId = generateNegativeNumber()
    const newRow = {
      id: newId,
      topic: "",
      link: "",
      updatedon: new Date(),
    }

    setData(prevData => [newRow, ...prevData])
    setEditableState(prevState => ({
      ...prevState,
      topics: { ...prevState.topics, [newId]: true },
      links: { ...prevState.links, [newId]: true },
    }))
  }

  useEffect(() => {
    fetchData()
  }, [searchTerm])

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

  const handleEditToggle = (field, id) => {
    setEditableState(prevState => ({
      ...prevState,
      [field]: { ...prevState[field], [id]: !prevState[field][id] },
    }))
  }

  const handleTopicsChange = (id, event) => {
    const updatedData = data.map(item =>
      item.id === id
        ? { ...item, topic: event.target.value, updatedon: new Date() }
        : item
    )
    setData(updatedData)
  }

  const handleLinksChange = (id, event) => {
    const updatedData = data.map(item =>
      item.id === id
        ? { ...item, link: event.target.value, updatedon: new Date() }
        : item
    )
    setData(updatedData)
  }
  const handleBlur = id => {
    setEditableState(prevState => ({
      ...prevState,
      topics: { ...prevState.topics, [id]: false },
      links: { ...prevState.links, [id]: false },
    }))
  }

  const handleInputRef = (id, ref) => {
    inputRefs.current[id] = ref
  }

  const handleSearchChange = event => {
    setSearchTerm(event.target.value)
  }

  const handleSave = async () => {
    try {
      setIsSaving(true)

      const modifiedData = data.filter(
        item =>
          !isEqual(
            item,
            initialData.find(initialItem => initialItem.id === item.id)
          )
      )

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
    debugger
    try {
      const response = await fetch(baseUrl + "/techsession", {
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
      console.log("saved successfully")
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
  const formatDate = dateString => {
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }
    return new Date(dateString).toLocaleString(undefined, options)
  }
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
              <Button color="primary" disabled={isSaving} onClick={handleSave}>
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
                      <th
                        style={{
                          width: "25%",
                        }}
                        scope="col"
                      >
                        Date
                      </th>
                      <th
                        style={{
                          width: "50%",
                        }}
                        scope="col"
                      >
                        Topic
                      </th>
                      <th
                        style={{
                          width: "20%",
                        }}
                        scope="col"
                      >
                        Recording Link
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentData.map(item => (
                      <tr key={item.id}>
                        <td
                          className="text-left"
                          style={{
                            width: "20%",
                          }}
                        >
                          {formatDate(item.updatedon)}
                        </td>
                        <td
                          onDoubleClick={() =>
                            handleEditToggle("topics", item.id)
                          }
                          style={{
                            width: "60%",
                            whiteSpace: "pre-line",
                          }}
                        >
                          {editableState.topics[item.id] ? (
                            <EditableInput
                              id={item.id}
                              value={item.topic}
                              editable={editableState.topics[item.id]}
                              onChange={e => handleTopicsChange(item.id, e)}
                              onBlur={() => handleBlur(item.id)}
                              inputRef={ref => handleInputRef(item.id, ref)}
                            />
                          ) : (
                            item.topic
                          )}
                        </td>
                        <td
                          onDoubleClick={() =>
                            handleEditToggle("links", item.id)
                          }
                          style={{
                            width: "20%",
                            whiteSpace: "nowrap", // Add this style to prevent line breaks
                            overflow: "hidden", // Add this style to handle overflow
                            textOverflow: "ellipsis", // Add this style to show an ellipsis for overflow
                          }}
                        >
                          {editableState.links[item.id] ? (
                            <EditableInput
                              id={item.id}
                              value={item.link}
                              editable={editableState.links[item.id]}
                              onChange={e => handleLinksChange(item.id, e)}
                              onBlur={() => handleBlur(item.id)}
                              inputRef={ref => handleInputRef(item.id, ref)}
                            />
                          ) : (
                            <a href={`${item.link}`} target="_blank">
                              Link
                            </a>
                          )}
                        </td>
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
                totalItemsCount={data.length}
                pageRangeDisplayed={5}
                itemClass="page-item"
                linkClass="page-link"
                onChange={handlePageChange}
              />
            </Col>
          </Row>
        </Container>
      )}
    </>
  )
}

export default TechSessions
