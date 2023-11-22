import React from "react"
import { Container, Row, Col } from "reactstrap"
import Breadcrumb from "components/Common/Breadcrumb"
import RRReport from "./RRReport"

const OverViewCont = id => {
  document.title = "AMS Dashboard | Review Report"
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumb
            maintitle="AMS Dashboard"
            title="Review Overview"
            breadcrumbItem="Review Report"
            path={`/rev-overview`}
          />
          <Row>
            <Col
              xs="12"
              className="d-flex justify-content-center align-items-center"
              style={{ minHeight: "60vh" }}
            >
              <RRReport />
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default OverViewCont
