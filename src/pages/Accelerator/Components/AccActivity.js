import React, { useState, useEffect, useRef } from "react";
import { Modal, ModalBody, ModalHeader, Spinner } from "reactstrap";

const AccActivityModal = ({
  isOpen,
  toggle,
  selectedAcceleratorId,
  selectedAccelerator,
}) => {
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(false); // Set to false initially
  const isMounted = useRef(true);

  const formatDateTime = (dateTimeString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    const formattedDate = new Date(dateTimeString).toLocaleString(
      "en-US",
      options
    );
    return formattedDate;
  };

  useEffect(() => {
    isMounted.current = true;
    const abortController = new AbortController();

    const fetchData = async () => {
      setLoading(true); // Set loading to true when fetching data begins
      try {
        if (selectedAcceleratorId != null) {
          const response = await fetch(
            baseUrl + "/acctimeline/" + selectedAcceleratorId,
            {
              signal: abortController.signal,
            }
          );
          const data = await response.json();
          console.log("API Response:", data.data);
          if (isMounted.current) {
            setApiData(data.data);
          }
        } else {
          console.warn(
            "selectedAcceleratorId is null or undefined. Skipping API call"
          );
        }
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          console.error("Error fetching data from the API:", error);
        }
      } finally {
        if (isMounted.current) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted.current = false;
      abortController.abort();
    };
  }, [selectedAcceleratorId]);

  useEffect(() => {
    if (!isOpen) {
      setApiData([]);
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} toggle={toggle} centered>
      <ModalHeader toggle={toggle}>
        {selectedAccelerator} - Activity
      </ModalHeader>
      <ModalBody>
        {loading ? (
          <div className="d-flex justify-content-center align-items-center">
            <Spinner type="grow" className="ms-2" color="success" />
            <Spinner type="grow" className="ms-2" color="danger" />
            <Spinner type="grow" className="ms-2" color="warning" />
            <Spinner type="grow" className="ms-2" color="info" />
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
              <p>No data available</p>
            )}
          </ol>
        )}
      </ModalBody>
    </Modal>
  );
};

export default AccActivityModal;
