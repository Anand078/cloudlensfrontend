import React, { useState } from "react"
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
function RROverview() {
  const [isLoading, setIsLoading] = useState(true)
  const location = useLocation()
  const rowData = location.state
  const navigate = useNavigate()
  const baseUrl = process.env.REACT_APP_BASE_URL
  const handleReviewPage = row => {
    navigate(`/arb/${row.projectname}/review`, { state: row })
  }
  const data = [
    { id: 1, pillar: "Cost Optimization", text: "PENDING" },
    { id: 2, pillar: "Security", text: "PENDING" },
    { id: 3, pillar: "Operational Excellence", text: "PENDING" },
    { id: 4, pillar: "Reliability", text: "PENDING" },
    { id: 5, pillar: "Sustainability", text: "PENDING" },
    { id: 6, pillar: "Performance Efficiency", text: "PENDING" },
  ]
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
        <Container fluid style={{marginTop:"30px"}}>
          {/* <Row
            className="col-12"
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "0.05rem",
              padding: "0",
              margin: "0 auto",
            }}
          >
            <div
              className=" d-flex py-2 m-0 "
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "0.4rem",
              }}
            >
              {data.map(item => {
                return (
                  <div
                    key={item.id}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "0.3rem",
                      padding: 0,
                      margin: 0,
                    }}
                  >
                    <div
                      style={{
                        width: "90px",
                        height: "100px",
                        borderRadius: "10px",
                        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                      }}
                      className="p-1 m-0 bg-white"
                    >
                      <div className="d-flex flex-column align-items-center justify-content-center">
                        <p>{item.id}</p>
                        <span
                          style={{
                            fontSize: "10px",
                            fontWeight: "500",
                            alignSelf: "center",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          {item.pillar}
                        </span>
                      </div>
                    </div>
                    <div
                      style={{
                        width: "68px",
                        height: "20px",
                        borderRadius: "15px",
                        background: "grey",
                        textAlign: "center",
                        alignSelf: "center",
                        justifyContent: "center",
                        alignItems: "center",
                        display: "flex",
                        fontSize: "10px",
                        color: "#fff",
                      }}
                    >
                      {item.text}
                    </div>
                  </div>
                )
              })}
            </div>
          </Row> */}
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
                    <div className="ml-auto">
                      <Button
                        color="primary"
                        className="btn btn-primary waves-effect waves-light"
                        onClick={() => handleReviewPage(rowData)}
                        style={{ marginTop: "-75px" }}
                      >
                        Review
                      </Button>
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
                    value="49"
                    style={{
                      height: "30px",
                      fontSize: "1rem",
                      fontWeight: 500,
                    }}
                  >
                    49%
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
                  <ScoreTable />
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
