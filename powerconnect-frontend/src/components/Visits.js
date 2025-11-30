import React, { useState, useEffect } from "react";
import "../styles/Visits.css";
import { FaUserTie } from "react-icons/fa";
import axios from "axios";

function Visits() {
  const [visits, setVisits] = useState([]);
  const userId = 1; // Replace with logged-in user ID

  useEffect(() => {
    // Fetch visits from backend
    axios.get("http://localhost:5000/visits")
      .then((res) => setVisits(res.data))
      .catch((err) => console.error("Error fetching visits:", err));
  }, []);

  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case "pending": return "#ffc107";
      case "completed": return "#28a745";
      case "delayed": return "#dc3545";
      default: return "#007bff";
    }
  };

  return (
    <div className="page-offset visits-container">
      <h2>Scheduled Engineer Visits</h2>
      <p className="visits-description">
        Here’s a summary of upcoming and recent engineer visits in your area.
      </p>
      {visits.length === 0 && <p>No scheduled visits yet.</p>}
      {visits.map((visit) => {
        const color = getStatusColor(visit.status);
        return (
          <div key={visit.id} className="visit-card" style={{ borderLeft: `5px solid ${color}` }}>
            <FaUserTie className="visit-icon" style={{ color }} />
            <div className="visit-info">
              <p><strong>Area:</strong> {visit.area}</p>
              <p><strong>Engineer:</strong> {visit.engineer_name}</p>
              <p><strong>Purpose:</strong> {visit.purpose || "Complaint Resolution"}</p>
              <p><strong>Date:</strong> {new Date(visit.scheduled_date).toLocaleDateString()}</p>
              <p><strong>Status:</strong> {visit.status}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Visits;
