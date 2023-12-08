import React from "react"
import { Container, Row, Col } from "reactstrap"
import Breadcrumb from "components/Common/Breadcrumb"
import RRReport from "./RRReport"

const OverViewCont = id => {
  document.title = "Cloud-Lens | Review Report"
  return (
    <React.Fragment>
      <div className="page-content custom-scrollbar">
        <Container fluid>
          <Row>
            <Col
              xs="12"
              className="d-flex justify-content-center align-items-center mt-3"
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
