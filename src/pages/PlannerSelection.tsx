import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';

const PlannerSelection = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              Choose Your
              <span className="block bg-gradient-to-br from-blue-600 to-teal-600 bg-clip-text text-transparent">
                Planning Style
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Select the type of planning that best suits your needs. Whether you're looking for a complete vacation package or a detailed day-by-day itinerary.
            </p>
          </div>
        </div>

        {/* Cards Container */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto animate-fade-in">
          {/* Vacation Planner Card */}
          <div 
            onClick={() => navigate('/vacation-planner')}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border border-blue-100/50"
          >
            <div className="bg-gradient-to-br from-blue-600 to-teal-600 rounded-2xl w-16 h-16 flex items-center justify-center mb-6">
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Vacation Planner</h2>
            <p className="text-gray-600 mb-6 text-lg">
              Get personalized vacation recommendations based on your preferences, budget, and travel style. Perfect for planning complete vacation packages.
            </p>
            <div className="flex items-center text-blue-600 font-semibold group">
              Start Planning
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Itinerary Planner Card */}
          <div 
            onClick={() => navigate('/trip-planner')}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border border-teal-100/50"
          >
            <div className="bg-gradient-to-br from-teal-600 to-blue-600 rounded-2xl w-16 h-16 flex items-center justify-center mb-6">
              <Calendar className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Itinerary Planner</h2>
            <p className="text-gray-600 mb-6 text-lg">
              Create a detailed day-by-day itinerary with activities, restaurants, and timing. Perfect for planning specific days of your trip.
            </p>
            <div className="flex items-center text-teal-600 font-semibold group">
              Create Itinerary
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </div>
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
};

export default PlannerSelection;
