import React, { useState, useEffect, useMemo } from "react"
import {
  CardBody,
  Card,
  Container,
  Row,
  Col,
  CardTitle,
  Spinner,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  ButtonDropdown,
} from "reactstrap"
import BarChart from "./Components/barchart"
import { Link } from "react-router-dom"
import { MDBDataTable } from "mdbreact"
import { useDispatch } from "react-redux"
import DeleteModal from "./Components/DeleteCap"
import CapModal from "./Components/CpModal"
import PieChart from "./Components/piechart"

function AccountOverview() {
  document.title = "AMS Dashboard | Capabilities"
  const dispatch = useDispatch()
  const [accOverviewData, setAccOverviewData] = useState(null)
  const [barData, setBarData] = useState(null)
  const [tableData, setTableData] = useState(null)
  const [editRowData, setEditRowData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [deleteRowData, setDeleteRowData] = useState(null)
  const [dataUpdated, setDataUpdated] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [infodrp_up1111, setInfodrp_up1111] = useState(false)
  const baseUrl = process.env.REACT_APP_BASE_URL
  const openDeleteModal = rowData => {
    setIsDeleteModalOpen(true)
    setDeleteRowData(rowData)
  }

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false)
  }

  const handleDelete = async () => {
    try {
      const response = await fetch(baseUrl + `/poc/${deleteRowData.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
      const result = await response.json()
      if (result.success === true) {
        console.log("Delete operation successful")
      } else {
        console.log("Delete operation unsuccessful")
      }
    } catch (error) {
      console.error("Error fetching data:", error)
    }
    closeDeleteModal()
  }

  const getAccOverviewData = async () => {
    try {
      const resp = await fetch(baseUrl + "/piechartcount")
      const accData = await resp.json()
      setAccOverviewData(accData.data)
    } catch (error) {
      console.error("Error fetching account overview data:", error)
    }
  }

  const getBarData = async () => {
    try {
      const resp = await fetch(baseUrl + "/techcount")
      const barData = await resp.json()
      setBarData(barData.data)
    } catch (error) {
      console.error("Error fetching bar chart data:", error)
    }
  }

  const prepareData = data => {
    const newTableData = data?.map(item => ({
      ...item,
      link: getLinkCell(item),
      edit: getEditCell(item),
      delete: getDeleteCell(item),
    }))

    const newData = {
      columns: [
        {
          label: "Account Name",
          field: "account",
          sort: "asc",
          width: 270,
        },
        {
          label: "Pilot & Exploration",
          field: "pocname",
          sort: "asc",
          width: 200,
        },
        {
          label: "Technology",
          field: "technology",
          sort: "asc",
          width: 100,
        },
        {
          label: "Objective",
          field: "objective",
          sort: "asc",
          width: 150,
        },
        {
          label: "Team Name",
          field: "teamname",
          sort: "asc",
          width: 100,
        },
        {
          label: "Owner",
          field: "owner",
          sort: "asc",
          width: 50,
        },
        {
          label: "Assigned To",
          field: "assignedto",
          sort: "asc",
          width: 50,
        },
        {
          label: "Status",
          field: "status",
          sort: "asc",
          width: 50,
        },
        {
          label: "Remarks",
          field: "remarks",
          sort: "asc",
          width: 50,
        },
        {
          label: "",
          field: "link",
          sort: "asc",
          width: 20,
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

    setTableData({ ...newData })
  }
  const getTableData = async () => {
    try {
      const resp = await fetch(baseUrl + "/poc")
      const tableData = await resp.json()
      prepareData(tableData.data)
    } catch (error) {
      console.error("Error fetching bar chart data:", error)
    }
  }

  const fetchData = async () => {
    try {
      await getAccOverviewData()
      await getBarData()
      await getTableData()
      setIsLoading(false)
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (dataUpdated) {
      fetchData()
      setDataUpdated(false)
    }
  }, [dataUpdated])

  const toggleModal = item => {
    setEditRowData(item)
    setIsModalOpen(!isModalOpen)
  }

  const getLinkCell = item => {
    if (item.link) {
      return (
        <Link to={item.link} target="_blank">
          <i
            className="mdi mdi-file-link"
            style={{ fontSize: "1.5rem", color: "#5b626b" }}
          ></i>
        </Link>
      )
    }
    return (
      <a href={item.link} target="_blank">
        <i
          className="mdi mdi-file-link"
          style={{ fontSize: "1.5rem", color: "#5b626b" }}
        ></i>
      </a>
    )
  }

  const getEditCell = item => (
    <i
      className="mdi mdi-book-edit-outline"
      style={{ fontSize: "1.5rem", cursor: "pointer" }}
      onClick={() => toggleModal(item)}
    ></i>
  )

  const getActionCell = item => (
    <ButtonDropdown
      direction="left"
      isOpen={true}
      toggle={() => setInfodrp_up1111(prevState => !prevState)}
    >
      <DropdownToggle caret color="info">
        <i className="mdi mdi-chevron-left" />
        {/* <Button id="caret" color="info">
                        
                      </Button> */}
      </DropdownToggle>

      <DropdownMenu>
        <DropdownItem>Another Action</DropdownItem>
        <DropdownItem>Another Action</DropdownItem>
      </DropdownMenu>
    </ButtonDropdown>
  )
  const getDeleteCell = item => (
    <i
      className="mdi mdi-delete"
      style={{ fontSize: "1.5rem", cursor: "pointer" }}
      onClick={() => openDeleteModal(item)}
    ></i>
  )

  const mbComp = useMemo(() => {
    return <MDBDataTable responsive striped bordered data={tableData} />
  }, [tableData])

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
            <Col lg={12}>
              <Card>
                <CardBody>
                  <h4 className="mt-0 header-title mb-4">Accounts Overview</h4>
                  <div id="doughnut-chart" className="e-chart">
                    <PieChart accOverviewdata={accOverviewData} />
                  </div>
                </CardBody>
              </Card>
            </Col>
            {/* Add more Card components here if needed */}
          </Row>
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <CardTitle className="h4 mb-4">Technology Overview</CardTitle>
                  <Row className="justify-content-center"></Row>
                  <BarChart barData={barData} />
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <CardTitle className="h4 mb-4">Capabilities List</CardTitle>
                  <Row style={{ paddingBottom: "1rem" }}>
                    <div className="float-end">
                      <Link
                        to="#"
                        className="btn btn-primary waves-effect waves-light"
                        onClick={() => toggleModal(null)}
                      >
                        New
                      </Link>
                    </div>
                  </Row>
                  <Row className="justify-content-center"></Row>
                  {mbComp}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      )}
      <CapModal
        isOpen={isModalOpen}
        toggle={toggleModal}
        editRowData={editRowData}
        setDataUpdated={setDataUpdated}
      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onDelete={handleDelete}
        setDataUpdated={setDataUpdated}
      />
    </>
  )
}

export default AccountOverview
