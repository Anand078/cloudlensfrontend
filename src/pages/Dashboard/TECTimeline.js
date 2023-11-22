import React from "react"
import { Modal, ModalBody, ModalHeader } from "reactstrap"
const TimelineModal = ({ isOpen, toggle, selectedProject, activityData }) => (
  <Modal isOpen={isOpen} toggle={toggle} centered>
    <ModalHeader toggle={toggle}>{selectedProject} - Activity</ModalHeader>
    <ModalBody>
      <ol className="activity-feed">
        {activityData.map((activity, index) => (
          <li key={index} className="feed-item">
            <div className="feed-item-list">
              <span className="date">
                <strong>{activity.date}</strong>
              </span>
              <span className="activity-text">{activity.text}</span>
            </div>
          </li>
        ))}
      </ol>
    </ModalBody>
  </Modal>
)

export default TimelineModal
