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

import Pie from "./Components/piechart"
import BarChart from "./Components/BarChart"

import ARBList from "./Components/ARBList"
function ARBOverview() {
  const [arbData, setArbData] = useState([])
  const [arbstatusData, setarbstatusData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const baseUrl = process.env.REACT_APP_BASE_URL
  const [isModalOpen, setIsModalOpen] = useState(false)

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
                  <CardTitle className="h4 mb-4">Pillar Overview</CardTitle>
                  <BarChart />
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <CardTitle className="h4 mb-4">Architecture Review Board List</CardTitle>
                  <Row>
                    <ARBList />
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      )}
    </>
  )
}

export default ARBOverview
