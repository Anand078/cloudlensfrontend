import PropTypes from "prop-types"
import React, { useState } from "react"
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardBody,
  Input,
  Dropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
} from "reactstrap"
import { Link } from "react-router-dom"
import TEC from "./TECMembers"

// Custom Scrollbar
import SimpleBar from "simplebar-react"
import CountUp from "react-countup"
// import images
import user2 from "../../assets/images/users/user-2.jpg"
import user3 from "../../assets/images/users/user-3.jpg"
import user4 from "../../assets/images/users/user-4.jpg"
import user5 from "../../assets/images/users/user-5.jpg"
import user6 from "../../assets/images/users/user-6.jpg"
import smimg1 from "../../assets/images/small/img-1.jpg"
import smimg2 from "../../assets/images/small/img-2.jpg"
// Charts
import Salesdonut from "../AllCharts/apex/salesdonut"
import TabSessions from "./Tabs"

import "chartist/dist/scss/chartist.scss"

const Dashboard = props => {
  const [menu, setMenu] = useState(false)
  const toggle = () => {
    setMenu(!menu)
  }
  document.title = "Cloud-Lens | Dashboard"
  return (
    <React.Fragment>
      <div className="page-content custom-scrollbar">
        <Container fluid>
          <div className="page-title-box">
            <Row className="align-items-center">
              <Col md={8}>
                <h6 className="page-title">Dashboard</h6>
                <ol className="breadcrumb m-0">
                  <li className="breadcrumb-item active">
                    Welcome to Cloud-Lens
                  </li>
                </ol>
              </Col>

              <Col md="4">
                <div className="float-end d-none d-md-block">
                  <Dropdown isOpen={menu} toggle={toggle}>
                    <DropdownToggle
                      color="primary"
                      className="btn btn-primary dropdown-toggle waves-effect waves-light"
                    >
                      <i className="ion ion-ios-link"></i> Quick Links
                    </DropdownToggle>
                    <DropdownMenu end>
                      <DropdownItem
                        tag="a"
                        href="https://www.nagarro.com"
                        target="_blank"
                      >
                        Nagarro
                      </DropdownItem>
                      <DropdownItem
                        tag="a"
                        href="https://one.nagarro.com"
                        target="_blank"
                      >
                        Attendance
                      </DropdownItem>
                      <DropdownItem
                        tag="a"
                        href="https://leavemanager.nagarro.com/"
                      >
                        Leave Manager
                      </DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem
                        tag="a"
                        href="https://nagarro.sharepoint.com/sites/flexi-seat/SitePages/Homepage.aspx#/"
                      >
                        Flexi Seat
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </Col>
            </Row>
          </div>
          <Row>
            <Col xl={3} md={6}>
              <Card className="mini-stat bg-primary text-white">
                <CardBody style={{ height: "213px", backgroundColor: "white" }}>
                  <div className="mb-4">
                    {/* <div className="float-start mini-stat-img me-4">
                      <img src={servicesIcon1} alt="" />
                    </div> */}
                    <h5
                      className="font-size-13 text-uppercase mt-0"
                      style={{ color: "#5b626b" }}
                    >
                      Locations
                    </h5>
                    <h4 style={{ color: "#5b626b" }}>
                      <CountUp delay={0.3} end={10} duration={0.7} />+
                    </h4>
                    <div className="mini-stat-label bg-success">
                      <p className="mb-0">1</p>
                    </div>
                  </div>
                  <div className="pt-2">
                    <p className="text-muted mb-4">
                      Across countries Austria, Dubai, Germany, India, Malta,
                      Mexico, Romania, Sweden, USA
                    </p>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xl={3} md={6}>
              <Card className="mini-stat bg-primary text-white">
                <CardBody style={{ height: "213px", backgroundColor: "white" }}>
                  <div className="mb-4">
                    {/* <div className="float-start mini-stat-img me-4">
                      <img src={servicesIcon2} alt="" />
                    </div> */}
                    <h5
                      className="font-size-13 text-uppercase mt-0"
                      style={{ color: "#5b626b" }}
                    >
                      Customers
                    </h5>
                    <h4 style={{ color: "#5b626b" }}>
                      <CountUp delay={0.3} end={100} duration={0.7} />+
                    </h4>
                    <div className="mini-stat-label bg-danger">
                      <p className="mb-0">2</p>
                    </div>
                  </div>
                  <div className="pt-2">
                    <p className="text-muted mb-4">
                      Providing service across domains like BFSI, Aviation,
                      Manufacturing, Telecom, Healthcare, Automative
                    </p>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xl={3} md={6}>
              <Card className="mini-stat bg-primary text-white">
                <CardBody style={{ height: "213px", backgroundColor: "white" }}>
                  <div className="mb-4">
                    {/* <div className="float-start mini-stat-img me-4">
                      <img src={servicesIcon3} alt="" />
                    </div> */}
                    <h5
                      className="font-size-13 text-uppercase mt-0"
                      style={{ color: "#5b626b" }}
                    >
                      Service Professionals
                    </h5>
                    <h4 style={{ color: "#5b626b" }}>
                      <CountUp delay={0.3} end={1200} duration={1} />+
                    </h4>
                    <div className="mini-stat-label bg-info">
                      <p className="mb-0">3</p>
                    </div>
                  </div>
                  <div className="pt-2">
                    <p className="text-muted mb-4">
                      Across technologies and domains - Large pool of ITIL, TIPA
                      & SIAM certified consultants
                    </p>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xl={3} md={6}>
              <Card className="mini-stat bg-primary text-white">
                <CardBody style={{ height: "213px", backgroundColor: "white" }}>
                  <div className="mb-4">
                    {/* <div className="float-start mini-stat-img me-4">
                      <img src={servicesIcon4} alt="" />
                    </div> */}
                    <h5
                      className="font-size-13 text-uppercase mt-0"
                      style={{ color: "#5b626b" }}
                    >
                      Support
                    </h5>
                    <h4 style={{ color: "#5b626b" }}>
                      <CountUp delay={0.3} end={24} duration={0.7} />x
                      <CountUp delay={0.3} end={7} duration={0.7} />
                    </h4>
                    <div className="mini-stat-label bg-warning">
                      <p className="mb-0">4</p>
                    </div>
                  </div>
                  <div className="pt-2">
                    <p className="text-muted mb-4">
                      Providing services across various domains, efficient
                      operations, and rapid delivery of software products
                    </p>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col xl={12}>
              <Card>
                <CardBody>
                  <Row>
                    <Col lg={12}>
                      <div>
                        <TEC />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Card>
              <CardBody>
                <Col lg={12}>
                  <TabSessions />
                </Col>
              </CardBody>
            </Card>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

Dashboard.propTypes = {
  t: PropTypes.any,
}

export default Dashboard
