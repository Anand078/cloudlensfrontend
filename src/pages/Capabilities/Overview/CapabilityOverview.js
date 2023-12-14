import React, { useState, useEffect } from "react"
import {
  CardBody,
  Card,
  Container,
  Row,
  Col,
  CardTitle,
  Spinner,
} from "reactstrap"
import BarChart from "./Components/barchart"
import PieChart from "./Components/piechart"
import CapList from "./Components/caplist"

function AccountOverview() {
  document.title = "Cloud-Lens | Capabilities"
  const [accOverviewData, setAccOverviewData] = useState(null)
  const [barData, setBarData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [dataUpdated, setDataUpdated] = useState(false)
  const baseUrl = process.env.REACT_APP_BASE_URL

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

  const fetchData = async () => {
    try {
      await getAccOverviewData()
      await getBarData()
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
                  <CapList />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      )}
    </>
  )
}

export default AccountOverview
