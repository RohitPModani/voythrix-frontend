import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ItineraryPage from "./pages/ItineraryPage";
import "./index.css";
import HomePage from "./pages/HomePage";
import PlannerSelection from "./pages/PlannerSelection";
import VacationPlannerPage from "./pages/VacationPlannerPage";
import VacationPage from "./pages/VacationPage";
import TripPlannerPage from "./pages/TripPlannerPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/trip-planner" element={<TripPlannerPage />} />
        <Route path="/itinerary" element={<ItineraryPage />} />
        <Route path="/planner-selection" element={<PlannerSelection />} />
        <Route path="/vacation-planner" element={<VacationPlannerPage />} />
        <Route path="/vacation" element={<VacationPage />} />
      </Routes>
    </Router>
  );
}
