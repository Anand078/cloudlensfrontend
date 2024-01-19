import React, { useState } from "react"
import {
  Col,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap"

import classnames from "classnames"
import Blog from "./Blog"
import TechSession from "./TechSessions"

const Tabs = () => {
  const [customActiveTab, setCustomActiveTab] = useState("1")

  const toggleCustom = tab => {
    if (customActiveTab !== tab) {
      setCustomActiveTab(tab)
    }
  }

  return (
    <div>
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
            <span className="d-none d-sm-block">Blogs/Whitepapers</span>
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
            <Col lg="12">
              <Blog />
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <Row>
            <Col lg="12">
              <TechSession />
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </div>
  )
}

export default Tabs
