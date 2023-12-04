import React, { useState, useEffect } from "react"
import {
  CardBody,
  Card,
  Container,
  Row,
  Col,
  CardTitle,
  Button,
  Spinner,
  Modal,
  ModalBody,
} from "reactstrap"

import ArcModal from "./Components/ArcModal"
import Pie from "./Components/piechart"
import BarChart from "pages/AllCharts/chartjs/barchart"

import { useDispatch } from "react-redux"
import { MDBDataTable } from "mdbreact"
import DeleteConfirmationModal from "./Components/DeleteArc"
import { useNavigate, Link } from "react-router-dom"
function AccountOverview() {
  const dispatch = useDispatch()
  const [arbData, setArbData] = useState([])
  const [editRowData, setEditRowData] = useState(null)
  const [deleteRowData, setDeleteRowData] = useState(null)
  const [arbstatusData, setarbstatusData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [showToast, setShowToast] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const baseUrl = process.env.REACT_APP_BASE_URL
  const navigate = useNavigate()
  const openDeleteModal = rowData => {
    setIsDeleteModalOpen(true)
    setDeleteRowData(rowData)
  }

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false)
    fetchData()
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

  const getArbData = async () => {
    try {
      const resp = await fetch(baseUrl + "/arb")
      const data = await resp.json()
      setArbData(data.data)
    } catch (error) {
      console.error("Error fetching arb data:", error)
    }
  }

  const getstatusData = async () => {
    try {
      const resp = await fetch(baseUrl + "/arbstatus")
      const data = await resp.json()
      setarbstatusData(data.data)
    } catch (error) {
      console.error("Error fetching other data:", error)
    }
  }

  const fetchData = async () => {
    try {
      await getArbData()
      await getstatusData()
      setIsLoading(false)
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  function getPieChartData() {
    const joinedData = arbData?.map(tableItem => {
      const statusItem = arbstatusData.find(
        statusItem => statusItem.id === tableItem.statusid
      )
      return {
        id: tableItem.statusid,
        status: statusItem ? statusItem.status : "",
      }
    })

    const statusCounts = joinedData.reduce((counts, item) => {
      const { status } = item
      counts[status] = (counts[status] || 0) + 1
      return counts
    }, {})

    const statusCountArray = Object.entries(statusCounts).map(
      ([status, count], index) => ({
        status,
        count,
      })
    )

    return statusCountArray
  }
  const pieChartData = getPieChartData()

  const [isModalOpen, setIsModalOpen] = useState(false)

  const toggleModal = (getData = false) => {
    if (getData) {
      setShowToast(true)
      fetchData()
    }
    getData && setIsModalOpen(!isModalOpen)
  }
  const handleNavigate = row => {
    navigate(`/arb/${row.projectname}/overview`, { state: row })
  }

  const getProjectNameCell = rowData => (
    <Button onClick={() => handleNavigate(rowData)}>
      {rowData.projectname}
    </Button>
  )

  const getEditCell = rowData => (
    <i
      className="typcn typcn-edit"
      style={{ fontSize: "1.5rem", cursor: "pointer" }}
      onClick={() => {
        setEditRowData(rowData)
        setIsModalOpen(true)
      }}
    ></i>
  )

  const getDeleteCell = rowData => (
    <i
      className="mdi mdi-delete"
      style={{ fontSize: "1.5rem", cursor: "pointer" }}
      onClick={() => openDeleteModal(rowData)}
    ></i>
  )

  const newTableData = arbData?.map(item => ({
    ...item,
    projectname: getProjectNameCell(item),
    edit: getEditCell(item),
    delete: getDeleteCell(item),
  }))
  const data = {
    columns: [
      {
        label: "Project Name",
        field: "projectname",
        sort: "asc",
        width: 100,
      },
      {
        label: "Project Owner",
        field: "projectowner",
        sort: "asc",
        width: 270,
      },
      {
        label: "Reviewer",
        field: "reviewer",
        sort: "asc",
        width: 200,
      },
      {
        label: "Auditor",
        field: "auditor",
        sort: "asc",
        width: 100,
      },
      {
        label: "Start Date",
        field: "startdate",
        sort: "asc",
        width: 150,
      },
      {
        label: "End Date",
        field: "enddate",
        sort: "asc",
        width: 100,
      },
      {
        label: "Project Score",
        field: "projectscore",
        sort: "asc",
        width: 100,
      },
      {
        label: "",
        field: "edit",
        sort: "asc",
        width: 20,
      },
      {
        label: "",
        field: "delete",
        sort: "asc",
        width: 20,
      },
    ],
    rows: newTableData,
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
          <Row>
            <Col lg={4} className="d-flex">
              <Card className="w-100">
                <CardBody>
                  <CardTitle className="h4 mb-4">Status Overview</CardTitle>
                  <Pie piedata={pieChartData} />
                </CardBody>
              </Card>
            </Col>
            <Col lg={8} className="d-flex">
              <Card className="w-100">
                <CardBody>
                  <CardTitle className="h4 mb-4">Technology Overview</CardTitle>
                  <BarChart />
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <CardTitle className="h4 mb-4">
                    Architecture Review List
                  </CardTitle>
                  <Row style={{ paddingBottom: "1rem" }}>
                    <div className="float-end">
                      <Link
                        to="#"
                        className="btn btn-primary waves-effect waves-light"
                        onClick={() => setIsModalOpen(true)}
                      >
                        New
                      </Link>
                    </div>
                  </Row>
                  <Row className="justify-content-center"></Row>
                  <MDBDataTable responsive striped bordered hover data={data} />
                </CardBody>
              </Card>
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
      {/* {showToast && (
        <Modal isOpen={showToast} toggle={() => setShowToast(false)} centered>
          <ModalBody
          >
            Data is been successfully updated
          </ModalBody>
        </Modal>
      )} */}
    </>
  )
}

export default AccountOverview
