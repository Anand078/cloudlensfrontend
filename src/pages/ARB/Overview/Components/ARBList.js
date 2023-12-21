import React, { useState, useEffect, useRef } from "react"
import {
  Table,
  Button,
  Row,
  Col,
  Spinner,
  Container,
  Input,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap"
import Select from "react-select"
import Pagination from "react-js-pagination"
import { useNavigate } from "react-router-dom"
import ArcModal from "./ARBModal"
import DeleteConfirmationModal from "./DeleteArc"
const ARBList = () => {
  const baseUrl = process.env.REACT_APP_BASE_URL
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)
  const [editRowData, setEditRowData] = useState(null)
  const [initialData, setInitialData] = useState([])
  const [selectedGroup, setSelectedGroup] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [deleteRowData, setDeleteRowData] = useState(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [rowDropdownOpen, setRowDropdownOpen] = useState({})
  const [statusData, setStatusData] = useState([])

  const navigate = useNavigate()

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentData = data.slice(indexOfFirstItem, indexOfLastItem)

  function handleSelectGroup(selectedGroup) {
    setSelectedGroup(selectedGroup)
  }

  const toggleDropdown = rowId => {
    setRowDropdownOpen(prevState => ({
      ...prevState,
      [rowId]: !prevState[rowId] || false,
    }))
  }

  const optionGroup = statusData.map(statusItem => ({
    label: statusItem.status,
    value: statusItem.id,
  }))

  const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber)
  }

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false)
    fetchData()
  }

  const toggleModal = (getData = false) => {
    if (getData) {
      fetchData()
    }
    setEditRowData(null)
    setIsModalOpen(!isModalOpen)
  }

  const handleDelete = async () => {
    try {
      const response = await fetch(baseUrl + "/arb/" + deleteRowData.id, {
        method: "DELETE",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
      })
      const result = await response.json()
      if (result.success === true) {
        console.log("delete operation successful")
      } else {
        console.log("delete operation unsuccessful")
      }
    } catch (error) {
      console.error("Error fetching arb data:", error)
    }
    closeDeleteModal()
  }

  const fetchData = async () => {
    try {
      const [accSnapResp, statusResp] = await Promise.all([
        fetch(baseUrl + "/arb"),
        fetch(baseUrl + "/arbstatus"),
      ])

      if (!accSnapResp.ok || !statusResp.ok) {
        throw new Error("Failed to fetch data")
      }

      const [accSnapData, arbStatusData] = await Promise.all([
        accSnapResp.json(),
        statusResp.json(),
      ])

      const filteredData = accSnapData.data.filter(item =>
        Object.values(item).some(value =>
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      )

      setData(filteredData)
      setInitialData(filteredData)

      if (Array.isArray(arbStatusData.data)) {
        setStatusData(arbStatusData.data)
      } else {
        setStatusData([])
      }

      setIsLoading(false)
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [searchTerm])

  const handleSearchChange = event => {
    setSearchTerm(event.target.value)
  }

  const openDeleteModal = rowData => {
    setIsDeleteModalOpen(true)
    setDeleteRowData(rowData)
  }

  const handleNavigate = row => {
    navigate(`/arb/${row.projectname}/overview`, { state: row })
  }
  console.log("anand", currentData)
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
              <Button color="primary" onClick={() => setIsModalOpen(true)}>
                <i className="ion ion-md-add"></i>
              </Button>
              <Input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearchChange}
                style={{ width: "15rem" }}
              />
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
                      <th scope="col">Project Name</th>
                      <th scope="col">Project Owner</th>
                      <th scope="col">Reviewer</th>
                      <th scope="col">Auditor</th>
                      <th scope="col">Start Date</th>
                      <th scope="col">End Date</th>
                      <th scope="col">Status</th>
                      <th scope="col">Project Score</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentData.map(item => (
                      <tr key={item.id}>
                        <td
                          style={{
                            cursor: "pointer",
                          }}
                          onClick={() => handleNavigate(item)}
                        >
                          <strong>{item.projectname}</strong>
                        </td>
                        <td>{item.projectowner}</td>
                        <td>{item.reviewer}</td>
                        <td>{item.auditor}</td>
                        <td>{item.startdate}</td>
                        <td>{item.enddate}</td>
                        <td>
                          <Select
                            value={optionGroup.find(
                              option => option.value === item.statusid
                            )}
                            onChange={handleSelectGroup}
                            options={optionGroup}
                          />
                        </td>
                        <td>{item.projectscore}</td>

                        <td>
                          <Dropdown
                            isOpen={rowDropdownOpen[item.id]}
                            toggle={() => toggleDropdown(item.id)}
                            direction="left"
                            style={{ left: "-80%" }}
                          >
                            <DropdownToggle
                              style={{
                                background: "none",
                                border: "none",
                              }}
                            >
                              <i
                                className="ion ion-ios-more"
                                aria-hidden="true"
                              />
                            </DropdownToggle>
                            <DropdownMenu sx={{ zIndex: "10" }}>
                              <DropdownItem
                                onClick={() => {
                                  setEditRowData(item)
                                  setIsModalOpen(true)
                                }}
                              >
                                <i
                                  className="typcn typcn-edit"
                                  style={{
                                    fontSize: "1.3rem",
                                  }}
                                ></i>
                                &nbsp; Edit
                              </DropdownItem>
                              <DropdownItem
                                onClick={() => openDeleteModal(item)}
                              >
                                <i
                                  className="mdi mdi-delete"
                                  style={{
                                    fontSize: "1.3rem",
                                  }}
                                ></i>
                                &nbsp; Delete
                              </DropdownItem>
                            </DropdownMenu>
                          </Dropdown>
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
      <ArcModal
        isOpen={isModalOpen}
        handleClose={(val = false) => toggleModal(val)}
        editRowData={editRowData}
      />
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onDelete={handleDelete}
      />
    </>
  )
}

export default ARBList
