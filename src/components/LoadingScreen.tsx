import { 
  Plane, 
  MapPin, 
  Calendar, 
  SquareChartGantt,
  Camera,
  Compass,
  Globe,
  Clock,
} from 'lucide-react';
import { useEffect, useState } from 'react';

interface LoadingScreenProps {
  isReady?: boolean;
}

const LoadingScreen = ({ isReady = false }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const travelIcons = [
    { icon: Plane, delay: 0 },
    { icon: MapPin, delay: 0.5 },
    { icon: Camera, delay: 1 },
    { icon: Compass, delay: 1.5 },
    { icon: Globe, delay: 2 },
    { icon: Clock, delay: 2.5 },
  ];

  useEffect(() => {
    const duration = 60000; 
    const interval = 100;
    const steps = duration / interval;
    const incrementAmount = 100 / steps;

    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + incrementAmount;
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, interval);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (isReady && progress < 100) {
      const timer = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + 3;
          if (newProgress >= 100) {
            clearInterval(timer);
            setTimeout(() => setShowContent(true), 300);
            return 100;
          }
          return newProgress;
        });
      }, 50); // Faster interval
      return () => clearInterval(timer);
    } else if (progress >= 100) {
      setTimeout(() => setShowContent(true), 300);
    }
  }, [isReady, progress]);

  if (showContent) {
    return null; 
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 flex items-center justify-center">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center space-y-12">
          {/* Animated travel icons */}
          <div className="relative mb-12">
            <div className="flex justify-center items-center space-x-8 mb-8">
              {travelIcons.map(({ icon: Icon, delay }, index) => (
                <div
                  key={index}
                  className="relative"
                  style={{
                    animation: `bounce 2s infinite ${delay}s ease-in-out`,
                  }}
                >
                  <Icon
                    size={32}
                    className={`${index % 2 === 0 ? 'text-blue-600 hover:text-blue-700' : 'text-teal-600 hover:text-teal-700'} drop-shadow-lg transition-colors`}
                  />
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-4xl font-bold text-gray-900 tracking-tight">
              Creating Your Perfect
              <span className="block bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                Travel Experience
              </span>
            </h2>
          </div>

          {/* Progress bar */}
          <div className="w-full max-w-md mx-auto">
            <div className="w-full bg-white/50 rounded-full h-3 shadow-inner backdrop-blur-sm">
              <div
                className="bg-gradient-to-r from-blue-500 to-teal-500 h-3 rounded-full transition-all duration-300 ease-out shadow-lg"
                style={{ width: `${progress}%` }}
              >
                <div className="h-full w-full bg-gradient-to-r from-white/20 to-transparent rounded-full animate-pulse" />
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-2 font-medium">
              {Math.round(progress)}% Complete
            </p>
          </div>

          <div className="flex justify-center space-x-16 text-gray-600">
            <div className="flex flex-col items-center group cursor-pointer transition-all duration-300 hover:text-blue-600">
              <div className="p-4 rounded-full bg-blue-50 group-hover:bg-blue-100 transition-colors duration-300">
                <MapPin className="animate-pulse" size={32} />
              </div>
              <span className="text-sm font-medium mt-3">Finding destinations</span>
            </div>
            <div className="flex flex-col items-center group cursor-pointer transition-all duration-300 hover:text-blue-600">
              <div className="p-4 rounded-full bg-blue-50 group-hover:bg-blue-100 transition-colors duration-300">
                <Calendar className="animate-pulse" size={32} />
              </div>
              <span className="text-sm font-medium mt-3">Planning activities</span>
            </div>
            <div className="flex flex-col items-center group cursor-pointer transition-all duration-300 hover:text-blue-600">
              <div className="p-4 rounded-full bg-blue-50 group-hover:bg-blue-100 transition-colors duration-300">
                <SquareChartGantt className="animate-pulse" size={32} />
              </div>
              <span className="text-sm font-medium mt-3">Optimizing schedule</span>
            </div>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-20 right-20 w-64 h-64 bg-blue-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-teal-200/30 rounded-full blur-3xl"></div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {
              transform: translateY(0);
            }
            40% {
              transform: translateY(-10px);
            }
            60% {
              transform: translateY(-5px);
            }
          }
        `,
        }}
      />
    </div>
  );
};

export default LoadingScreen;