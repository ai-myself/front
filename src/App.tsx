import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LocationInfo from "./components/LocationInfo";
import PersonalityTest from "./components/PersonalityTest";
import PhotoUpload from "./components/PhotoUpload";
import Recommendations from "./components/Recommendations";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<PhotoUpload />} />
          <Route path="/location-info" element={<LocationInfo />} />
          <Route path="/personality-test" element={<PersonalityTest />} />
          <Route path="/recommendations" element={<Recommendations />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
