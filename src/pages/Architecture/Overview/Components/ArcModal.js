import React, { useState } from "react"
import "flatpickr/dist/themes/material_blue.css"
import Flatpickr from "react-flatpickr"
import {
  Row,
  Col,
  Card,
  CardBody,
  FormGroup,
  Button,
  Label,
  Input,
  Container,
  Form,
  FormFeedback,
  Spinner,
  InputGroup,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap"

import * as Yup from "yup"
import { useFormik } from "formik"

const FormValidations = ({ editRowData, onCloseModal }) => {
  const [isSaving, setIsSaving] = useState(false)
  const baseUrl = process.env.REACT_APP_BASE_URL

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      projectname: editRowData?.projectname || "",
      projectowner: editRowData?.projectowner || "",
      reviewer: editRowData?.reviewer || "",
      auditor: editRowData?.auditor || "",
      projectscore: editRowData?.projectscore || 0.0,
      startdate: editRowData?.startdate || "",
      enddate: editRowData?.enddate || "",
    },
    validationSchema: Yup.object({
      projectname: Yup.string().required("Please Enter Project Name"),
      projectowner: Yup.string().required("Please Enter Project Owner"),
      reviewer: Yup.string().required("Please Enter Project Reviewer"),
      auditor: Yup.string().required("Please Enter Project Reviewer"),
      projectscore: Yup.number()
        .typeError("Project Score must be a number")
        .test(
          "maxDigits",
          "Project Score can have up to 2 decimal places",
          value => /^\d+(\.\d{1,2})?$/.test(value)
        ),
    }),
    onSubmit: async values => {
      if (values.startdate) {
        const startDate = new Date(values.startdate)
        startDate.setMinutes(
          startDate.getMinutes() - startDate.getTimezoneOffset()
        )
        values.startdate = startDate.toISOString().split("T")[0]
      }
      if (values.enddate) {
        const endDate = new Date(values.enddate)
        endDate.setMinutes(endDate.getMinutes() - endDate.getTimezoneOffset())
        values.enddate = endDate.toISOString().split("T")[0]
      }
      setIsSaving(true)
      try {
        if (editRowData?.id == null || editRowData?.id == "") {
          let response = await fetch(baseUrl + "/arb", {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
              "Content-Type": "application/json",
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify(values),
          })

          const result = await response.json()
          if (result.success == true) {
            console.log("success")
          } else {
            console.log("error while posting arc data")
          }
        } else {
          let response = await fetch(baseUrl + "/arb/" + editRowData.id, {
            method: "PUT",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
              "Content-Type": "application/json",
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify(values),
          })
          const result = await response.json()
          if (result.success == true) {
            console.log("success")
          } else {
            console.log("error while updating arc data")
          }
        }
      } catch (error) {
        console.log("error while saving the data")
      } finally {
        onCloseModal(true)
        setIsSaving(false)
      }
    },
  })

  return (
    <>
      {isSaving && (
        <div className="text-center">
          <>
            <Spinner type="grow" className="ms-2" color="success" />
            <Spinner type="grow" className="ms-2" color="danger" />
            <Spinner type="grow" className="ms-2" color="warning" />
            <Spinner type="grow" className="ms-2" color="info" />
          </>
        </div>
      )}
      <Container fluid={true}>
        <Row>
          <Col xl="12">
            <Card>
              <CardBody>
                <h4 className="card-title">Architecture Review Project</h4>
                <p className="card-title-desc"></p>
                <Form
                  className="row g-3 needs-validation"
                  onSubmit={e => {
                    e.preventDefault()
                    validation.handleSubmit()
                    return false
                  }}
                >
                  <Row>
                    <Col md="6">
                      <FormGroup className="mb-3">
                        <Label htmlFor="validationCustom01">Project Name</Label>
                        <Input
                          name="projectname"
                          placeholder=""
                          type="text"
                          className="form-control"
                          id="validationCustom01"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.projectname || ""}
                          invalid={
                            validation.touched.projectname &&
                            validation.errors.projectname
                              ? true
                              : false
                          }
                        />
                        {validation.touched.projectname &&
                        validation.errors.projectname ? (
                          <FormFeedback type="invalid">
                            {validation.errors.projectname}
                          </FormFeedback>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup className="mb-3">
                        <Label htmlFor="validationCustom02">
                          Project Owner
                        </Label>
                        <Input
                          name="projectowner"
                          placeholder=""
                          type="text"
                          className="form-control"
                          id="validationCustom02"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.projectowner || ""}
                          invalid={
                            validation.touched.projectowner &&
                            validation.errors.projectowner
                              ? true
                              : false
                          }
                        />
                        {validation.touched.projectowner &&
                        validation.errors.projectowner ? (
                          <FormFeedback type="invalid">
                            {validation.errors.projectowner}
                          </FormFeedback>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup className="mb-3">
                        <Label htmlFor="validationCustom06">Reviewer</Label>
                        <div className="input-group has-validation">
                          <Input
                            name="reviewer"
                            placeholder=""
                            type="text"
                            className="form-control"
                            id="validationCustom06"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.reviewer || ""}
                            invalid={
                              validation.touched.reviewer &&
                              validation.errors.reviewer
                                ? true
                                : false
                            }
                          />
                          {validation.touched.reviewer &&
                          validation.errors.reviewer ? (
                            <FormFeedback type="invalid">
                              {validation.errors.reviewer}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup className="mb-3">
                        <Label htmlFor="validationCustom06">Auditor</Label>
                        <div className="input-group has-validation">
                          <Input
                            name="auditor"
                            placeholder=""
                            type="text"
                            className="form-control"
                            id="validationCustom06"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.auditor || ""}
                            invalid={
                              validation.touched.auditor &&
                              validation.errors.auditor
                                ? true
                                : false
                            }
                          />
                          {validation.touched.auditor &&
                          validation.errors.auditor ? (
                            <FormFeedback type="invalid">
                              {validation.errors.auditor}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <FormGroup className="mb-3">
                        <Label htmlFor="validationCustom03">Start Date</Label>
                        {/* <Input
                          name="startdate"
                          placeholder=""
                          type="text"
                          className="form-control"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.startdate || ""}
                          invalid={
                            validation.touched.startdate &&
                            validation.errors.startdate
                              ? true
                              : false
                          }
                        />
                        {validation.touched.startdate &&
                        validation.errors.startdate ? (
                          <FormFeedback type="invalid">
                            {validation.errors.startdate}
                          </FormFeedback>
                        ) : null} */}
                        <InputGroup>
                          <Flatpickr
                            className="form-control d-block"
                            placeholder="Start Date"
                            options={{
                              altInput: true,
                              altFormat: "Y-m-d",
                              dateFormat: "Y-m-d", // Use the correct date format
                            }}
                            value={validation.values.startdate} // Assign the startdate value
                            onChange={date => {
                              validation.setFieldValue("startdate", date[0]) // Update the startdate field in formik
                            }}
                          />
                        </InputGroup>
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup className="mb-3">
                        <Label htmlFor="validationCustom04">End Date</Label>
                        <InputGroup>
                          <Flatpickr
                            className="form-control d-block"
                            placeholder="End Date"
                            options={{
                              altInput: true,
                              altFormat: "Y-m-d",
                              dateFormat: "Y-m-d", // Use the correct date format
                            }}
                            value={validation.values.enddate} // Assign the enddate value
                            onChange={date => {
                              validation.setFieldValue("enddate", date[0]) // Update the enddate field in formik
                            }}
                          />
                        </InputGroup>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="6">
                      <FormGroup className="mb-3">
                        <Label htmlFor="validationCustom04">
                          Project Score
                        </Label>
                        <Input
                          name="projectscore"
                          placeholder=""
                          step="0.01" //
                          type="number"
                          className="form-control"
                          id="validationCustom04"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.projectscore || ""}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <div className="d-flex flex-wrap gap-2">
                      <Button type="submit" color="primary" disabled={isSaving}>
                        {isSaving ? "Saving..." : "Submit"}
                      </Button>
                      <Button
                        type="reset"
                        color="secondary"
                        onClick={() => validation.resetForm()}
                      >
                        Cancel
                      </Button>
                    </div>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

const ArcModal = ({ isOpen, handleClose, editRowData }) => {
  const customModalSize = {
    maxWidth: "950px",
  }

  return (
    <div>
      <Modal
        isOpen={isOpen}
        toggle={() => handleClose()}
        editRowData={editRowData}
        centered
        style={customModalSize}
      >
        <ModalHeader className="mt-0">
          <div className="d-flex justify-content-between w-100 align-items-center">
            <span>
              {editRowData?.id != null ? "Edit" : "Add"} Project Details
            </span>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={() => handleClose()}
            ></button>
          </div>
        </ModalHeader>
        <ModalBody>
          <FormValidations
            editRowData={editRowData}
            onCloseModal={val => handleClose(val)}
          />
        </ModalBody>
      </Modal>
    </div>
  )
}

export default ArcModal
