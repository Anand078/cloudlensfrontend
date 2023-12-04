import React from "react"
import { Container, Row, Col } from "reactstrap"
import Breadcrumb from "components/Common/Breadcrumb"
import ArbOverview from "./ArbOverview"

const OverViewCont = () => {
  document.title = "AMS Dashboard | Architecture Review Board"
  return (
    <React.Fragment>
      <div className="page-content custom-scrollbar">
        <Container fluid>
          <Breadcrumb
            maintitle="Dashboard"
            title="Architecture Review"
            breadcrumbItem="Overview"
            path="/arb/overview"
          />
          <Row>
            <Col
              xs="12"
              className="d-flex justify-content-center align-items-center"
              style={{ minHeight: "60vh" }}
            >
              <ArbOverview />
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default OverViewCont
