import { useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto">
      <div 
        className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent cursor-pointer flex items-center gap-2"
        onClick={() => navigate('/')}
      >
        <Sparkles className="w-6 h-6 text-blue-600" />
        Voythrix
      </div>
    </nav>
  );
};

export default Navbar; 