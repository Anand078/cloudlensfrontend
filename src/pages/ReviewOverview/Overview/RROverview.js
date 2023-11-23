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
} from "reactstrap"
import "./Components/RROverview.css"
import { useNavigate } from "react-router-dom"
import Rating from "react-rating"
import CountOfChoice from "./Components/piechart"
import Bar from "./Components/ChoicePillarChart"
import ReviewChart from "./Components/ReviewPillarChart"
import { useLocation } from "react-router-dom"
import CountUp from "react-countup"
function RROverview() {
  const starStyle = {}
  const [isLoading, setIsLoading] = useState(true)
  const location = useLocation()
  const rowData = location.state
  const navigate = useNavigate()
  const baseUrl = process.env.REACT_APP_BASE_URL
  const handleReviewPage = row => {
    navigate(`/arb/${row.projectname}/review`, { state: row })
  }

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
        <Container fluid>
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody className="d-flex button-items">
                  <div className="flex-grow-1"> </div>
                  <Button
                    color="primary"
                    className="btn btn-primary waves-effect waves-light"
                    onClick={() => handleReviewPage(rowData)}
                  >
                    Review
                  </Button>{" "}
                  {/* <Button
                    color="success"
                    className="btn btn-primary waves-effect waves-light"
                  >
                    Plan
                  </Button>{" "} */}
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col lg={3}>
              <Card>
                <div className="generic-bar"></div>
                <CardBody>
                  <h5 className="mt-0 header-title mb-2">
                    {rowData?.projectname}
                  </h5>
                  <div className="mb-0">Review Report</div>
                </CardBody>
              </Card>
            </Col>
            <Col lg={3}>
              <Card>
                <div className="pillar-bar"></div>
                <CardBody>
                  <h5 className="mt-0 header-title mb-2">
                    <CountUp delay={0.3} end={6} duration={0.7} />
                  </h5>
                  <div className="mb-0">Count of Pillar</div>
                </CardBody>
              </Card>
            </Col>
            <Col lg={3}>
              <Card>
                <div className="topic-bar"></div>
                <CardBody>
                  <h5 className="mt-0 header-title mb-2">
                    <CountUp delay={0.3} end={60} duration={0.7} />
                  </h5>
                  <div className="mb-0">Count of Topic</div>
                </CardBody>
              </Card>
            </Col>
            <Col lg={3}>
              <Card>
                <div className="choice-bar"></div>
                <CardBody>
                  <h5 className="mt-0 header-title mb-2">
                    <CountUp delay={0.3} end={394} duration={0.7} />
                  </h5>
                  <div className="mb-0">Count of Best Practices</div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col lg={3} className="d-flex">
              <Row>
                <Card className="w-100">
                  <CardBody>
                    <CardTitle className="h4 mb-4">
                      Count of Choice by Compliant
                    </CardTitle>
                    <CountOfChoice className="w-100" />
                  </CardBody>
                </Card>
                <Card>
                  <CardBody>
                    <CardTitle className="h4 mb-4">Project Rating</CardTitle>
                    <Rating
                      ActiveComponent={
                        <i
                          key={"active_3"}
                          className="mdi mdi-star text-primary"
                          style={starStyle}
                        />
                      }
                      InActiveComponent={
                        <i
                          key={"active_03"}
                          className="mdi mdi-star-outline text-muted"
                          style={starStyle}
                        />
                      }
                      readonly={true}
                      initialRating={3}
                    />
                  </CardBody>
                </Card>
              </Row>
            </Col>
            <Col lg={4} className="d-flex">
              <Card className="w-100">
                <CardBody>
                  <CardTitle className="h4 mb-4">
                    Count of Choice by Pillar
                  </CardTitle>
                  <Bar className="w-100" />
                </CardBody>
              </Card>
            </Col>
            <Col lg={5} className="d-flex">
              <Card className="w-100">
                <CardBody>
                  <CardTitle className="h4 mb-4">
                    Count of Review by Pillar and Approved
                  </CardTitle>
                  <ReviewChart />
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <CardTitle className="h4 mb-4">
                    Project Review Summary
                  </CardTitle>
                  <div className="d-flex">
                    <div style={{ flex: "0 0 60%" }}>
                      <p style={{ color: "#333333" }}>
                        Project resources are provisioned in Nagarro's purview
                        as of now. These resources will be migrated to the
                        client's account at a later stage, subject to customer
                        agreement. Hence some of the implementation items can be
                        carried forward for later.
                      </p>
                      <p style={{ color: "#333333" }}>
                        The project has recently completed the implementation
                        phase and this review will help them establish that the
                        practices followed during the implementation hold good
                        for the platform architecture
                      </p>
                    </div>
                    <div className="flex-grow-1">2</div>
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
