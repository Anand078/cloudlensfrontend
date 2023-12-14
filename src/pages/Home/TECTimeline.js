import React, { useState, useEffect, useRef } from "react"
import { Modal, ModalBody, ModalHeader, Spinner } from "reactstrap"
import styled from "styled-components"
import emptyData from "../../assets/images/emptydata.svg"
import { format } from "date-fns" // Importing date-fns format function

const StyledModalBody = styled(ModalBody)`
  max-height: 400px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    background-color: #f1f1f1;
  }
`

const TimelineModal = ({ isOpen, toggle, selectedTecId, selectedProject }) => {
  const baseUrl = process.env.REACT_APP_BASE_URL
  const [apiData, setApiData] = useState([])
  const [loading, setLoading] = useState(false)
  const isMounted = useRef(true)

  const formatDateTime = dateTimeString => {
    return format(new Date(dateTimeString), "yyyy MMM dd HH:mm")
  }

  useEffect(() => {
    isMounted.current = true
    const abortController = new AbortController()

    const fetchData = async () => {
      try {
        setLoading(true)
        if (selectedTecId != null) {
          const response = await fetch(
            baseUrl + "/tectimeline/" + selectedTecId,
            {
              signal: abortController.signal,
            }
          )
          const data = await response.json()
          console.log("API Response:", data.data)
          if (isMounted.current) {
            setApiData(data.data)
          }
        } else {
          console.warn("selectedTecId is null or undefined. Skipping API call.")
        }
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Fetch aborted")
        } else {
          console.error("Error fetching data from the API:", error)
        }
      } finally {
        if (isMounted.current) {
          setLoading(false)
        }
      }
    }

    fetchData()

    return () => {
      isMounted.current = false
      abortController.abort()
    }
  }, [selectedTecId, selectedProject])

  useEffect(() => {
    if (!isOpen) {
      setApiData([])
    }
  }, [isOpen])

  return (
    <Modal isOpen={isOpen} toggle={toggle} centered>
      <ModalHeader toggle={toggle}>{selectedProject} - Activity</ModalHeader>
      <StyledModalBody className="timeline-scrollbar d-flex align-items-center justify-content-center">
        {loading ? (
          <div className="d-flex justify-content-center align-items-center">
            <Spinner type="grow" className="ms-2" color="primary" />
          </div>
        ) : (
          <ol className="activity-feed">
            {apiData && apiData.length > 0 ? (
              apiData.map((activity, index) => (
                <li key={index} className="feed-item">
                  <div className="feed-item-list">
                    <span className="date">
                      <strong>{formatDateTime(activity.updatedon)}</strong>
                    </span>
                    <span className="activity-text">{activity.comments}</span>
                  </div>
                </li>
              ))
            ) : (
              <span className="logo-sm">
                <img
                  src={emptyData}
                  style={{ height: "335px" }}
                  alt="Empty Data"
                  loading="lazy"
                />
              </span>
            )}
          </ol>
        )}
      </StyledModalBody>
    </Modal>
  )
}

export default TimelineModal
