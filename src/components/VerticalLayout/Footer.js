import React from "react";
import { Container, Row } from "reactstrap";

const Footer = () => {
  return (
    <React.Fragment>
      <footer className="footer">
        <Container fluid={true}>
          <Row>
            <div className="col-12">
              © {new Date().getFullYear()} -{" "}
              <span className="d-none d-sm-inline-block">
                Developed by Team AMS
              </span>
            </div>
          </Row>
        </Container>
      </footer>
    </React.Fragment>
  );
};

export default Footer;
