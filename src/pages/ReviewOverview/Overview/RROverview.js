import React, { useState, useEffect } from "react"
import {
  CardBody,
  Card,
  Container,
  Row,
  Col,
  CardTitle,
  Spinner,
  Button,
  Progress,
} from "reactstrap"
import "./Components/RROverview.css"
import { useNavigate } from "react-router-dom"
import Pie from "./Components/piechart"
import { useLocation } from "react-router-dom"
import BarChart from "./Components/barchart"
import StackedChart from "./Components/stackedchart"
import ScoreTable from "./Components/scoretable"
import ARBDetails from "./Components/teammembers"
import ProjectDetails from "./Components/projectmembers"
import revImg from "../../../assets/images/revimg.png"
function RROverview() {
  const [isLoading, setIsLoading] = useState(true)
  const location = useLocation()
  const rowData = location.state
  const navigate = useNavigate()
  const baseUrl = process.env.REACT_APP_BASE_URL
  const [arbScoreData, setArbScoreData] = useState([])
  const handleReviewPage = row => {
    navigate(`/arb/${row.projectname}/review`, { state: row })
  }

  const fetchData = async () => {
    try {
      const [tsResp] = await Promise.all([
        fetch(baseUrl + "/arbscore/" + rowData.id),
      ])
      const tsData = await tsResp.json()
      setArbScoreData(tsData.data)
      setIsLoading(false)
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])
  return (
    <>
      {false ? (
        <div className="d-flex justify-content-center align-items-center">
          <Spinner type="grow" className="ms-2" color="success" />
          <Spinner type="grow" className="ms-2" color="danger" />
          <Spinner type="grow" className="ms-2" color="warning" />
          <Spinner type="grow" className="ms-2" color="info" />
        </div>
      ) : (
        <Container fluid style={{ marginTop: "30px" }}>
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <CardTitle className="h4 mb-4">
                    Project Review Summary
                  </CardTitle>
                  <div className="d-flex justify-content-between">
                    <div style={{ flex: "0 0 50%" }}>
                      <p style={{ color: "#333333" }}>
                        Project resources are provisioned in Nagarro's purview
                        as of now. These resources will be migrated to the
                        client's account at a later stage, subject to customer
                        agreement. Hence some of the implementation items can be
                        carried forward for later.
                      </p>
                      <p style={{ color: "#333333" }}>
                        The project has recently completed the implementation
                        phase, and this review will help them establish that the
                        practices followed during the implementation hold good
                        for the platform architecture.
                      </p>
                    </div>
                    <div
                      style={{
                        position: "relative",
                        marginRight: "-720px",
                        marginTop: "-50px",
                      }}
                    >
                      <Button
                        color="primary"
                        className="btn btn-primary waves-effect waves-light position-absolute top-0"
                        onClick={() => handleReviewPage(rowData)}
                      >
                        Review
                      </Button>
                    </div>
                    <div
                      style={{
                        marginRight: "150px",
                      }}
                    >
                      <span className="logo-lg">
                        <img src={revImg} alt="" height="150px" />
                      </span>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <CardTitle className="h4 mb-4">Project Score</CardTitle>
                  <Progress
                    className="my-2"
                    value="39"
                    style={{
                      height: "30px",
                      fontSize: "1rem",
                      fontWeight: 500,
                    }}
                  >
                    39%
                  </Progress>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row className="d-flex">
            <Col lg={7} className="d-flex align-items-stretch">
              <Card className="w-100">
                <div className="generic-bar"></div>
                <CardBody>
                  <h5 className="mt-0 header-title mb-2">Score per pillar</h5>
                  <div className="mb-0">
                    <BarChart />
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col lg={5} className="d-flex align-items-stretch">
              <Card className="w-100">
                <CardBody>
                  <h5 className="mt-0 header-title mb-2">
                    Scope of Improvement
                  </h5>
                  <div className="mb-0">
                    <Pie />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <CardTitle className="h4 mb-4">Response Breakdown</CardTitle>
                  <StackedChart />
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <ScoreTable arbScoreData={arbScoreData} />
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col lg={6}>
              <Card>
                <CardBody>
                  <ARBDetails />
                </CardBody>
              </Card>
            </Col>
            <Col lg={6}>
              <Card>
                <CardBody>
                  <ProjectDetails />
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <CardTitle className="h4 mb-4">Goals</CardTitle>
                  <div style={{ color: "#333333", padding: "0 30px" }}>
                    <ol>
                      <li>
                        <p>
                          To ensure the best security posture during the
                          governance
                        </p>
                      </li>
                      <li>
                        <p>
                          To ensure resilience patterns are followed in the
                          technical landscape
                        </p>
                      </li>
                      <li>
                        <p>
                          Look for further cost optimization scope in the
                          project.
                        </p>
                      </li>
                    </ol>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <CardTitle className="h4 mb-4">Caveats</CardTitle>
                  <div style={{ color: "#333333", padding: "0 50px" }}>
                    <p>
                      Project resources are provisioned in Nagarro's purview as
                      of now. These resources will be migrated to the client's
                      account at a later stage, subject to customer agreement.
                      Hence some of the implementation items can be carried
                      forward for later. There are no known technical caveats.
                    </p>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      )}
    </>
  )
}

export default RROverview
