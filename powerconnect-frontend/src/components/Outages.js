import React, { useEffect, useState } from "react";
import "../styles/Outages.css";
import { FaExclamationTriangle, FaTools, FaCheckCircle } from "react-icons/fa";

// Optional: simple notification popup
function Notification({ message, onClose }) {
  return (
    <div className="notification-popup">
      <p>{message}</p>
      <button onClick={onClose}>X</button>
    </div>
  );
}

function Outages() {
  const [outages, setOutages] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Fetch outages from backend
    fetch("/outages")
      .then((res) => res.json())
      .then((data) => {
        setOutages(data);

        // Show notification for each new outage
        const messages = data.map(
          (o) =>
            `Outage in ${o.area} from ${new Date(o.start_time).toLocaleString()} to ${o.end_time ? new Date(o.end_time).toLocaleString() : "unknown"}. Reason: ${o.reason}`
        );
        setNotifications(messages);
      })
      .catch((err) => console.error(err));
  }, []);

  const removeNotification = (index) => {
    const newNotifications = [...notifications];
    newNotifications.splice(index, 1);
    setNotifications(newNotifications);
  };

  return (
    <div className="page-offset outages-container">
      <h2>Power Outages</h2>
      <p className="outages-description">
        Current power outages and maintenance updates. Stay informed and plan accordingly.
      </p>

      {/* Notifications */}
      {notifications.map((msg, i) => (
        <Notification key={i} message={msg} onClose={() => removeNotification(i)} />
      ))}

      <div className="outages-cards">
        {outages.map((outage) => {
          let severityClass = outage.status.toLowerCase() === "resolved" ? "resolved" : outage.status.toLowerCase() === "scheduled" ? "minor" : "critical";
          return (
            <div key={outage.id} className={`outage-card ${severityClass}`}>
              <div className="outage-icon">
                {severityClass === "critical" ? <FaExclamationTriangle /> :
                 severityClass === "minor" ? <FaTools /> :
                 <FaCheckCircle style={{ color: "green" }} />}
              </div>
              <div className="outage-info">
                <p><strong>Area:</strong> {outage.area}</p>
                <p><strong>Reason:</strong> {outage.reason}</p>
                <p><strong>Start:</strong> {new Date(outage.start_time).toLocaleString()}</p>
                <p><strong>End:</strong> {outage.end_time ? new Date(outage.end_time).toLocaleString() : "Ongoing"}</p>
                <p><strong>Status:</strong> {outage.status}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Outages;
