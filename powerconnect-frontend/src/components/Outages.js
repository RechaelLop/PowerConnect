import React from "react";

const mockOutages = [
  { id: 1, area: "Sector 5", reason: "Transformer Fault", estimatedRestore: "2 hrs" },
  { id: 2, area: "Sector 10", reason: "Scheduled Maintenance", estimatedRestore: "4 hrs" },
];

function Outages() {
  return (
    <div>
      {mockOutages.map((outage) => (
        <div key={outage.id} style={{ border: "1px solid #ccc", padding: "10px", margin: "5px 0" }}>
          <p><strong>Area:</strong> {outage.area}</p>
          <p><strong>Reason:</strong> {outage.reason}</p>
          <p><strong>Estimated Restore:</strong> {outage.estimatedRestore}</p>
        </div>
      ))}
    </div>
  );
}

export default Outages;
