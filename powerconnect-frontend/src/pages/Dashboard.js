import React from "react";
import Outages from "../components/Outages";
import Complaints from "../components/Complaints";
import Visits from "../components/Visits";

function Dashboard() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>PowerConnect Dashboard</h1>

      <section>
        <h2>⚡ Current & Scheduled Outages</h2>
        <Outages />
      </section>

      <section>
        <h2>📝 Complaints</h2>
        <Complaints />
      </section>

      <section>
        <h2>👷 Engineer Visits</h2>
        <Visits />
      </section>
    </div>
  );
}

export default Dashboard;
