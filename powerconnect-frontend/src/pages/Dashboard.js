import "../styles/Dashboard.css";
import aboutImage from "../images/about.png";
import { FaUsers, FaHome, FaPlug, FaTools } from "react-icons/fa";

function Dashboard() {
  return (
    <div className="dashboard">
      {/* Hero / Dashboard Section */}
      <section className="hero">
        <div className="hero-content">
          <h2>Reliable Power, Connected Citizens</h2>
          <p>
            PowerConnect is your municipal portal to stay informed about power outages, 
            submit complaints, and track engineer visits.
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section" id="about">
        <div className="about-image">
          <img src={aboutImage} alt="Electricity Department" />
        </div>
        <div className="about-text">
          <h2>About the Electricity Department</h2>
          <p>
            The Electricity Department of our municipality ensures reliable power distribution,
            manages maintenance schedules, and responds promptly to outages and citizen complaints.
          </p>
          <p>
            Our mission is to provide an uninterrupted electricity supply while ensuring safety, 
            efficiency, and customer satisfaction.
          </p>
        </div>
      </section>

      {/* City Facts & Stats Section */}
      <section className="city-stats-section" id="stats">
        <h2>City Facts & Stats</h2>
        <p className="stats-description">
          Since the establishment of our Electricity Department, we have been working to ensure reliable power distribution, 
          timely maintenance, and efficient service for all citizens.
        </p>
        <p className="stats-description">
          Here are some key figures and insights about our operations.
        </p>
        <div className="stats-cards">
          <div className="stat-card">
            <FaUsers className="stat-icon" />
            <p className="stat-number">1,200,000</p>
            <p className="stat-desc">Population</p>
          </div>
          <div className="stat-card">
            <FaHome className="stat-icon" />
            <p className="stat-number">350,000</p>
            <p className="stat-desc">Total Households</p>
          </div>
          <div className="stat-card">
            <FaPlug className="stat-icon" />
            <p className="stat-number">320,000</p>
            <p className="stat-desc">Active Connections</p>
          </div>
          <div className="stat-card">
            <FaTools className="stat-icon" />
            <p className="stat-number">1,500+</p>
            <p className="stat-desc">Annual Maintenance</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
