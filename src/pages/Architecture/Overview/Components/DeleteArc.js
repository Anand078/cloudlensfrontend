import React, { useState } from "react"
import { Modal, ModalHeader, ModalBody, ModalFooter, Spinner } from "reactstrap"

const DeleteArc = ({ isOpen, onClose, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await onDelete()
      onClose()
    } catch (error) {
      console.error("Error while deleting item", error.error)
    } finally {
      setTimeout(100000)
      setIsDeleting(false)
    }
  }

  return (
    <Modal isOpen={isOpen} toggle={onClose} centered>
      <ModalHeader>Delete Confirmation</ModalHeader>
      <ModalBody>Are you sure you want to delete this item?</ModalBody>
      <ModalFooter>
        {isDeleting ? (
          <>
            <div className="d-flex justify-content-center align-items-center"></div>
            <Spinner size="sm" color="danger" />
          </>
        ) : (
          <button className="btn btn-danger" onClick={handleDelete}>
            Yes
          </button>
        )}
        <button className="btn btn-secondary" onClick={onClose}>
          Cancel
        </button>
      </ModalFooter>
    </Modal>
  )
}

export default DeleteArc
