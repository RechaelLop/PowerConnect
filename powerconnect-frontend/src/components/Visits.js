import React from "react";

const mockVisits = [
  { id: 1, purpose: "Repair", date: "2025-11-12 10:00", engineer: "Ramesh", status: "Scheduled" },
  { id: 2, purpose: "Inspection", date: "2025-11-13 14:00", engineer: "Suresh", status: "Completed" },
];

function Visits() {
  return (
    <div>
      {mockVisits.map((visit) => (
        <div key={visit.id} style={{ border: "1px solid #ccc", padding: "10px", margin: "5px 0" }}>
          <p><strong>Purpose:</strong> {visit.purpose}</p>
          <p><strong>Date & Time:</strong> {visit.date}</p>
          <p><strong>Engineer:</strong> {visit.engineer}</p>
          <p><strong>Status:</strong> {visit.status}</p>
        </div>
      ))}
    </div>
  );
}

export default Visits;
