import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Download,
  Globe2,
  DollarSign,
  Calendar,
  MapPin,
  Clock,
  Activity,
  Star,
  Shield,
  Briefcase,
  Camera,
  Utensils,
} from "lucide-react";
import Navbar from "../components/Navbar";
import generateItineraryPDF from "../utils/itineraryPdfGenerator";
import {
  Itinerary,
  Activity as ActivityType,
} from "../types/index";

export default function ItineraryPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { itinerary } = location.state as { itinerary: Itinerary };

  const resetQuiz = () => {
    navigate("/");
  };

  const renderActivity = (activity: ActivityType) => (
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-r from-blue-50 to-teal-50 flex items-center justify-center">
        <Clock className="w-5 h-5 text-blue-600" />
      </div>
      <div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-500">
            {activity.time}
          </span>
          <h5 className="text-lg font-medium text-gray-900">
            {activity.activity}
          </h5>
        </div>
        {activity.location && (
          <div className="flex items-center gap-1 mt-1 text-sm text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>{activity.location.name}</span>
          </div>
        )}
        {activity.description && (
          <p className="mt-2 text-gray-600">{activity.description}</p>
        )}
        {activity.cost && (
          <div className="mt-2 flex items-center gap-1 text-sm text-gray-600">
            <DollarSign className="w-4 h-4" />
            <span>
              {activity.cost.amount} {activity.cost.currency}
            </span>
          </div>
        )}
        {activity.notes && activity.notes.length > 0 && (
          <div className="mt-2 text-sm text-gray-500">
            {activity.notes.map((note, index) => (
              <div key={index} className="italic">
                • {note}
              </div>
            ))}
          </div>
        )}
        {activity.booking_info && activity.booking_info.required && (
          <div className="mt-2 text-sm text-blue-600">
            <strong>Booking required:</strong>{" "}
            {activity.booking_info.instructions}
          </div>
        )}
      </div>
    </div>
  );

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
                  <div className="flex flex-wrap gap-2">
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
                    {itinerary.trip_duration.total_days} days
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <DollarSign className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-500">Budget Estimate</p>
                  <p className="font-medium text-gray-900">
                    {itinerary.total_budget_estimate.currency}{" "}
                    {itinerary.total_budget_estimate.low} -{" "}
                    {itinerary.total_budget_estimate.high}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Daily Itinerary */}
        <div className="space-y-8">
          {itinerary.days.map((day, index) => (
            <div
              key={index}
              className="bg-white/90 backdrop-blur-sm border border-gray-200/80 rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow duration-200"
            >
              {/* Day Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-teal-600 flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900">
                      Day {day.day_number}
                    </h3>
                    <p className="text-gray-600">{day.date}</p>
                    {day.themes && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {day.themes.map((theme, themeIndex) => (
                          <span
                            key={themeIndex}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                          >
                            {theme}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Morning Activities */}
              {day.morning && day.morning.length > 0 && (
                <div className="mb-8">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">
                    Morning
                  </h4>
                  <div className="space-y-6">
                    {day.morning.map((activity, actIndex) => (
                      <div key={actIndex}>{renderActivity(activity)}</div>
                    ))}
                  </div>
                </div>
              )}

              {/* Afternoon Activities */}
              {day.afternoon && day.afternoon.length > 0 && (
                <div className="mb-8">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">
                    Afternoon
                  </h4>
                  <div className="space-y-6">
                    {day.afternoon.map((activity, actIndex) => (
                      <div key={actIndex}>{renderActivity(activity)}</div>
                    ))}
                  </div>
                </div>
              )}

              {/* Evening Activities */}
              {day.evening && day.evening.length > 0 && (
                <div className="mb-8">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">
                    Evening
                  </h4>
                  <div className="space-y-6">
                    {day.evening.map((activity, actIndex) => (
                      <div key={actIndex}>{renderActivity(activity)}</div>
                    ))}
                  </div>
                </div>
              )}

              {/* Transportation */}
              {day.transportation && day.transportation.length > 0 && (
                <div className="mb-8">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">
                    Transportation
                  </h4>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {day.transportation.map((transport, index) => (
                      <div
                        key={index}
                        className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl p-6"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-medium text-gray-900">
                            {transport.type}
                          </span>
                        </div>
                        <div className="space-y-2">
                          {transport.route && (
                            <p className="text-gray-600">
                              <span className="font-medium">Route:</span>{" "}
                              {transport.route}
                            </p>
                          )}
                          {transport.duration && (
                            <p className="text-gray-600">
                              <span className="font-medium">Duration:</span>{" "}
                              {transport.duration}
                            </p>
                          )}
                          {transport.cost && (
                            <p className="text-gray-600">
                              <span className="font-medium">Cost:</span>{" "}
                              {transport.cost.amount} {transport.cost.currency}
                            </p>
                          )}
                          {transport.frequency && (
                            <p className="text-gray-600">
                              <span className="font-medium">Frequency:</span>{" "}
                              {transport.frequency}
                            </p>
                          )}
                          {transport.booking_info && (
                            <p className="text-sm text-blue-600 mt-2">
                              {transport.booking_info}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Daily Budget */}
              {day.daily_budget_estimate && (
                <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <DollarSign className="w-5 h-5 text-blue-600" />
                    <h4 className="text-lg font-medium text-gray-900">
                      Daily Budget Estimate
                    </h4>
                  </div>
                  <p className="text-gray-700">
                    {day.daily_budget_estimate.currency}{" "}
                    {day.daily_budget_estimate.low} -{" "}
                    {day.daily_budget_estimate.high}
                  </p>
                </div>
              )}

              {/* Important Notes */}
              {day.important_notes && day.important_notes.length > 0 && (
                <div className="mt-6 bg-yellow-50 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Star className="w-5 h-5 text-yellow-600" />
                    <h4 className="text-lg font-medium text-gray-900">
                      Important Notes
                    </h4>
                  </div>
                  <ul className="space-y-2">
                    {day.important_notes.map((note, index) => (
                      <li key={index} className="text-gray-700">
                        • {note}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Dining */}
        {itinerary.dining && (
          <div className="mt-8 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden">
            <div className="px-6 sm:px-8 py-6 border-b border-gray-200/80">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-r from-blue-50 to-teal-50 flex items-center justify-center">
                  <Utensils className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Dining
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Recommended places to eat during your trip
                  </p>
                </div>
              </div>
            </div>
            <div className="p-6 sm:p-8 grid grid-cols-1 gap-6">
              {itinerary.dining.map((dining, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl p-6"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {dining.city}
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {dining.meal_options.map((meal, recIndex) => (
                      <div
                        key={recIndex}
                        className="bg-white rounded-lg p-6 hover:shadow-md transition-shadow duration-200"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-medium text-gray-900">
                              {meal.meal_type}
                            </h4>
                            <div className="grid grid-cols-1 gap-4">
                              {meal.restaurants.map((restaurant, resIndex) => (
                                <div
                                  key={resIndex}
                                  className="mt-4 border-b border-gray-200/80 p-4 border-dashed bg-gradient-to-r from-blue-50 to-teal-50"
                                >
                                  <div className="flex items-center gap-2">
                                    <div>
                                      <h5 className="text-sm font-medium text-gray-900">
                                        {restaurant.name}
                                      </h5>
                                      <p className="text-xs text-gray-600">
                                        {restaurant.cuisine}
                                      </p>
                                      <div className="mt-2 flex items-center gap-1">
                                        <span className="text-xs font-medium text-blue-600">
                                          {restaurant.price_range.currency}{" "}
                                          {restaurant.price_range.low} -{" "}
                                          {restaurant.price_range.high}
                                        </span>
                                      </div>
                                      <div className="mt-2 space-y-1">
                                        <p className="text-xs text-gray-500">
                                          Address: {restaurant.address}
                                        </p>
                                        <div className="flex flex-wrap gap-1">
                                          <p className="text-xs text-gray-500 italic">Pros:</p>
                                          <div className="flex flex-wrap">
                                            {restaurant.pros.map(
                                              (pro, proIndex) => (
                                                <span
                                                  key={proIndex}
                                                  className="inline-flex items-center rounded-full text-xs font-medium text-green-600 italic"
                                                >
                                                  {'- '}{pro}
                                                </span>
                                              )
                                            )}
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap gap-1 mt-1">
                                          <p className="text-xs text-gray-500 italic">Cons:</p>
                                          <div className="flex flex-wrap">
                                            {restaurant.cons.map(
                                              (con, conIndex) => (
                                                <span
                                                  key={conIndex}
                                                  className="inline-flex items-center rounded-full text-xs font-medium text-red-600 italic"
                                                >
                                                  {'- '}{con}
                                                </span>
                                              )
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
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
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-r from-blue-50 to-teal-50 flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Accommodation
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Recommended places to stay during your trip
                  </p>
                </div>
              </div>
            </div>
            <div className="p-6 sm:p-8 grid grid-cols-1 gap-6">
              {itinerary.accommodation.map((city, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl p-6"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {city.city}
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {city.recommendations.map((recommendation, recIndex) => (
                      <div
                        key={recIndex}
                        className="bg-white rounded-lg p-6 hover:shadow-md transition-shadow duration-200"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-medium text-gray-900">
                              {recommendation.name}
                            </h4>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mt-2">
                              {recommendation.type}
                            </span>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-blue-600">
                              {recommendation.price_range.currency}{" "}
                              {recommendation.price_range.low} -{" "}
                              {recommendation.price_range.high}
                            </p>
                          </div>
                        </div>
                        <div className="mt-4 space-y-2">
                          <div className="flex items-start gap-2">
                            <MapPin className="w-4 h-4 text-gray-400 mt-1" />
                            <p className="text-sm text-gray-600">
                              {recommendation.location.address}
                            </p>
                          </div>
                          <div className="flex items-start gap-2">
                            <Star className="w-4 h-4 text-gray-400 mt-1" />
                            <p className="text-sm text-gray-600">
                              Near:{" "}
                              {recommendation.location.proximity_highlights.join(
                                ", "
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Essential Information */}
        {itinerary.essential_information && (
          <div className="mt-8 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden">
            <div className="px-6 sm:px-8 py-6 border-b border-gray-200/80">
              <h2 className="text-2xl font-semibold text-gray-900">
                Essential Information
              </h2>
            </div>
            <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Emergency Contacts */}
              {itinerary.essential_information.emergency_contacts && (
                <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Shield className="w-5 h-5 text-blue-600" />
                    <h4 className="text-lg font-medium text-gray-900">
                      Emergency Contacts
                    </h4>
                  </div>
                  <div className="space-y-2">
                    {Object.entries(
                      itinerary.essential_information.emergency_contacts
                    ).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-gray-600">{key}</span>
                        <span className="font-medium text-gray-900">
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Visa Requirements */}
              {itinerary.essential_information.visa_requirements && (
                <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Globe2 className="w-5 h-5 text-blue-600" />
                    <h4 className="text-lg font-medium text-gray-900">
                      Visa Requirements
                    </h4>
                  </div>
                  <div className="space-y-2">
                    <p className="text-gray-600">
                      <strong>Visa Type:</strong>{" "}
                      {itinerary.essential_information.visa_requirements.type}
                    </p>
                    <p className="text-gray-600">
                      <strong>Visa Cost:</strong>{" "}
                      {
                        itinerary.essential_information.visa_requirements.cost
                          .currency
                      }{" "}
                      {
                        itinerary.essential_information.visa_requirements.cost
                          .amount
                      }
                    </p>
                    <p className="text-gray-600">
                      <strong>Visa Process:</strong>{" "}
                      {
                        itinerary.essential_information.visa_requirements
                          .process
                      }
                    </p>
                  </div>
                </div>
              )}

              {/* Local SIM and WiFi Advice */}
              {itinerary.essential_information.local_sim_wifi_advice && (
                <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Globe2 className="w-5 h-5 text-blue-600" />
                    <h4 className="text-lg font-medium text-gray-900">
                      Local SIM and WiFi Advice
                    </h4>
                  </div>
                  <div className="space-y-2">
                    <p className="text-gray-600">
                      <strong>Local SIM Advice:</strong>{" "}
                      {
                        itinerary.essential_information.local_sim_wifi_advice
                          .sim_advice
                      }
                    </p>
                    <p className="text-gray-600">
                      <strong>Local WiFi Advice:</strong>{" "}
                      {
                        itinerary.essential_information.local_sim_wifi_advice
                          .wifi_advice
                      }
                    </p>
                  </div>
                </div>
              )}

              {/* Cultural Tips */}
              {itinerary.essential_information.cultural_tips && (
                <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Globe2 className="w-5 h-5 text-blue-600" />
                    <h4 className="text-lg font-medium text-gray-900">
                      Cultural Tips
                    </h4>
                  </div>
                  <ul className="space-y-2">
                    {itinerary.essential_information.cultural_tips.map(
                      (tip, index) => (
                        <li key={index} className="text-gray-600">
                          • {tip}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}

              {/* Weather Expectations */}
              {itinerary.essential_information.weather_expectations && (
                <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Activity className="w-5 h-5 text-blue-600" />
                    <h4 className="text-lg font-medium text-gray-900">
                      Weather Expectations
                    </h4>
                  </div>
                  <div className="space-y-2">
                    <p className="text-gray-600">
                      <strong>Temperature:</strong>{" "}
                      {
                        itinerary.essential_information.weather_expectations
                          .temperature_range
                      }
                    </p>
                    <p className="text-gray-600">
                      <strong>Precipitation:</strong>{" "}
                      {
                        itinerary.essential_information.weather_expectations
                          .precipitation
                      }
                    </p>
                    <p className="text-gray-600">
                      <strong>Seasonal Notes:</strong>{" "}
                      {
                        itinerary.essential_information.weather_expectations
                          .seasonal_notes
                      }
                    </p>
                  </div>
                </div>
              )}

              {/* Safety Considerations */}
              {itinerary.essential_information.safety_considerations && (
                <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Shield className="w-5 h-5 text-blue-600" />
                    <h4 className="text-lg font-medium text-gray-900">
                      Safety Considerations
                    </h4>
                  </div>
                  <ul className="space-y-2">
                    {itinerary.essential_information.safety_considerations.map(
                      (tip, index) => (
                        <li key={index} className="text-gray-600">
                          • {tip}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}

              {/* Hidden Gems */}
              {itinerary.essential_information.hidden_gems && (
                <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Star className="w-5 h-5 text-blue-600" />
                    <h4 className="text-lg font-medium text-gray-900">
                      Hidden Gems
                    </h4>
                  </div>
                  <ul className="space-y-2">
                    {itinerary.essential_information.hidden_gems.map(
                      (gem, index) => (
                        <li key={index} className="text-gray-600">
                          • {gem}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}

              {/* Photo Worthy Locations */}
              {itinerary.essential_information.photo_worthy_locations && (
                <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Camera className="w-5 h-5 text-blue-600" />
                    <h4 className="text-lg font-medium text-gray-900">
                      Photo Worthy Locations
                    </h4>
                  </div>
                  <ul className="space-y-2">
                    {itinerary.essential_information.photo_worthy_locations.map(
                      (location, index) => (
                        <li key={index} className="text-gray-600">
                          • {location}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Packing List */}
        {itinerary.essential_information.packing_list && (
          <div className="mt-8 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden">
            <div className="px-6 sm:px-8 py-6 border-b border-gray-200/80">
              <h2 className="text-2xl font-semibold text-gray-900">
                Packing List
              </h2>
            </div>
            <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {itinerary.essential_information.packing_list.map(
                (item, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl p-6"
                  >
                    <h4 className="text-lg font-medium text-gray-900">
                      {item}
                    </h4>
                  </div>
                )
              )}
            </div>
          </div>
        )}

        {/* Local Transportation */}
        {itinerary.essential_information.local_transportation && (
          <div className="mt-8 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden">
            <div className="px-6 sm:px-8 py-6 border-b border-gray-200/80">
              <h2 className="text-2xl font-semibold text-gray-900">
                Local Transportation
              </h2>
            </div>
            <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl p-6">
                <h4 className="text-lg font-medium text-gray-900">Options</h4>
                <ul className="space-y-2">
                  {itinerary.essential_information.local_transportation.options.map(
                    (option, index) => (
                      <li key={index} className="text-gray-600">
                        • {option}
                      </li>
                    )
                  )}
                </ul>
              </div>
              <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl p-6">
                <h4 className="text-lg font-medium text-gray-900">Tips</h4>
                <ul className="space-y-2">
                  {itinerary.essential_information.local_transportation.tips.map(
                    (tip, index) => (
                      <li key={index} className="text-gray-600">
                        • {tip}
                      </li>
                    )
                  )}
                </ul>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-xl p-6">
                <h4 className="text-lg font-medium text-gray-900">
                  Recommended Apps
                </h4>
                <ul className="space-y-2">
                  {itinerary.essential_information.local_transportation.apps.map(
                    (app, index) => (
                      <li key={index} className="text-gray-600">
                        • {app}
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Total Budget Estimate */}
        {itinerary.total_budget_estimate && (
          <div className="mt-8 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden">
            <div className="px-6 sm:px-8 py-6 border-b border-gray-200/80">
              <h2 className="text-2xl font-semibold text-gray-900">
                Total Budget Estimate
              </h2>
            </div>
            <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-xl p-6">
                <h4 className="text-lg font-medium text-gray-900">
                  Total Budget
                </h4>
                <p className="text-gray-600">
                  {itinerary.total_budget_estimate.currency}{" "}
                  {itinerary.total_budget_estimate.low} -{" "}
                  {itinerary.total_budget_estimate.high}
                </p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-xl p-6">
                <h4 className="text-lg font-medium text-gray-900">Breakdown</h4>
                <ul className="space-y-2">
                  {Object.entries(
                    itinerary.total_budget_estimate.breakdown
                  ).map(([key, value], index) => (
                    <li key={index} className="text-gray-600">
                      • {key}: {value}
                    </li>
                  ))}
                </ul>
              </div>
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
