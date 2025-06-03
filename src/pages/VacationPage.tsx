import { useLocation, useNavigate } from "react-router-dom";
import { VacationItinerary } from "../types/index";
import {
  ArrowLeft,
  Download,
  Globe2,
  DollarSign,
  Calendar,
  Bus,
  Activity,
  ShieldCheck,
  MapPin,
  Star,
} from "lucide-react";
import Navbar from "../components/Navbar";
import generatePDF from "../utils/pdfGenerator";

export default function VacationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { vacationItinerary } = location.state as {
    vacationItinerary: VacationItinerary;
  };

  const resetQuiz = () => {
    navigate("/");
  };

  if (!vacationItinerary) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
        <Navbar />
        <div className="flex items-center justify-center h-[calc(100vh-80px)]">
          <div className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-red-100 max-w-md w-full mx-4">
            <div className="mb-6">
              <div className="text-red-600 h-12 w-12 mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <p className="text-gray-800 text-lg font-medium mb-2">
                No Vacation Recommendations Found
              </p>
              <p className="text-gray-600 mb-6">
                Please start a new vacation search to get recommendations.
              </p>
            </div>
            <button
              onClick={resetQuiz}
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-medium bg-gradient-to-r from-blue-600 to-teal-600 text-white hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Start New Search
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with actions */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="border-b border-gray-200/80 px-6 sm:px-8 py-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                  Your Perfect Getaway
                </h1>
                <p className="text-gray-600 mt-1">
                  Personalized recommendations based on your preferences
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={resetQuiz}
                  className="inline-flex items-center px-4 py-2 rounded-xl text-white bg-gradient-to-r from-blue-600 to-teal-600 hover:shadow-md transition-all duration-200"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  New Search
                </button>
                <button
                  onClick={() => generatePDF(vacationItinerary)}
                  className="inline-flex items-center px-4 py-2 rounded-xl text-white bg-gradient-to-r from-blue-600 to-teal-600 hover:shadow-md transition-all duration-200"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </button>
              </div>
            </div>
          </div>

          {/* Summary Section */}
          <div className="px-6 sm:px-8 py-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-teal-600 flex items-center justify-center">
                <Globe2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Trip Overview
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {vacationItinerary.summary}
                </p>
              </div>
            </div>
          </div>

          {/* Search Criteria */}
          <div className="px-6 sm:px-8 py-6 bg-gradient-to-r from-blue-50 to-teal-50">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex items-center gap-3">
                <Activity className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-500">Vacation Style</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {vacationItinerary.meta.search_criteria.vacation_style
                      .split(",") 
                      .map((style) => style.trim()) 
                      .map((style, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          {style.charAt(0).toUpperCase() + style.slice(1)}
                        </span>
                      ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-500">Travel Dates</p>
                  <p className="font-medium text-gray-900">
                    {vacationItinerary.meta.search_criteria.dates}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <DollarSign className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-500">Budget Range</p>
                  <p className="font-medium text-gray-900">
                    {vacationItinerary.meta.search_criteria.budget_range}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="space-y-8">
          {vacationItinerary.recommendations.map((rec, index) => (
            <div
              key={index}
              className="bg-white/90 backdrop-blur-sm border border-gray-200/80 rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow duration-200"
            >
              {/* Destination Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-teal-600 flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900">
                      {rec.destination.region}
                    </h3>
                    <p className="text-gray-600">{rec.destination.country}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="text-lg font-semibold">
                    {rec.destination.match_score}% Match
                  </span>
                </div>
              </div>

              {/* Why Perfect Match */}
              <div className="mb-8">
                <h4 className="text-lg font-medium text-gray-900 mb-2">
                  Why It's Perfect For You
                </h4>
                <p className="text-gray-700 leading-relaxed">
                  {rec.why_perfect_match}
                </p>
              </div>

              {/* Cost Breakdown */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <DollarSign className="w-5 h-5 text-blue-600" />
                    <h4 className="text-lg font-medium text-gray-900">
                      Cost Breakdown
                    </h4>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                      <span className="font-medium text-gray-900">
                        Total per person
                      </span>
                      <span className="text-lg font-semibold text-blue-600">
                        {rec.costs.currency}{" "}
                        {rec.costs.total_per_person.toLocaleString()}
                      </span>
                    </div>
                    {Object.entries(rec.costs.breakdown).map(
                      ([category, amount]) => (
                        <div
                          key={category}
                          className="flex justify-between items-center"
                        >
                          <span className="capitalize text-gray-600">
                            {category}
                          </span>
                          <span className="font-medium">
                            {rec.costs.currency} {amount.toLocaleString()}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>

                {/* Weather & Season */}
                <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <h4 className="text-lg font-medium text-gray-900">
                      Weather & Season
                    </h4>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <span className="font-medium text-gray-900 min-w-[120px]">
                        Peak Season:
                      </span>
                      <span className="text-gray-700">
                        {rec.best_time_to_visit.peak_season.join(", ")}
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-medium text-gray-900 min-w-[120px]">
                        Shoulder Season:
                      </span>
                      <span className="text-gray-700">
                        {rec.best_time_to_visit.shoulder_season.join(", ")}
                      </span>
                    </div>
                    <div className="mt-4">
                      <p className="text-gray-700">
                        {rec.best_time_to_visit.weather}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Transportation & Safety */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Bus className="w-5 h-5 text-blue-600" />
                    <h4 className="text-lg font-medium text-gray-900">
                      Transportation
                    </h4>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-700">
                          Accessibility Score
                        </span>
                        <span className="font-medium">
                          {rec.transportation.score}/10
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-600 to-teal-600 h-2 rounded-full"
                          style={{
                            width: `${(rec.transportation.score / 10) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                    <p className="text-gray-700">
                      {rec.transportation.explanation}
                    </p>
                    <div>
                      <p className="font-medium text-gray-900 mb-2">
                        Available Options:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {rec.transportation.main_options.map((option, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-white rounded-full text-sm text-gray-700 border border-gray-200"
                          >
                            {option}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <ShieldCheck className="w-5 h-5 text-blue-600" />
                    <h4 className="text-lg font-medium text-gray-900">
                      Safety
                    </h4>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-700">Safety Score</span>
                        <span className="font-medium">
                          {rec.safety.score}/10
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-600 to-teal-600 h-2 rounded-full"
                          style={{ width: `${(rec.safety.score / 10) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <p className="text-gray-700">{rec.safety.explanation}</p>
                    <div>
                      <p className="font-medium text-gray-900 mb-2">
                        Special Considerations:
                      </p>
                      <ul className="space-y-2">
                        {rec.safety.special_considerations.map(
                          (consideration, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-blue-600 mt-2"></span>
                              <span className="text-gray-700">
                                {consideration}
                              </span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Must-Do Activities & Duration */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Activity className="w-5 h-5 text-blue-600" />
                    <h4 className="text-lg font-medium text-gray-900">
                      Must-Do Activities
                    </h4>
                  </div>
                  <div className="space-y-4">
                    {rec.must_do_activities.map((activity, i) => (
                      <div key={i} className="bg-white rounded-lg p-4">
                        <h5 className="font-medium text-gray-900 mb-2">
                          {activity.name}
                        </h5>
                        <p className="text-gray-700 text-sm mb-2">
                          {activity.description}
                        </p>
                        <p className="text-sm font-medium text-blue-600">
                          {activity.estimated_cost}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <h4 className="text-lg font-medium text-gray-900">
                      Recommended Duration
                    </h4>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-gray-700">Optimal Stay:</span>
                        <span className="font-medium text-gray-900">
                          {rec.recommended_duration.minimum_days} to{" "}
                          {rec.recommended_duration.optimal_days} days
                        </span>
                      </div>
                      <p className="text-gray-700">
                        {rec.recommended_duration.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="mt-8 bg-yellow-50/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden">
          <div className="px-6 sm:px-8 py-6 border-b border-gray-200/80">
            <h2 className="text-2xl font-semibold text-gray-900">Disclaimer</h2>
            <p className="text-gray-600">
              This AI-generated vacation planner provides personalized
              recommendations to inspire your travel planning. While we strive
              for accuracy and up-to-date information, we recommend
              double-checking all details, monitoring current conditions, and
              consulting travel professionals for specific advice. Please note
              that prices, availability, and local conditions may vary. Use this
              as a helpful guide while doing your own research to plan the
              perfect trip.
            </p>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-20 right-20 w-64 h-64 bg-blue-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-teal-200/30 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
}
