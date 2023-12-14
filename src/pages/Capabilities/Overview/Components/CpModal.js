import React, { useState } from "react"
import {
  Modal,
  ModalHeader,
  ModalBody,
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
} from "reactstrap"
import * as Yup from "yup"
import { useFormik } from "formik"

const FormValidations = ({ editRowData, onCloseModal }) => {
  const [isSaving, setIsSaving] = useState(false)
  const baseUrl = process.env.REACT_APP_BASE_URL

  const validationSchema = Yup.object({
    account: Yup.string().required("Please Enter Account Name"),
    pocname: Yup.string().required("Please Enter Pilot & Exploration"),
    assignedto: Yup.string().required("Please Enter Assigned To"),
    technology: Yup.string().required("Please Enter Technology"),
    owner: Yup.string().required("Please Enter Owner"),
    objective: Yup.string().required("Please Enter Objective"),
  })

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      account: editRowData?.account || "",
      teamname: editRowData?.teamname || "",
      pocname: editRowData?.pocname || "",
      assignedto: editRowData?.assignedto || "",
      technology: editRowData?.technology || "",
      owner: editRowData?.owner || "",
      status: editRowData?.status || "",
      objective: editRowData?.objective || "",
      remarks: editRowData?.remarks || "",
      link: editRowData?.link || "",
    },
    validationSchema,
    onSubmit: async values => {
      setIsSaving(true)

      try {
        const url = editRowData?.id
          ? `${baseUrl}/poc/${editRowData.id}`
          : `${baseUrl}/poc`

        const response = await fetch(url, {
          method: editRowData?.id ? "PUT" : "POST",
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
        if (result.success) {
          console.log(
            editRowData?.id ? "Updated successfully" : "Saved successfully"
          )

          setDataUpdated(true)
        } else {
          console.error(
            editRowData?.id
              ? "Error while updating data"
              : "Error while posting data"
          )
        }
      } catch (error) {
        console.error("Error while saving the data", error)
      } finally {
        onCloseModal()
        setIsSaving(false)
      }
    },
  })

  return (
    <>
      {isSaving && (
        <div className="text-center">
          {[1, 2, 3, 4].map((_, index) => (
            <Spinner key={index} type="grow" className="ms-2" color="success" />
          ))}
        </div>
      )}
      <Container fluid={true}>
        <Row>
          <Col xl="12">
            <Card>
              <CardBody>
                <p className="card-title-desc"></p>
                <Form
                  className="row g-3 needs-validation"
                  onSubmit={e => {
                    e.preventDefault()
                    validation.handleSubmit()
                  }}
                >
                  <Row>
                    <Col md="6">
                      <FormGroup className="mb-3">
                        <Label htmlFor="validationCustom01">Account name</Label>
                        <Input
                          name="account"
                          placeholder=""
                          type="text"
                          className="form-control"
                          id="validationCustom01"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.account || ""}
                          invalid={
                            validation.touched.account &&
                            validation.errors.account
                              ? true
                              : false
                          }
                        />
                        {validation.touched.account &&
                        validation.errors.account ? (
                          <FormFeedback type="invalid">
                            {validation.errors.account}
                          </FormFeedback>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup className="mb-3">
                        <Label htmlFor="validationCustom02">Team Name</Label>
                        <Input
                          name="teamname"
                          placeholder=""
                          type="text"
                          className="form-control"
                          id="validationCustom02"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.teamname || ""}
                          invalid={
                            validation.touched.teamname &&
                            validation.errors.teamname
                              ? true
                              : false
                          }
                        />
                        {validation.touched.teamname &&
                        validation.errors.teamname ? (
                          <FormFeedback type="invalid">
                            {validation.errors.teamname}
                          </FormFeedback>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup className="mb-3">
                        <Label htmlFor="validationCustom06">
                          Pilot & Exploration
                        </Label>
                        <div className="input-group has-validation">
                          <Input
                            name="pocname"
                            placeholder=""
                            type="text"
                            className="form-control"
                            id="validationCustom06"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.pocname || ""}
                            invalid={
                              validation.touched.pocname &&
                              validation.errors.pocname
                                ? true
                                : false
                            }
                          />
                          {validation.touched.pocname &&
                          validation.errors.pocname ? (
                            <FormFeedback type="invalid">
                              {validation.errors.pocname}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup className="mb-3">
                        <Label htmlFor="validationCustom06">Assigned To</Label>
                        <div className="input-group has-validation">
                          <Input
                            name="assignedto"
                            placeholder=""
                            type="text"
                            className="form-control"
                            id="validationCustom06"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.assignedto || ""}
                            invalid={
                              validation.touched.assignedto &&
                              validation.errors.assignedto
                                ? true
                                : false
                            }
                          />
                          {validation.touched.assignedto &&
                          validation.errors.assignedto ? (
                            <FormFeedback type="invalid">
                              {validation.errors.assignedto}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <FormGroup className="mb-3">
                        <Label htmlFor="validationCustom03">Technology</Label>
                        <Input
                          name="technology"
                          placeholder=""
                          type="text"
                          className="form-control"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.technology || ""}
                          invalid={
                            validation.touched.technology &&
                            validation.errors.technology
                              ? true
                              : false
                          }
                        />
                        {validation.touched.technology &&
                        validation.errors.technology ? (
                          <FormFeedback type="invalid">
                            {validation.errors.technology}
                          </FormFeedback>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col md="3">
                      <FormGroup className="mb-3">
                        <Label htmlFor="validationCustom04">Owner</Label>
                        <Input
                          name="owner"
                          placeholder=""
                          type="text"
                          className="form-control"
                          id="validationCustom04"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.owner || ""}
                          invalid={
                            validation.touched.owner && validation.errors.owner
                              ? true
                              : false
                          }
                        />
                        {validation.touched.owner && validation.errors.owner ? (
                          <FormFeedback type="invalid">
                            {validation.errors.owner}
                          </FormFeedback>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col md="3">
                      <FormGroup className="mb-3">
                        <Label htmlFor="validationCustom05">Status</Label>
                        <Input
                          name="status"
                          placeholder=""
                          type="text"
                          className="form-control"
                          id="validationCustom05"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.status || ""}
                          invalid={
                            validation.touched.status &&
                            validation.errors.status
                              ? true
                              : false
                          }
                        />
                        {validation.touched.status &&
                        validation.errors.status ? (
                          <FormFeedback type="invalid">
                            {validation.errors.status}
                          </FormFeedback>
                        ) : null}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="12">
                      <FormGroup className="mb-12">
                        <label className="form-label" htmlFor="objective">
                          Objective
                        </label>
                        <textarea
                          name="objective"
                          id="objective"
                          className={`form-control ${
                            validation.touched.objective &&
                            validation.errors.objective
                              ? "is-invalid"
                              : ""
                          }`}
                          placeholder="Type here..."
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.objective || ""}
                        />
                        {validation.touched.objective &&
                        validation.errors.objective ? (
                          <div className="invalid-feedback">
                            {validation.errors.objective}
                          </div>
                        ) : null}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <FormGroup className="mb-3">
                        <Label htmlFor="validationCustom05">Deliverable</Label>
                        <Input
                          name="link"
                          placeholder=""
                          type="text"
                          className="form-control"
                          id="validationCustom05"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.link || ""}
                          invalid={
                            validation.touched.link && validation.errors.link
                              ? true
                              : false
                          }
                        />
                        {validation.touched.link && validation.errors.link ? (
                          <FormFeedback type="invalid">
                            {validation.errors.link}
                          </FormFeedback>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup className="mb-3">
                        <Label htmlFor="validationCustom05">Remarks</Label>
                        <Input
                          name="remarks"
                          placeholder=""
                          type="text"
                          className="form-control"
                          id="validationCustom05"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.remarks || ""}
                          invalid={
                            validation.touched.remarks &&
                            validation.errors.remarks
                              ? true
                              : false
                          }
                        />
                        {validation.touched.remarks &&
                        validation.errors.remarks ? (
                          <FormFeedback type="invalid">
                            {validation.errors.remarks}
                          </FormFeedback>
                        ) : null}
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

const CapModal = ({ isOpen, toggle, editRowData }) => {
  const customModalSize = {
    maxWidth: "950px",
  }

  const closeAndResetModal = () => {
    toggle()
  }

  return (
    <div>
      <Modal
        isOpen={isOpen}
        toggle={closeAndResetModal}
        editRowData={editRowData}
        centered
        style={customModalSize}
      >
        <ModalHeader className="mt-0" toggle={closeAndResetModal}>
          Pilot and Exploration
        </ModalHeader>
        <ModalBody>
          <FormValidations
            editRowData={editRowData}
            onCloseModal={closeAndResetModal}
          />
        </ModalBody>
      </Modal>
    </div>
  )
}

export default CapModal
