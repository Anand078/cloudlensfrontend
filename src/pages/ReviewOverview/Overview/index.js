import React from "react"
import { Container, Row, Col } from "reactstrap"
import RROverview from "./RROverview"
import Breadcrumb from "components/Common/Breadcrumb"

const RROverviewIndex = id => {
  document.title = " Cloud-Lens | Review Report"
  return (
    <React.Fragment>
      <div className="page-content custom-scrollbar">
        <Container fluid>
          <Breadcrumb
            maintitle="Dashboard"
            title="Architecture Review"
            breadcrumbItem="Review Overview"
            path="/arb/overview"
          />
          <Row>
            <Col
              xs="12"
              className="d-flex justify-content-center align-items-center"
              style={{ minHeight: "60vh" }}
            >
              <RROverview />
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default RROverviewIndex
