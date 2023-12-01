import React from "react"
import { Container, Row, Col } from "reactstrap"

import RROverview from "./RROverview"

const RROverviewIndex = id => {
  document.title = "AMS Dashboard | Review Report"
  return (
    <React.Fragment>
      <div className="page-content custom-scrollbar">
        <Container fluid>
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
