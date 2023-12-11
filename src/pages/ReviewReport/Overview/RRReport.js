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
  Input,
  Label,
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
  const [arbResponseData, setArbResponseData] = useState([])
  const [tabItems, setTabItems] = useState([])
  const [topicsById, setTopicsById] = useState([])
  const [currentTopicIndex, setCurrentTopicIndex] = useState(0)
  const [filteredPractices, setFilteredPractices] = useState([])
  const [isSaving, setIsSaving] = useState(false)
  const [selectedResponses, setSelectedResponses] = useState({})
  // const handleResponse = (id, response) => {
  //   setSelectedResponses(prevResponses => {
  //     const updatedResponses = [...prevResponses]
  //     updatedResponses[id] = response
  //     return updatedResponses
  //   })
  // }

  const handleResponse = (id, response) => {
    setSelectedResponses(prevResponses => ({
      ...prevResponses,
      [id]: response,
    }))
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
      const [reviewResp, arbResResp] = await Promise.all([
        fetch(baseUrl + "/arbreview"),
        fetch(baseUrl + "/arbresponse/" + rowData.id),
      ])

      const reviewData = await reviewResp.json()
      const arbResponseData = await arbResResp.json()

      setArbReview(reviewData.data)
      setArbResponseData(arbResponseData.data)

      const uniquePillars = [
        ...new Set(reviewData.data.map(item => item.pillarname)),
      ]
      setTabItems(uniquePillars)

      setIsLoading(false)
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  useEffect(() => {
    if (rowData.id) {
      fetchData()
    }
  }, [rowData.id])

  useEffect(() => {
    if (arbReview?.length === 0) {
      fetchData()
    } else {
      AssignReviewData(activeTab)
    }
  }, [currentTopicIndex, activeTab, arbReview])

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

    let responses = []

    if (
      arbResponseData &&
      arbResponseData.response &&
      typeof arbResponseData.response === "string"
    ) {
      const responseArray = arbResponseData.response.split(",")
      responses = responseArray.map(item => {
        const [bestpracticeid, response] = item.split(":")
        handleResponse(bestpracticeid, response)
        selectedResponses[bestpracticeid] = response
        console.log("selectedResponses", selectedResponses)
      })
    } else {
      console.error("Invalid or missing response data:", arbResponseData)
    }
  }

  const handlePrevious = () => {
    setCurrentTopicIndex(prevIndex => {
      saveResponses()
      return Math.max(prevIndex - 1, 0)
    })
  }

  const handleNext = () => {
    setCurrentTopicIndex(prevIndex => {
      saveResponses()
      return Math.min(prevIndex + 1, topicsById.length - 1)
    })
  }

  const saveResponses = () => {
    setSelectedResponses(currentResponses => {
      const updatedResponses = { ...currentResponses }
      filteredPractices.forEach(bestPractice => {
        const response = selectedResponses[bestPractice.bestpracticeid] || ""
        updatedResponses[bestPractice.bestpracticeid] = response
      })
      return updatedResponses
    })
  }

  const handleCheckboxChange = event => {
    const isChecked = event.target.checked

    filteredPractices.forEach(bestPractice => {
      const response = isChecked ? "NA" : "No"
      handleResponse(bestPractice.bestpracticeid, response)
    })
  }

  const handleSave = async () => {
    setIsSaving(true)

    // console.log("anand ", selectedResponses)
    const responsesArray = Object.entries(selectedResponses)
      .map(([id, response]) => `${id}:${response}`)
      .filter(entry => entry.split(":")[1].trim() !== "")

    const strResponse = responsesArray.join(",")
    // console.log("strResponse ", strResponse)

    const payload = {
      projectid: rowData.id,
      response: strResponse,
      updatedon: new Date(),
    }

    try {
      let response
      if (arbResponseData == null) {
        response = await fetch(baseUrl + "/arbresponse", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        })
      } else {
        response = await fetch(baseUrl + "/arbresponse/" + rowData.id, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        })
      }

      const result = await response.json()
      if (result.success === true) {
        console.log("success")
      } else {
        console.log("error while posting or updating arb data")
      }
    } catch (error) {
      console.error("error while saving the data", error)
    } finally {
      setIsSaving(false)
    }
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
                      height: "75vh",
                      overflow: "auto",
                    }}
                    className="custom-scrollbar"
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
                    height: "75vh",
                    overflow: "auto",
                  }}
                >
                  <TabContent
                    activeTab={activeTab}
                    className="div-height-width"
                  >
                    <TabPane tabId={activeTab} className="div-height-width">
                      <Form className="div-height-width custom-scrollbar">
                        <Col
                          sm="12"
                          className="div-height-width custom-scrollbar"
                        >
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <div>
                              <label className="form-label">
                                {currentTopicIndex + 1} {". "}
                                {topicsById[currentTopicIndex] &&
                                  topicsById[currentTopicIndex].topic}
                              </label>
                            </div>
                            <div
                              className="form-check form-check-inline"
                              style={{ marginLeft: "1rem" }}
                            >
                              <Input
                                id="exampleCheckbox"
                                name="checkbox"
                                type="checkbox"
                                onChange={handleCheckboxChange}
                              />
                              <Label check for="exampleCheckbox">
                                Not Applicable
                              </Label>
                            </div>
                          </div>

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
                    <Button
                      type="submit"
                      color="primary"
                      style={{ marginRight: "2rem" }}
                      onClick={handleSave}
                      disabled={isSaving}
                    >
                      {isSaving ? "Saving..." : "Submit"}
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
