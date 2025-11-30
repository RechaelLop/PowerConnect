import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Outages from "./components/Outages";
import Complaints from "./components/Complaints";
import Visits from "./components/Visits";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/outages" element={<Outages />} />
          <Route path="/complaints" element={<Complaints />} />
          <Route path="/visits" element={<Visits />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
