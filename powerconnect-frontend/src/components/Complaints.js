import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Complaints.css";
import { FaDownload } from "react-icons/fa";

function Complaints() {
  const [formData, setFormData] = useState({
    name: "",
    area: "",
    issueType: "",
    urgency: "",
    complaint: "",
  });

  const [submittedComplaints, setSubmittedComplaints] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const userId = 1; // Replace with logged-in user ID

  useEffect(() => {
    // Fetch complaints from backend
    axios.get("http://localhost:5000/complaints")
      .then((res) => setSubmittedComplaints(res.data))
      .catch((err) => console.error("Error fetching complaints:", err));

    // Fetch notifications for user
    axios.get(`http://localhost:5000/notifications/${userId}`)
      .then((res) => setNotifications(res.data))
      .catch((err) => console.error("Error fetching notifications:", err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newComplaint = {
      user_id: userId,
      area: formData.area,
      issue_type: formData.issueType,
      urgency: formData.urgency,
      description: formData.complaint,
    };

    axios.post("http://localhost:5000/complaints", newComplaint)
      .then((res) => {
        setSubmittedComplaints([res.data, ...submittedComplaints]);
        setFormData({ name: "", area: "", issueType: "", urgency: "", complaint: "" });
      })
      .catch((err) => console.error("Error submitting complaint:", err));
  };

  const toggleStatusDetails = (id) => {
    const updated = submittedComplaints.map((c) =>
      c.id === id ? { ...c, showDetails: !c.showDetails } : c
    );
    setSubmittedComplaints(updated);
  };

  const downloadComplaint = (complaint) => {
    const visitInfo =
      complaint.status === "Visit Scheduled"
        ? `
Visit Date: ${complaint.visitDetails.date}
Visit Time: ${complaint.visitDetails.time}
Engineer: ${complaint.visitDetails.engineer}`
        : "";
    const content = `
Complaint ID: ${complaint.id}
Area: ${complaint.area}
Issue Type: ${complaint.issue_type}
Urgency: ${complaint.urgency}
Description: ${complaint.description}
Status: ${complaint.status}
${visitInfo}`;
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `complaint_${complaint.id}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="page-offset complaints-container">
      <h2>Submit a Service Request / Complaint</h2>
      <p className="complaints-description">
        Use the form below to report electricity-related issues or submit service requests. Please provide detailed information for faster resolution.
      </p>

      {/* Notifications */}
      <div className="notifications-container">
        <h4>Notifications</h4>
        {notifications.length === 0 && <p>No new notifications</p>}
        {notifications.map((n) => (
          <div key={n.id} className={`notification ${n.is_read ? "read" : "unread"}`}>
            <p>{n.message}</p>
            <small>{new Date(n.created_at).toLocaleString()}</small>
          </div>
        ))}
      </div>

      {/* Complaint Form */}
      <form className="complaint-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <label>
            Area / Sector <span className="required">*</span>
            <input type="text" name="area" value={formData.area} onChange={handleChange} placeholder="e.g., Sector 5" required />
          </label>
          <label>
            Issue Type <span className="required">*</span>
            <select name="issueType" value={formData.issueType} onChange={handleChange} required>
              <option value="">Select issue type</option>
              <option value="Power Outage">Power Outage</option>
              <option value="Voltage Fluctuation">Voltage Fluctuation</option>
              <option value="Meter Issue">Meter Issue</option>
              <option value="Other">Other</option>
            </select>
          </label>
          <label>
            Urgency <span className="required">*</span>
            <select name="urgency" value={formData.urgency} onChange={handleChange} required>
              <option value="">Select urgency</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </label>
        </div>

        <label>
          Detailed Description <span className="required">*</span>
          <textarea name="complaint" value={formData.complaint} onChange={handleChange} placeholder="Describe the issue in detail..." required />
        </label>

        <button type="submit">Submit Request</button>
      </form>

      {/* Submitted Complaints */}
      {submittedComplaints.length > 0 && (
        <div className="submitted-complaints">
          <h3>Your Submitted Requests & Status</h3>
          {submittedComplaints.map((c) => (
            <div key={c.id} className={`complaint-card status-${c.status.toLowerCase().replace(" ", "-")}`}>
              <p><strong>Area:</strong> {c.area}</p>
              <p><strong>Issue Type:</strong> {c.issue_type}</p>
              <p><strong>Urgency:</strong> {c.urgency}</p>
              <p><strong>Description:</strong> {c.description}</p>

              <button className="check-status-btn" onClick={() => toggleStatusDetails(c.id)}>
                Check Status
              </button>

              {c.showDetails && (
                <div className="status-details">
                  <p><strong>Status:</strong> {c.status}</p>
                  {c.status === "Visit Scheduled" && c.visitDetails && (
                    <>
                      <p><strong>Date:</strong> {c.visitDetails.date}</p>
                      <p><strong>Time:</strong> {c.visitDetails.time}</p>
                      <p><strong>Engineer:</strong> {c.visitDetails.engineer}</p>
                    </>
                  )}
                </div>
              )}

              <button className="download-btn" onClick={() => downloadComplaint(c)}>
                <FaDownload /> Download
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Complaints;
