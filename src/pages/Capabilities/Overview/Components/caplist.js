import React, { useState, useEffect } from "react"
import { Table, Button, Row, Col, Spinner, Container, Input } from "reactstrap"
import Pagination from "react-js-pagination"
import { Link } from "react-router-dom"
import DeleteModal from "./DeleteCap"
import CapModal from "./CpModal"
const CapList = () => {
  const baseUrl = process.env.REACT_APP_BASE_URL
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [initialData, setInitialData] = useState([])
  const [itemsPerPage] = useState(10)
  const [editRowData, setEditRowData] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [deleteRowData, setDeleteRowData] = useState(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [dataUpdated, setDataUpdated] = useState(false)

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentData = data.slice(indexOfFirstItem, indexOfLastItem)

  const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber)
  }

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false)
    fetchData()
  }

  const toggleModal = async (rowData, getDataCallback = null) => {
    setEditRowData(rowData)
    setIsModalOpen(prev => !prev)
    if (getDataCallback) {
      getDataCallback()
    }

    if (getDataCallback !== null) {
      await fetchData()
    }
  }

  const handleDelete = async () => {
    try {
      const response = await fetch(baseUrl + "/poc/" + deleteRowData.id, {
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
    setIsLoading(true)
    try {
      const [capResp] = await Promise.all([fetch(baseUrl + "/poc")])
      const capData = await capResp.json()

      const filteredData = capData.data.filter(item =>
        Object.values(item).some(value =>
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
      
      setData(filteredData)
      setInitialData(filteredData)
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [dataUpdated])

  const handleSearchChange = event => {
    setSearchTerm(event.target.value)
  }

  const openDeleteModal = rowData => {
    setIsDeleteModalOpen(true)
    setDeleteRowData(rowData)
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
                      <th scope="col">Account Name</th>
                      <th scope="col">Pilot & Exploration</th>
                      <th scope="col">Technology</th>
                      <th scope="col">Objective</th>
                      <th scope="col">Owner</th>
                      <th scope="col">Assigned To</th>
                      <th scope="col">Status</th>
                      <th scope="col">Remarks</th>
                      <th scope="col"></th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentData.map(item => (
                      <tr key={item.id}>
                        <td>{item.account}</td>
                        <td style={{ whiteSpace: "pre-line" }}>
                          {item.pocname}
                        </td>
                        <td style={{ whiteSpace: "pre-line" }}>
                          {item.technology}
                        </td>
                        <td style={{ whiteSpace: "pre-line" }}>
                          {item.objective}
                        </td>
                        <td>{item.owner}</td>
                        <td style={{ whiteSpace: "pre-line" }}>
                          {item.assignedto}
                        </td>
                        <td style={{ whiteSpace: "pre-line" }}>
                          {item.status}
                        </td>
                        <td style={{ whiteSpace: "pre-line" }}>
                          {item.remarks}
                        </td>
                        <td>
                          {item.link ? (
                            <Link to={item.link} target="_blank">
                              <i
                                className="mdi mdi-file-link"
                                style={{ fontSize: "1.5rem", color: "#5b626b" }}
                              ></i>
                            </Link>
                          ) : (
                            <a href={item.link} target="_blank">
                              <i
                                className="mdi mdi-file-link"
                                style={{ fontSize: "1.5rem", color: "#5b626b" }}
                              ></i>
                            </a>
                          )}
                        </td>

                        <td>
                          <i
                            className="typcn typcn-edit"
                            style={{ fontSize: "1.5rem", cursor: "pointer" }}
                            onClick={() => toggleModal(item)}
                          ></i>
                        </td>
                        {/* <td>
                          <i
                            className="mdi mdi-delete"
                            style={{ fontSize: "1.5rem", cursor: "pointer" }}
                            onClick={() => openDeleteModal(item)}
                          ></i>
                        </td> */}
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
      <CapModal
        isOpen={isModalOpen}
        toggle={rowData => toggleModal(rowData, fetchData)}
        editRowData={editRowData}
      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onDelete={handleDelete}
      />
    </>
  )
}

export default CapList
