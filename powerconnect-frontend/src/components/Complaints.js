import React from "react";

const mockComplaints = [
  { id: 1, type: "No Power", status: "In Progress", engineer: "Ramesh" },
  { id: 2, type: "Fuse Issue", status: "Resolved", engineer: "Suresh" },
];

function Complaints() {
  return (
    <div>
      {mockComplaints.map((complaint) => (
        <div key={complaint.id} style={{ border: "1px solid #ccc", padding: "10px", margin: "5px 0" }}>
          <p><strong>Type:</strong> {complaint.type}</p>
          <p><strong>Status:</strong> {complaint.status}</p>
          <p><strong>Engineer:</strong> {complaint.engineer}</p>
        </div>
      ))}
    </div>
  );
}

export default Complaints;
