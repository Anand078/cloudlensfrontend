import React from "react"
import { Container, Row, Col } from "reactstrap"
import Breadcrumb from "components/Common/Breadcrumb"
import AccountOverview from "./ArcOverview"

const OverViewCont = () => {
  document.title = "AMS Dashboard | Architecture Review Board"
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumb
            maintitle="Dashboard"
            title="Architecture Review"
            breadcrumbItem="Overview"
            path="/arc-overview"
          />
          <Row>
            <Col
              xs="12"
              className="d-flex justify-content-center align-items-center"
              style={{ minHeight: "60vh" }}
            >
              <AccountOverview />
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default OverViewCont
