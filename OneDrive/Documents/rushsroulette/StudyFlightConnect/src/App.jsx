import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { HelpCircle } from 'lucide-react';
import NameEntry from './screens/NameEntry';
import Home from './screens/Home';
import Boarding from './screens/Boarding';
import FlightMode from './screens/FlightMode';
import Landing from './screens/Landing';
import Passport from './screens/Passport';
import Tutorial from './screens/Tutorial';

const HIDDEN_HELP = ['/flight', '/tutorial', '/welcome'];

function FloatingHelp() {
  const location = useLocation();
  const navigate = useNavigate();
  if (HIDDEN_HELP.includes(location.pathname)) return null;
  return (
    <button
      onClick={() => navigate('/tutorial')}
      title="How it works"
      className="fixed bottom-5 right-5 z-50 w-10 h-10 rounded-full bg-white border border-[#E8E8E8] shadow-lg flex items-center justify-center hover:border-[#E85D3A] transition-all group"
    >
      <HelpCircle size={18} className="text-[#B0B0B0] group-hover:text-[#E85D3A] transition-colors" />
    </button>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/welcome" element={<NameEntry />} />
          <Route path="/" element={<Home />} />
          <Route path="/boarding" element={<Boarding />} />
          <Route path="/flight" element={<FlightMode />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/passport" element={<Passport />} />
          <Route path="/tutorial" element={<Tutorial />} />
        </Routes>
      </AnimatePresence>
      <FloatingHelp />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}
