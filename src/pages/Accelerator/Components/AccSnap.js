import React, { useState, useEffect, useRef } from "react"
import { Table, Button, Row, Col, Spinner, Container, Input } from "reactstrap"
import Pagination from "react-js-pagination"
import ActivityModal from "./AccActivity"
import isEqual from "lodash/isEqual"

const useEditableState = (data, initialValue = false) => {
  return data.reduce((acc, item) => {
    acc[item.id] = initialValue
    return acc
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

const AccSnap = () => {
  const baseUrl = process.env.REACT_APP_BASE_URL
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)
  const [editableState, setEditableState] = useState({
    accNames: useEditableState(data),
    versions: useEditableState(data),
    timelines: useEditableState(data),
    resRequirements: useEditableState(data),
    blockers: useEditableState(data),
    comments: useEditableState(data),
  })
  const [isSaving, setIsSaving] = useState(false)
  const [initialData, setInitialData] = useState([])
  const inputRefs = useRef({})
  const [searchTerm, setSearchTerm] = useState("") // Step 1

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentData = data.slice(indexOfFirstItem, indexOfLastItem)

  const [isActivityModalOpen, setActivityModalOpen] = useState(false)
  const [selectedAccName, setSelectedAccName] = useState(null)
  const [selectedAcceleratorId, setSelectedAcceleratorId] = useState(null)

  const toggleActivityModal = (accid, accname) => {
    setActivityModalOpen(!isActivityModalOpen)
    setSelectedAcceleratorId(accid)
    setSelectedAccName(accname)
  }

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

  const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber)
  }

  const fetchData = async () => {
    try {
      const [accSnapResp] = await Promise.all([fetch(baseUrl + "/accsnap")])
      const accSnapData = await accSnapResp.json()

      const filteredData = accSnapData.data.filter(item =>
        Object.values(item).some(value =>
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      )

      setData(filteredData)
      setInitialData(filteredData)

      setEditableState({
        accNames: useEditableState(filteredData),
        versions: useEditableState(filteredData),
        timelines: useEditableState(filteredData),
        resRequirements: useEditableState(filteredData),
        blockers: useEditableState(filteredData),
        comments: useEditableState(filteredData),
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
      accname: "",
      version: "",
      indicativetimeline: "",
      resourcerequirement: "",
      blocker: "",
      comments: "",
      updatedon: new Date(),
    }

    setData(prevData => [newRow, ...prevData])
    setEditableState(prevState => ({
      ...prevState,
      accNames: { ...prevState.accNames, [newId]: true },
      versions: { ...prevState.versions, [newId]: true },
      timelines: { ...prevState.timelines, [newId]: true },
      resRequirements: { ...prevState.resRequirements, [newId]: true },
      blockers: { ...prevState.blockers, [newId]: true },
      comments: { ...prevState.comments, [newId]: true },
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

  const handleAccNamesChange = (id, event) => {
    const updatedData = data.map(item =>
      item.id === id
        ? { ...item, accname: event.target.value, updatedon: new Date() }
        : item
    )
    setData(updatedData)
  }

  const handleVersionChange = (id, event) => {
    const updatedData = data.map(item =>
      item.id === id
        ? { ...item, version: event.target.value, updatedon: new Date() }
        : item
    )
    setData(updatedData)
  }

  const handleTimelineChange = (id, event) => {
    const updatedData = data.map(item =>
      item.id === id
        ? {
            ...item,
            indicativetimeline: event.target.value,
            updatedon: new Date(),
          }
        : item
    )
    setData(updatedData)
  }

  const handleResReqChange = (id, event) => {
    const updatedData = data.map(item =>
      item.id === id
        ? {
            ...item,
            resourcerequirement: event.target.value,
            updatedon: new Date(),
          }
        : item
    )
    setData(updatedData)
  }

  const handleBlockerChange = (id, event) => {
    const updatedData = data.map(item =>
      item.id === id
        ? { ...item, blocker: event.target.value, updatedon: new Date() }
        : item
    )
    setData(updatedData)
  }

  const handleCommentsChange = (id, event) => {
    const updatedData = data.map(item =>
      item.id === id
        ? { ...item, comments: event.target.value, updatedon: new Date() }
        : item
    )
    setData(updatedData)
  }

  const handleBlur = id => {
    setEditableState(prevState => ({
      ...prevState,
      accNames: { ...prevState.accNames, [id]: false },
      versions: { ...prevState.versions, [id]: false },
      timelines: { ...prevState.timelines, [id]: false },
      resRequirements: { ...prevState.resRequirements, [id]: false },
      blockers: { ...prevState.blockers, [id]: false },
      comments: { ...prevState.comments, [id]: false },
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
      debugger
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
    try {
      const response = await fetch(baseUrl + "/accsnap", {
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
      const acctimelineData = modifiedData.map(
        ({ id, comments, updatedon }) => ({
          accid: id,
          comments,
          updatedon,
        })
      )

      const accResponse = await fetch(baseUrl + "/acctimeline", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(acctimelineData),
      })

      if (!accResponse.ok) {
        throw new Error("Failed to save acc timeline data")
      }
      console.log("saved successfully")
    } catch (error) {
      console.error("Error saving data:", error)
    }
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
            <Col sm="6">
              <h4 className="card-title">Accelerator Snapshot</h4>
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
                      <th scope="col">Accelerators & Initiatives Name</th>
                      <th scope="col">Version</th>
                      <th scope="col">Indicative Timeline</th>
                      <th scope="col">Resource Requirement</th>
                      <th scope="col">Blocker</th>
                      <th scope="col">Comments</th>
                      <th scope="col">Last Updated</th>
                      <th scope="col">Activity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentData.map(item => (
                      <tr key={item.id}>
                        <td
                          className="text-left"
                          onDoubleClick={() =>
                            handleEditToggle("accNames", item.id)
                          }
                        >
                          {editableState.accNames[item.id] ? (
                            <EditableInput
                              id={item.id}
                              value={item.accname}
                              editable={editableState.accNames[item.id]}
                              onChange={e => handleAccNamesChange(item.id, e)}
                              onBlur={() => handleBlur(item.id)}
                              inputRef={ref => handleInputRef(item.id, ref)}
                              autoFocus={item.id === data[0].id}
                            />
                          ) : (
                            item.accname
                          )}
                        </td>
                        <td
                          onDoubleClick={() =>
                            handleEditToggle("versions", item.id)
                          }
                        >
                          {editableState.versions[item.id] ? (
                            <EditableInput
                              id={item.id}
                              value={item.version}
                              editable={editableState.versions[item.id]}
                              onChange={e => handleVersionChange(item.id, e)}
                              onBlur={() => handleBlur(item.id)}
                              inputRef={ref => handleInputRef(item.id, ref)}
                            />
                          ) : (
                            item.version
                          )}
                        </td>
                        <td
                          onDoubleClick={() =>
                            handleEditToggle("timelines", item.id)
                          }
                        >
                          {editableState.timelines[item.id] ? (
                            <EditableInput
                              id={item.id}
                              value={item.indicativetimeline}
                              editable={editableState.timelines[item.id]}
                              onChange={e => handleTimelineChange(item.id, e)}
                              onBlur={() => handleBlur(item.id)}
                              inputRef={ref => handleInputRef(item.id, ref)}
                            />
                          ) : (
                            item.indicativetimeline
                          )}
                        </td>
                        <td
                          style={{ whiteSpace: "pre-line" }}
                          onDoubleClick={() =>
                            handleEditToggle("resRequirements", item.id)
                          }
                        >
                          {editableState.resRequirements[item.id] ? (
                            <Input
                              type="text"
                              value={item.resourcerequirement}
                              name="resourcerequirement"
                              onChange={e => handleResReqChange(item.id, e)}
                              onBlur={() => handleBlur(item.id)}
                              innerRef={ref => handleInputRef(item.id, ref)}
                              data-id={item.id}
                            />
                          ) : (
                            item.resourcerequirement
                          )}
                        </td>
                        <td
                          style={{ whiteSpace: "pre-line" }}
                          onDoubleClick={() =>
                            handleEditToggle("blockers", item.id)
                          }
                        >
                          {editableState.blockers[item.id] ? (
                            <EditableInput
                              id={item.id}
                              value={item.blocker}
                              editable={editableState.blockers[item.id]}
                              onChange={e => handleBlockerChange(item.id, e)}
                              onBlur={() => handleBlur(item.id)}
                              inputRef={ref => handleInputRef(item.id, ref)}
                            />
                          ) : (
                            item.blocker
                          )}
                        </td>
                        <td
                          onDoubleClick={() =>
                            handleEditToggle("comments", item.id)
                          }
                        >
                          {editableState.comments[item.id] ? (
                            <EditableInput
                              id={item.id}
                              value={item.comments}
                              editable={editableState.comments[item.id]}
                              onChange={e => handleCommentsChange(item.id, e)}
                              onBlur={() => handleBlur(item.id)}
                              inputRef={ref => handleInputRef(item.id, ref)}
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
                            onClick={() =>
                              toggleActivityModal(item.id, item.accname)
                            }
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <ActivityModal
                  isOpen={isActivityModalOpen}
                  toggle={() => toggleActivityModal(null)}
                  activityData={activityData}
                  selectedAcceleratorId={selectedAcceleratorId}
                  selectedAccelerator={selectedAccName}
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

export default AccSnap
