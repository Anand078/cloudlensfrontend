import React from "react"
import { Container, Row, Col, Card, CardBody } from "reactstrap"
import Breadcrumb from "components/Common/Breadcrumb"
import AccSnap from "../Components/AccSnap"

const OverViewCont = () => {
  document.title = "AMS Dashboard | Accelerator "
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumb
            maintitle="Dashboard"
            title="Accelerator"
            breadcrumbItem="Overview"
          />
           <Row>
            <Col xl={12}>
              <Card>
                <CardBody>
                 
                  <Row>
                    <Col lg={12}>
                      <div>
                        <AccSnap/>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default OverViewCont
