import React, { useState } from "react";
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
} from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";

const generateFormFields = (fields, validation) =>
  fields.map(({ name, label, placeholder, type }) => (
    <Col key={name} md="6">
      <FormGroup className="mb-3">
        <Label htmlFor={`validationCustom${name}`}>{label}</Label>
        <Input
          name={name}
          placeholder={placeholder}
          type={type || 'text'}
          className="form-control"
          id={`validationCustom${name}`}
          onChange={validation.handleChange}
          onBlur={validation.handleBlur}
          value={validation.values[name] || ''}
          invalid={validation.touched[name] && validation.errors[name]}
        />
        {validation.touched[name] && validation.errors[name] && (
          <FormFeedback type="invalid">{validation.errors[name]}</FormFeedback>
        )}
      </FormGroup>
    </Col>
  ));

const FormValidations = ({ editRowData, onCloseModal }) => {
  const [isSaving, setIsSaving] = useState(false);
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const validationSchema = Yup.object({
    account: Yup.string().required("Please Enter Account Name"),
    pocname: Yup.string().required("Please Enter Pilot & Exploration"),
    assignedto: Yup.string().required("Please Enter Assigned To"),
    technology: Yup.string().required("Please Enter Technology"),
    owner: Yup.string().required("Please Enter Owner"),
    objective: Yup.string().required("Please Enter Objective"),
  });

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
    onSubmit: async (values) => {
      setIsSaving(true);

      try {
        const url = editRowData?.id
          ? `${baseUrl}/poc/${editRowData.id}`
          : `${baseUrl}/poc`;

        const response = await fetch(url, {
          method: editRowData?.id ? "PUT" : "POST",
          // ... other fetch options ...
        });

        const result = await response.json();
        if (result.success) {
          console.log(
            editRowData?.id ? "Updated successfully" : "Saved successfully"
          );
          setDataUpdated(true);
        } else {
          console.error(
            editRowData?.id
              ? "Error while updating data"
              : "Error while posting data"
          );
        }
      } catch (error) {
        console.error("Error while saving the data", error);
      } finally {
        onCloseModal();
        setIsSaving(false);
      }
    },
  });

  const formFields = generateFormFields(
    [
      { name: "account", label: "Account name" },
      { name: "teamname", label: "Team Name" },
      { name: "pocname", label: "Pilot & Exploration" },
      { name: "assignedto", label: "Assigned To" },
      { name: "technology", label: "Technology" },
      { name: "owner", label: "Owner" },
      { name: "status", label: "Status" },
      { name: "objective", label: "Objective" },
      { name: "link", label: "Deliverable" },
      { name: "remarks", label: "Remarks" },
    ],
    validation
  );

  return (
    <>
      {isSaving && (
        <div className="text-center">
          <Spinner type="grow" className="ms-2" color="success" />
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
                  onSubmit={(e) => {
                    e.preventDefault();
                    validation.handleSubmit();
                  }}
                >
                  <Row>{formFields}</Row>
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
  );
};

const CapModal = ({ isOpen, toggle, editRowData }) => {
  const customModalSize = {
    maxWidth: "950px",
  };

  const closeAndResetModal = () => {
    toggle();
  };

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
  );
};

export default CapModal;
