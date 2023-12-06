import React, { useState } from "react"
import {
  Card,
  CardBody,
  CardText,
  CardTitle,
  Col,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap"

import classnames from "classnames"

const UiTabsAccordions = () => {
  const [customActiveTab, setCustomActiveTab] = useState("1")

  const toggleCustom = tab => {
    if (customActiveTab !== tab) {
      setCustomActiveTab(tab)
    }
  }

  return (
    <>
      <Nav tabs className="nav-tabs-custom">
        <NavItem>
          <NavLink
            style={{ cursor: "pointer" }}
            className={classnames({
              active: customActiveTab === "1",
            })}
            onClick={() => {
              toggleCustom("1")
            }}
          >
            <span className="d-none d-sm-block">Blog</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            style={{ cursor: "pointer" }}
            className={classnames({
              active: customActiveTab === "2",
            })}
            onClick={() => {
              toggleCustom("2")
            }}
          >
            <span className="d-none d-sm-block">Tech Session</span>
          </NavLink>
        </NavItem>
      </Nav>

      <TabContent activeTab={customActiveTab} className="p-3 text-muted">
        <TabPane tabId="1">
          <Row>
            <Col sm="12">
              <CardText className="mb-0">Blog Content here</CardText>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <Row>
            <Col sm="12">
              <CardText className="mb-0">Tech Session content here</CardText>
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </>
  )
}

export default UiTabsAccordions
