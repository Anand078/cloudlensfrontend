import React, { useState, useEffect } from "react"
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Spinner,
} from "reactstrap"
import PropTypes from "prop-types"
import Select from "react-select"
import makeAnimated from "react-select/animated"
import "flatpickr/dist/themes/material_blue.css"

const animatedComponents = makeAnimated()

const SkillSelectModal = ({
  isOpen,
  toggle,
  selectedSkills,
  onChange,
  onSave,
  onBlur,
}) => {
  const [isLoading, setIsLoading] = useState(true)
  const [skillData, setSkillData] = useState([])
  const baseUrl = process.env.REACT_APP_BASE_URL
  const toggleModal = () => {
    toggle()
  }

  const handleAdd = () => {
    toggle()
    onSave(selectedSkills)
  }

  const fetchData = async () => {
    try {
      const skillResp = await fetch(baseUrl + "/skills")
      const skillData = await skillResp.json()

      setSkillData(skillData.data)
      setIsLoading(false)
    } catch (error) {
      console.error("Error fetching data:", error)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const optionGroup = skillData.map(item => ({
    label: item.skill,
    value: item.skill,
  }))

  return (
    <Modal
      isOpen={isOpen}
      toggle={toggleModal}
      className="modal-dialog-centered"
    >
      <ModalHeader toggle={toggleModal}>Select Skills</ModalHeader>
      <ModalBody>
        {isLoading ? (
          <div className="d-flex justify-content-center align-items-center">
            <Spinner type="grow" className="ms-2" color="success" />
            <Spinner type="grow" className="ms-2" color="danger" />
            <Spinner type="grow" className="ms-2" color="warning" />
            <Spinner type="grow" className="ms-2" color="info" />
          </div>
        ) : (
          <div>
            <Select
              value={selectedSkills.map(skill => ({
                label: skill,
                value: skill,
              }))}
              isMulti={true}
              onChange={selectedOptions => {
                const updatedSkills = selectedOptions.map(
                  option => option.value
                )
                onChange(updatedSkills)
              }}
              options={optionGroup}
              classNamePrefix="select2-selection"
              closeMenuOnSelect={false}
              components={animatedComponents}
              onBlur={onBlur}
            />
          </div>
        )}
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleAdd}>
          Add
        </Button>
        <Button color="secondary" onClick={toggleModal}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  )
}

SkillSelectModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  selectedSkills: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
}

export default SkillSelectModal
