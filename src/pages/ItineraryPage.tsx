import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Download,
  Globe2,
  DollarSign,
  Calendar,
  MapPin,
  Utensils,
  Hotel,
  Gem,
  UtensilsCrossed,
  HousePlus,
} from "lucide-react";
import Navbar from "../components/Navbar";
import generateItineraryPDF from "../utils/itineraryPdfGenerator";
import { Itinerary } from "../types/index";

export default function ItineraryPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { itinerary } = location.state as { itinerary: Itinerary };

  const resetQuiz = () => {
    navigate("/");
  };

  if (!itinerary) {
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
                No Itinerary Found
              </p>
              <p className="text-gray-600 mb-6">
                Please start a new trip plan to generate an itinerary.
              </p>
            </div>
            <button
              onClick={resetQuiz}
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-medium bg-gradient-to-r from-blue-600 to-teal-600 text-white hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Start New Trip Plan
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
                  Your Perfect Trip
                </h1>
                <p className="text-gray-600 mt-1">
                  Personalized itinerary based on your preferences
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
                  onClick={() => generateItineraryPDF(itinerary)}
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
                  {itinerary.summary}
                </p>
              </div>
            </div>
          </div>

          {/* Trip Details */}
          <div className="px-6 sm:px-8 py-6 bg-gradient-to-r from-blue-50 to-teal-50">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-500">Destinations</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {itinerary.destinations.map((destination, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {destination}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-500">Duration</p>
                  <p className="font-medium text-gray-900">
                    {itinerary.trip_duration.total_days} days (
                    {itinerary.trip_duration.start_date} to{" "}
                    {itinerary.trip_duration.end_date})
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <DollarSign className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-500">Budget Estimate</p>
                  <p className="font-medium text-gray-900">
                    {itinerary.estimated_costs.currency}{" "}
                    {itinerary.estimated_costs.minimum_total} -{" "}
                    {itinerary.estimated_costs.maximum_total}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Daily Itinerary */}
        <div className="space-y-8">
          {itinerary.daily_itinerary.map((day, index) => (
            <div
              key={index}
              className="bg-white/90 backdrop-blur-sm border border-gray-200/80 rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow duration-200"
            >
              {/* Day Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 ">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-teal-600 flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-2xl font-semibold text-gray-900">
                      Day {day.day_number} : {day.title || "Untitled"}
                    </h3>
                    <p className="text-gray-600">{day.date}</p>
                  </div>
                </div>
              </div>

              {day.description && (
                <p className="text-gray-600">{day.description}</p>
              )}
            </div>
          ))}
        </div>

        {/* Dining */}
        {itinerary.dining && (
          <div className="mt-8 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden">
            <div className="px-6 sm:px-8 py-6 border-b border-gray-200/80">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-teal-600 flex items-center justify-center">
                  <Utensils className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900">Dining</h2>
              </div>
            </div>
            <div className="p-6 sm:p-8 grid grid-cols-1 gap-6">
              {itinerary.dining.map((city, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl p-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-teal-600 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {city.city}
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {city.recommendations.map((recommendation, recIndex) => (
                      <div
                        key={recIndex}
                        className="bg-white rounded-lg p-6 hover:shadow-md transition-shadow duration-200"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <UtensilsCrossed className="w-5 h-5 text-blue-600" />
                          <h3 className="text-lg font-medium text-gray-900">
                            {recommendation.name}
                          </h3>
                        </div>
                        <p className="text-sm text-gray-600 italic">
                          {recommendation.address}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Accommodation */}
        {itinerary.accommodation && (
          <div className="mt-8 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden">
            <div className="px-6 sm:px-8 py-6 border-b border-gray-200/80">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-teal-600 flex items-center justify-center">
                  <Hotel className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900">
                  Accommodation
                </h2>
              </div>
            </div>
            <div className="p-6 sm:p-8 grid grid-cols-1 gap-6">
              {itinerary.accommodation.map((city, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl p-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-teal-600 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {city.city}
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {city.recommendations.map((recommendation, recIndex) => (
                      <div
                        key={recIndex}
                        className="bg-white rounded-lg p-6 hover:shadow-md transition-shadow duration-200"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <HousePlus className="w-5 h-5 text-blue-600" />
                          <h3 className="text-lg font-medium text-gray-900">
                            {recommendation.name}
                          </h3>
                        </div>
                        <p className="text-sm text-gray-600 italic">
                          {recommendation.address}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Hidden Gems */}
        {itinerary.hidden_gems && (
          <div className="mt-8 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden">
            <div className="px-6 sm:px-8 py-6 border-b border-gray-200/80">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-teal-600 flex items-center justify-center">
                  <Gem className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900">
                  Hidden Gems
                </h2>
              </div>
            </div>
            <div className="p-6 sm:p-8 grid grid-cols-1 gap-6">
              {itinerary.hidden_gems.map((gem, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl p-6"
                >
                  <h3 className="text-lg font-medium text-gray-900">{gem}</h3>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Disclaimer */}
        <div className="mt-8 bg-yellow-50/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden">
          <div className="px-6 sm:px-8 py-6 border-b border-gray-200/80">
            <h2 className="text-2xl font-semibold text-gray-900">Disclaimer</h2>
            <p className="text-gray-600">
              This AI-generated itinerary serves as a starting point for your
              travel planning. While we strive for accuracy, we recommend
              verifying details, checking current conditions, and consulting
              travel professionals when needed. Prices, availability, and
              conditions may vary.
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
