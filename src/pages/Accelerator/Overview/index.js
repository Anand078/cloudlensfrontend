import React from "react"
import { Container, Row, Col, Card, CardBody } from "reactstrap"
import Breadcrumb from "components/Common/Breadcrumb"
import AcceleratorSnapshot from "../Components/AcceleratorSnapshot"

const OverViewCont = () => {
  document.title = "Cloud-Lens | Accelerator "
  return (
    <React.Fragment>
      <div className="page-content custom-scrollbar">
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
                        <AcceleratorSnapshot/>
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
