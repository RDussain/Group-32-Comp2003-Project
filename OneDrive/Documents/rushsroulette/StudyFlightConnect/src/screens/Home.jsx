import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Plane, Book, HelpCircle } from 'lucide-react';
import useSessionStore from '../store/sessionStore';
import usePassportStore from '../store/passportStore';
import DestinationCard from '../components/DestinationCard';
import TravelInspo from '../components/TravelInspo';
import { getAllOrigins, getDestinationsForOriginAndDuration } from '../utils/flightSimulation';

const DURATIONS = [
  { label: '30m', value: 30 },
  { label: '1h', value: 60 },
  { label: '2h', value: 120 },
  { label: '3h', value: 180 },
  { label: '4h', value: 240 },
  { label: '6h', value: 360 },
  { label: '8h', value: 480 },
];

export default function Home() {
  const navigate = useNavigate();
  const { origin, destination, durationMinutes, setOrigin, setDestination, setDuration } = useSessionStore();
  const { userName } = usePassportStore();
  const [destinations, setDestinations] = useState([]);
  const [durationAvailability, setDurationAvailability] = useState({});
  const origins = getAllOrigins();

  useEffect(() => {
    if (!userName) {
      navigate('/welcome');
    }
  }, [userName, navigate]);

  useEffect(() => {
    if (!origin) {
      const lhr = origins.find((o) => o.iata === 'LHR');
      if (lhr) setOrigin(lhr);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Calculate which duration pills have destinations available
  useEffect(() => {
    if (origin) {
      const availability = {};
      DURATIONS.forEach(({ label, value }) => {
        const dests = getDestinationsForOriginAndDuration(origin.iata, value);
        availability[label] = dests.length > 0;
      });
      setDurationAvailability(availability);

      // If the currently selected duration is now unavailable, clear it
      if (durationMinutes) {
        const currentLabel = DURATIONS.find((d) => d.value === durationMinutes)?.label;
        if (currentLabel && !availability[currentLabel]) {
          setDuration(null);
        }
      }
    } else {
      setDurationAvailability({});
    }
  }, [origin?.iata]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (origin && durationMinutes) {
      const dests = getDestinationsForOriginAndDuration(origin.iata, durationMinutes);
      const destsWithTime = dests.map((d) => ({
        ...d,
        _flightTime: d.flightTimes[origin.iata],
      }));
      setDestinations(destsWithTime);
      if (destination && !destsWithTime.find((d) => d.iata === destination.iata)) {
        setDestination(null);
      }
    } else {
      setDestinations([]);
    }
  }, [origin?.iata, durationMinutes]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleOriginChange = (e) => {
    const selected = origins.find((o) => o.iata === e.target.value);
    setOrigin(selected || null);
    setDestination(null);
  };

  const canDepart = origin && destination && durationMinutes;

  const handleDepart = () => {
    if (!canDepart) return;
    navigate('/boarding');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: 60 }}
      className="min-h-screen bg-[#FAFAF9] flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-5 pb-3 max-w-3xl mx-auto w-full">
        <div className="w-9 h-9 rounded-xl bg-[#E85D3A] flex items-center justify-center flex-shrink-0 shadow-sm">
          <Plane size={14} className="text-white rotate-45" />
        </div>
        <div
          className="tracking-[0.15em] text-[#1B1B1B] text-xs font-semibold"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          StudyFlightConnect
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/tutorial')}
            title="How it works"
            className="w-9 h-9 rounded-xl bg-white border border-[#E8E8E8] flex items-center justify-center flex-shrink-0 hover:border-[#E85D3A] transition-colors shadow-sm"
          >
            <HelpCircle size={14} className="text-[#6B7280]" />
          </button>
          <button
            onClick={() => navigate('/passport')}
            className="w-9 h-9 rounded-xl bg-white border border-[#E8E8E8] flex items-center justify-center flex-shrink-0 hover:border-[#E85D3A] transition-colors shadow-sm"
          >
            <Book size={14} className="text-[#6B7280]" />
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col px-4 pb-6 max-w-3xl mx-auto w-full">
        {/* Hero text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-8 mt-4"
        >
          <h1
            className="text-[#1B1B1B] leading-tight mb-2"
            style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(26px, 5vw, 46px)', fontWeight: 700 }}
          >
            Every minute you study,<br />you're flying.
          </h1>
          <p
            className="text-[#8B8B8B]"
            style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(13px, 1.8vw, 16px)', fontWeight: 400 }}
          >
            Set your session. Choose your destination. Start flying.
          </p>
          <button
            onClick={() => navigate('/tutorial')}
            className="mt-4 mx-auto inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white border border-[#E8E8E8] hover:border-[#E85D3A] shadow-sm hover:shadow-md transition-all group"
            style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(12px, 1.5vw, 14px)', fontWeight: 500 }}
          >
            <div className="w-6 h-6 rounded-full bg-[#E85D3A]/10 flex items-center justify-center group-hover:bg-[#E85D3A]/20 transition-colors">
              <HelpCircle size={13} className="text-[#E85D3A]" />
            </div>
            <span className="text-[#6B7280] group-hover:text-[#1B1B1B] transition-colors">
              See how every feature works in one page
            </span>
          </button>
        </motion.div>

        {/* Origin selector */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-5"
        >
          <div
            className="text-[#8B8B8B] uppercase tracking-widest mb-2 font-medium"
            style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px' }}
          >
            Departing from
          </div>
          <div className="relative">
            <select
              value={origin?.iata || ''}
              onChange={handleOriginChange}
              className="w-full appearance-none bg-white border border-[#E8E8E8] rounded-2xl px-4 py-3.5 text-[#1B1B1B] pr-10 cursor-pointer focus:outline-none focus:border-[#E85D3A] focus:ring-2 focus:ring-[#E85D3A]/10 transition-all shadow-sm"
              style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(13px, 1.6vw, 15px)', fontWeight: 500 }}
            >
              <option value="" disabled>Select your city...</option>
              {origins.map((o) => (
                <option key={o.iata} value={o.iata}>
                  {o.name} ({o.iata})
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#B0B0B0] pointer-events-none"
            />
          </div>
        </motion.div>

        {/* Duration pills */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <div
            className="text-[#8B8B8B] uppercase tracking-widest mb-2 font-medium"
            style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px' }}
          >
            Session duration
          </div>
          <div className="flex flex-wrap gap-2">
            {DURATIONS.map(({ label, value }) => {
              const isAvailable = durationAvailability[label] !== false;
              const isSelected = durationMinutes === value;

              return (
                <button
                  key={value}
                  onClick={() => isAvailable && setDuration(value)}
                  disabled={!isAvailable}
                  className={`px-4 py-2.5 rounded-full border transition-all duration-200 font-medium ${
                    !isAvailable
                      ? 'bg-[#F0F0EE] border-[#E8E8E8] cursor-not-allowed'
                      : isSelected
                        ? 'bg-[#E85D3A] border-[#E85D3A] text-white shadow-md shadow-[#E85D3A]/15'
                        : 'bg-white border-[#E8E8E8] text-[#6B7280] hover:border-[#E85D3A]/40 hover:text-[#1B1B1B] shadow-sm'
                  }`}
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 'clamp(12px, 1.5vw, 14px)',
                    opacity: isAvailable ? 1 : 0.3,
                    pointerEvents: isAvailable ? 'auto' : 'none',
                    textDecoration: isAvailable ? 'none' : 'line-through',
                    color: !isAvailable ? '#8B8B8B' : undefined,
                  }}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Destination cards */}
        <AnimatePresence>
          {destinations.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mb-6"
            >
              <div
                className="text-[#8B8B8B] uppercase tracking-widest mb-3 font-medium"
                style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px' }}
              >
                Where to?
              </div>
              <div className="flex flex-col gap-2">
                {destinations.map((dest, i) => (
                  <DestinationCard
                    key={dest.iata}
                    destination={dest}
                    isSelected={destination?.iata === dest.iata}
                    onSelect={setDestination}
                    index={i}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Spacer */}
        <div className="flex-1" />

        {/* CTA */}
        <motion.button
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          onClick={handleDepart}
          disabled={!canDepart}
          className={`w-full py-4 rounded-2xl font-semibold tracking-wide transition-all duration-200 ${
            canDepart
              ? 'bg-[#E85D3A] text-white hover:bg-[#D14E2E] active:scale-95 shadow-lg shadow-[#E85D3A]/20'
              : 'bg-[#F0F0EE] text-[#B0B0B0] cursor-not-allowed'
          }`}
          style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(14px, 1.6vw, 16px)' }}
        >
          <span className="flex items-center justify-center gap-2">
            <Plane size={16} className={canDepart ? 'text-white rotate-45' : 'text-[#B0B0B0] rotate-45'} />
            Prepare for Departure
          </span>
        </motion.button>

        {/* Travel inspiration */}
        <div className="mt-8">
          <div
            className="text-[#B0B0B0] uppercase tracking-widest mb-3 text-center font-medium"
            style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px' }}
          >
            Where will you go?
          </div>
          <TravelInspo />
        </div>
      </div>
    </motion.div>
  );
}
