import React, { useState } from "react"

import {
  Row,
  Col,
  Card,
  CardBody,
  FormGroup,
  Label,
  Input,
  Container,
  Form,
} from "reactstrap"

// Formik validation
import * as Yup from "yup"
import { useFormik } from "formik"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

const FormValidations = () => {
  const baseUrl = process.env.REACT_APP_BASE_URL
  // Form validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      id: "",
      description: "",
    },
    onSubmit: values => {
      console.log("values", values)
    },
  })

  const [formValidation, setValidation] = useState({
    fnm: null,
    lnm: null,
    unm: null,
    city: null,
    stateV: null,
  })

  const handleSave = async () => {
    debugger
    try {
      const { id, description } = validation.values // Get data from the formik validation
      const parsedId = parseInt(id, 10)
      console.log("values:", validation.values)
      const response = await fetch(baseUrl + "/tecmember/" + parsedId, {
        method: "PUT",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify({ parsedId, description }), // Include the data you want to update
      })

      const result = await response.json()
      if (result.success === true) {
        console.log("update operation successful")
        validation.resetForm()
      } else {
        console.log("update operation unsuccessful")
      }
    } catch (error) {
      console.error("Error updating data:", error)
    }
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Forms" breadcrumbItem="Form Validation" />
          <Row>
            <Col xl="6">
              <Card>
                <CardBody>
                  <h4 className="card-title">Validation type</h4>
                  <p className="card-title-desc">
                    Parsley is a javascript form validation library. It helps
                    you provide your users with feedback on their form
                    submission before sending it to your serve
                  </p>
                  <Form
                    className="row g-3 needs-validation"
                    onSubmit={e => {
                      e.preventDefault()
                      validation.handleSubmit()
                      return false
                    }}
                  >
                    <Row>
                      <Col md="4">
                        <FormGroup className="mb-3">
                          <Label htmlFor="validationCustom01">ID</Label>
                          <Input
                            name="id"
                            placeholder=""
                            type="text"
                            className="form-control"
                            value={validation.values.id}
                            onChange={validation.handleChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup className="mb-3">
                          <Label htmlFor="validationCustom02">
                            Description
                          </Label>
                          <Input
                            type="textarea"
                            name="description"
                            placeholder=""
                            value={validation.values.description}
                            onChange={validation.handleChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <div className="col-12">
                      <button
                        className="btn btn-primary"
                        type="submit"
                        onClick={handleSave}
                      >
                        Submit form
                      </button>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default FormValidations
