import React, { useState, useEffect, useRef } from "react"
import {
  Table,
  Button,
  Row,
  Col,
  Spinner,
  Container,
  Input,
  InputGroup,
} from "reactstrap"
import Pagination from "react-js-pagination"
import isEqual from "lodash/isEqual"
import Flatpickr from "react-flatpickr"
import "flatpickr/dist/themes/material_green.css"

const useEditableState = (data, initialValue = false) => {
  return data.reduce((blog, item) => {
    blog[item.id] = initialValue
    return blog
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

const Blog = () => {
  const baseUrl = process.env.REACT_APP_BASE_URL
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)
  const [editableState, setEditableState] = useState({
    subject: useEditableState(data),
    updatedon: useEditableState(data),
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

  const handleDateChange = (id, date) => {
    try {
      const utcDateString = new Date(
        date.getTime() - date.getTimezoneOffset() * 60000
      ).toISOString()

      setData(prevData =>
        prevData.map(item =>
          item.id === id ? { ...item, updatedon: utcDateString } : item
        )
      )
    } catch (error) {
      console.error("Error handling date change:", error)
    }
  }

  const fetchData = async () => {
    try {
      const [blogResp] = await Promise.all([fetch(baseUrl + "/blog")])
      const blogData = await blogResp.json()

      const filteredData = blogData.data.filter(item =>
        Object.values(item).some(value =>
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      )

      setData(filteredData)
      setInitialData(filteredData)
      setEditableState({
        subject: useEditableState(filteredData),
        updatedon: useEditableState(filteredData),
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
      subject: "",
      updatedon: new Date(),
    }

    setData(prevData => [newRow, ...prevData])
    setEditableState(prevState => ({
      ...prevState,
      subject: { ...prevState.subject, [newId]: true },
    }))
  }

  useEffect(() => {
    fetchData()
  }, [searchTerm]) // Update useEffect to include searchTerm

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

  const handleSubjectChange = (id, event) => {
    const updatedData = data.map(item =>
      item.id === id ? { ...item, subject: event.target.value } : item
    )
    setData(updatedData)
  }

  const handleBlur = id => {
    setEditableState(prevState => ({
      ...prevState,
      subject: { ...prevState.subject, [id]: false },
    }))
  }

  const handleInputRef = (id, ref) => {
    inputRefs.current[id] = ref
  }

  const handleSearchChange = event => {
    setSearchTerm(event.target.value)
  }

  const handleReloadClick = async () => {
    setIsLoading(true)
    try {
      await fetchData()
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async () => {
    try {
      debugger
      setIsSaving(true)

      const modifiedData = data.filter(
        item =>
          !isEqual(
            item,
            initialData.find(initialItem => initialItem.id === item.id)
          )
      )

      if (modifiedData.length > 0) {
        await saveData(modifiedData)
        await fetchData()
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
      const response = await fetch(baseUrl + "/blog", {
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

  const formatDate = dateString => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }
    return new Date(dateString).toLocaleString(undefined, options)
  }

  const EditableDate = ({ id, value, editable, onChange }) => {
    const parsedDate = value ? new Date(value) : new Date()

    return editable ? (
      <InputGroup>
        <Flatpickr
          className="form-control d-block"
          options={{
            altInput: true,
            altFormat: "Y-m-d",
            dateFormat: "Y-m-d",
          }}
          value={parsedDate}
          onChange={date => onChange(id, date[0])}
        />
      </InputGroup>
    ) : (
      formatDate(parsedDate)
    )
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
                      <th style={{ width: "80%" }}>Subject</th>
                      <th style={{ width: "20%" }}>Publish Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentData.map((item, index) => {
                      console.log("Current Item:", item)
                      console.log("Index:", index)

                      if (!item) {
                        console.error("Item is undefined or null:", item)
                        return null
                      }

                      const { id, subject, updatedon } = item

                      console.log("ID:", id)
                      console.log("Subject:", subject)
                      console.log("UpdatedOn:", updatedon)

                      return (
                        <tr key={id}>
                          <td
                            onDoubleClick={() =>
                              handleEditToggle("subject", id)
                            }
                            style={{
                              width: "80%",
                              whiteSpace: "pre-line",
                            }}
                          >
                            {editableState.subject[id] ? (
                              <EditableInput
                                id={id}
                                value={subject}
                                editable={editableState.subject[id]}
                                onChange={e => handleSubjectChange(id, e)}
                                onBlur={() => handleBlur(id)}
                                inputRef={ref => handleInputRef(id, ref)}
                              />
                            ) : (
                              subject
                            )}
                          </td>
                          <td
                            onDoubleClick={() =>
                              handleEditToggle("updatedon", id)
                            }
                            style={{ width: "20%" }}
                          >
                            <EditableDate
                              id={id}
                              value={updatedon || new Date()}
                              editable={editableState.updatedon[id]}
                              onChange={(id, date) =>
                                handleDateChange(id, date)
                              }
                            />
                          </td>
                        </tr>
                      )
                    })}
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

export default Blog
