import React, { useState, useEffect } from "react"
import {
  CardBody,
  Card,
  Row,
  Col,
  Spinner,
  Container,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Form,
  Button,
  ButtonGroup,
  FormGroup,
  Label,
  Input,
} from "reactstrap"
import "./Components/RROverview.css"
import { useLocation } from "react-router-dom"
import classnames from "classnames"
import { useDispatch } from "react-redux"

function RRReport() {
  const baseUrl = process.env.REACT_APP_BASE_URL
  const [isLoading, setIsLoading] = useState(true)
  const location = useLocation()
  const rowData = location.state
  const [activeTab, setactiveTab] = useState(1)
  const dispatsch = useDispatch()
  const [arbReview, setArbReview] = useState([])
  const [tabItems, setTabItems] = useState([])
  const [topicsById, setTopicsById] = useState([])
  const [currentTopicIndex, setCurrentTopicIndex] = useState(0)
  const [filteredPractices, setFilteredPractices] = useState([])
  const [selectedResponses, setSelectedResponses] = useState(
    Array(filteredPractices.length).fill(null)
  )

  const handleResponse = (id, response) => {
    const updatedResponses = [...selectedResponses]
    updatedResponses[id] = response
    setSelectedResponses(updatedResponses)
    console.log("responseData", selectedResponses)
  }

  function toggleTab(tab) {
    if (activeTab !== tab && tab >= 1 && tab <= tabItems.length) {
      setCurrentTopicIndex(0)
      setactiveTab(tab)
      AssignReviewData(tab)
    }
  }
  const fetchData = async () => {
    try {
      const [reviewResp] = await Promise.all([fetch(baseUrl + "/arbreview")])

      const reviewData = await reviewResp.json()
      const first = reviewData.data.filter(item => {
        return item.pillarid === 1 && item.topicid === 1
      })
      setArbReview(reviewData.data)
      const uniquePillars = Array.from(
        new Set(reviewData?.data.map(item => item.pillarname))
      )
      setTabItems(uniquePillars)

      setIsLoading(false)
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    AssignReviewData(activeTab)
  }, [currentTopicIndex, activeTab])

  function AssignReviewData(tabId) {
    const topicsByTabId = arbReview.filter(item => item.pillarid === tabId)

    const uniqueTopicsByTabId = Array.from(
      new Set(topicsByTabId.flatMap(item => item.topic))
    ).map(topic => {
      const topicId = topicsByTabId.find(item => item.topic === topic)?.topicid
      return { topicid: topicId, topic: topic }
    })

    setTopicsById(uniqueTopicsByTabId)

    const currentTopic = uniqueTopicsByTabId[currentTopicIndex]?.topic
    const practicesForCurrentTopic = arbReview.filter(
      item => item.topic === currentTopic
    )
    setFilteredPractices(practicesForCurrentTopic)
  }

  const handlePrevious = () => {
    setCurrentTopicIndex(prevIndex => Math.max(prevIndex - 1, 0))
  }

  const handleNext = () => {
    setCurrentTopicIndex(prevIndex =>
      Math.min(prevIndex + 1, topicsById.length - 1)
    )
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
            <Col sm="3">
              <Row>
                <Card style={{ borderRadius: "1rem" }}>
                  <CardBody
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.2rem",
                      height: "70vh",
                      overflow: "auto",
                    }}
                  >
                    {tabItems?.map((label, index) => (
                      <NavItem
                        key={index}
                        className={classnames("nav-item-box", {
                          current: activeTab === index + 1,
                        })}
                      >
                        <NavLink
                          className={classnames({
                            current: activeTab === index + 1,
                          })}
                          onClick={() => {
                            toggleTab(index + 1)
                          }}
                        >
                          <span className="number-circle">{index + 1}</span>
                          {label}
                        </NavLink>
                      </NavItem>
                    ))}
                  </CardBody>
                </Card>
              </Row>
              <Row style={{ marginTop: "-16px" }}>
                <Card style={{ borderRadius: "1rem" }}>
                  <CardBody style={{ padding: "0.8rem" }}>
                    <div className="actions  button-group-between ">
                      <Button
                        color="primary"
                        className={
                          activeTab === 1 ? "previous disabled" : "previous"
                        }
                        onClick={() => toggleTab(activeTab - 1)}
                      >
                        <i className="typcn typcn-chevron-left"></i>
                      </Button>
                      {"  "}
                      <Button
                        color="primary"
                        className={
                          activeTab === tabItems?.length
                            ? "next disabled"
                            : "next"
                        }
                        onClick={() => {
                          toggleTab(activeTab + 1)
                        }}
                      >
                        <i className="typcn typcn-chevron-right"></i>
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              </Row>
            </Col>
            <Col sm="9">
              <Card style={{ borderRadius: "1rem" }}>
                <CardBody
                  style={{
                    height: "70vh",
                    overflow: "auto",
                    position: "relative",
                  }}
                >
                  <TabContent
                    activeTab={activeTab}
                    className="div-height-width"
                  >
                    <TabPane tabId={activeTab} className="div-height-width">
                      <Form className="div-height-width">
                        <Col sm="12" className="div-height-width">
                          <label className="form-label">
                            {currentTopicIndex + 1} {". "}
                            {topicsById[currentTopicIndex] &&
                              topicsById[currentTopicIndex].topic}
                          </label>
                          {filteredPractices.map((bestPractice, index) => (
                            <FormGroup key={index} className="mb-2">
                              <div style={{ display: "flex", gap: "1rem" }}>
                                <ButtonGroup
                                  className="custom-button-group"
                                  style={{ marginRight: "10px" }}
                                >
                                  <Button
                                    onClick={() =>
                                      handleResponse(
                                        bestPractice.bestpracticeid,
                                        "Yes"
                                      )
                                    }
                                    className={
                                      selectedResponses[
                                        bestPractice.bestpracticeid
                                      ] === "Yes"
                                        ? "selected"
                                        : ""
                                    }
                                  >
                                    Yes
                                  </Button>
                                  <Button
                                    onClick={() =>
                                      handleResponse(
                                        bestPractice.bestpracticeid,
                                        "No"
                                      )
                                    }
                                    className={
                                      selectedResponses[
                                        bestPractice.bestpracticeid
                                      ] === "No"
                                        ? "selected"
                                        : ""
                                    }
                                  >
                                    No
                                  </Button>
                                  <Button
                                    onClick={() =>
                                      handleResponse(
                                        bestPractice.bestpracticeid,
                                        "NA"
                                      )
                                    }
                                    className={
                                      selectedResponses[
                                        bestPractice.bestpracticeid
                                      ] === "NA"
                                        ? "selected"
                                        : ""
                                    }
                                  >
                                    NA
                                  </Button>
                                </ButtonGroup>
                                <div>
                                  <span className="mb-2">
                                    {bestPractice.bestpractice}
                                  </span>
                                  <br />
                                  <span className="mb-2 desc">
                                    {bestPractice.description}
                                  </span>
                                </div>
                              </div>
                            </FormGroup>
                          ))}
                        </Col>
                      </Form>
                    </TabPane>
                  </TabContent>
                </CardBody>
              </Card>
              <Card
                style={{
                  position: "sticky",
                  bottom: "0",
                  borderRadius: "1rem",
                  marginTop: "-16px",
                }}
              >
                <CardBody
                  style={{
                    padding: "0.8rem",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <Button
                      color="dark"
                      outline
                      className="waves-effect waves-light"
                      onClick={handlePrevious}
                      disabled={currentTopicIndex === 0}
                    >
                      Previous
                    </Button>{" "}
                    <Button
                      color="dark"
                      outline
                      className="waves-effect waves-light"
                      onClick={handleNext}
                      disabled={currentTopicIndex === topicsById.length - 1}
                    >
                      Next
                    </Button>
                  </div>
                  <div>
                    <Button color="primary" style={{ marginRight: "2rem" }}>
                      Submit
                    </Button>
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

export default RRReport
