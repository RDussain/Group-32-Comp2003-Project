import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Globe, Clock, MapPin, Map, Eye, Layers, Volume2,
  CloudRain, Radio, VolumeX, FileText, Lightbulb, Zap, Trophy,
  Star, BookOpen, Flame, TrendingUp, PlusCircle, BarChart2,
  Navigation, Share2, Plane,
} from 'lucide-react';

const SECTIONS = [
  {
    label: 'Getting Started',
    color: '#E85D3A',
    features: [
      { Icon: Globe, name: 'Origin Airport', desc: 'Depart from one of 15 real airports across the globe.' },
      { Icon: Clock, name: 'Session Duration', desc: 'Choose from 30-minute sprints to a full 8-hour marathon.' },
      { Icon: MapPin, name: 'Destination Picker', desc: 'Your session length determines which real routes you can fly.' },
    ],
  },
  {
    label: 'Flight Experience',
    color: '#0EA5E9',
    features: [
      { Icon: Map, name: 'Live Flight Map', desc: 'Watch your aircraft trace a real great-circle arc in real time.' },
      { Icon: Eye, name: 'Cockpit View', desc: 'An immersive first-person perspective that follows your plane closely.' },
      { Icon: Layers, name: 'Tracker View', desc: 'A zoomed-out overhead map showing your full route and progress.' },
      { Icon: Volume2, name: 'Cabin Ambience', desc: 'Steady airplane cabin sounds for a realistic in-flight atmosphere.' },
      { Icon: CloudRain, name: 'Rain Sounds', desc: 'Gentle rainfall audio to help you focus during your session.' },
      { Icon: Radio, name: 'Brown Noise', desc: 'Deep, consistent background noise ideal for deep concentration.' },
      { Icon: VolumeX, name: 'Silent Mode', desc: 'Fly in complete silence — no ambient audio, just focus.' },
      { Icon: FileText, name: 'Boarding Pass', desc: 'A boarding pass is issued at departure and stamped on arrival.' },
    ],
  },
  {
    label: 'In-Flight Events',
    color: '#F59E0B',
    features: [
      { Icon: Lightbulb, name: 'Flight Trivia', desc: 'Aviation and world facts surface mid-flight to keep you curious.' },
      { Icon: Zap, name: 'Turbulence Challenges', desc: 'Focus mini-games test your resolve and reward you with bonus miles.' },
      { Icon: Trophy, name: 'Milestone Alerts', desc: 'Pop-up achievements unlock as you hit key progress checkpoints.' },
      { Icon: Star, name: 'Window Seat', desc: 'Scenic destination imagery appears as a mid-flight visual reward.' },
    ],
  },
  {
    label: 'Progress & Achievements',
    color: '#10B981',
    features: [
      { Icon: BookOpen, name: 'Passport Stamps', desc: 'Every completed flight earns a collectible destination stamp.' },
      { Icon: Flame, name: 'Streak Tracking', desc: 'Study daily to build your streak — one missed day breaks it.' },
      { Icon: TrendingUp, name: 'Rank System', desc: 'Rise from Grounded Cadet to Admiral through consistent flying.' },
      { Icon: PlusCircle, name: 'Bonus Miles', desc: 'Completing in-flight challenges stacks extra miles on your total.' },
    ],
  },
  {
    label: 'After Landing',
    color: '#8B5CF6',
    features: [
      { Icon: BarChart2, name: 'Flight Stats', desc: 'Study time, distance flown, bonus miles, and stamp number at a glance.' },
      { Icon: Navigation, name: 'Travel Tips', desc: 'Curated local advice tailored to wherever you just landed.' },
      { Icon: Share2, name: 'Share Your Flight', desc: 'Export a stylish card to show off your completed journey.' },
    ],
  },
];

export default function Tutorial() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen bg-[#FAFAF9]"
    >
      <div className="max-w-3xl mx-auto px-4 py-6 pb-12">
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-[#8B8B8B] hover:text-[#1B1B1B] transition-colors mb-8"
          style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 500 }}
        >
          <ArrowLeft size={14} />
          Back
        </button>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="mb-10"
        >
          <div className="w-12 h-12 rounded-2xl bg-[#E85D3A] flex items-center justify-center mb-4 shadow-md shadow-[#E85D3A]/20">
            <Plane size={20} className="text-white rotate-45" />
          </div>
          <h1
            className="text-[#1B1B1B] mb-2"
            style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 700 }}
          >
            See How it Works
          </h1>
          <p
            className="text-[#8B8B8B]"
            style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(13px, 1.8vw, 16px)' }}
          >
            Every feature in StudyFlightConnect, explained in one line.
          </p>
        </motion.div>

        {/* Feature sections */}
        <div className="flex flex-col gap-8">
          {SECTIONS.map((section, si) => (
            <motion.div
              key={section.label}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + si * 0.07 }}
            >
              {/* Section label with decorative lines */}
              <div className="flex items-center gap-3 mb-3">
                <div className="h-px flex-1 rounded-full" style={{ background: `${section.color}30` }} />
                <span
                  className="uppercase tracking-widest font-semibold whitespace-nowrap"
                  style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', color: section.color }}
                >
                  {section.label}
                </span>
                <div className="h-px flex-1 rounded-full" style={{ background: `${section.color}30` }} />
              </div>

              {/* Feature rows card */}
              <div className="rounded-2xl bg-white border border-[#E8E8E8] shadow-sm overflow-hidden">
                {section.features.map(({ Icon, name, desc }, fi) => (
                  <div
                    key={name}
                    className={`flex items-start gap-4 px-5 py-4 ${fi < section.features.length - 1 ? 'border-b border-[#F4F4F2]' : ''}`}
                  >
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: `${section.color}14` }}
                    >
                      <Icon size={15} style={{ color: section.color }} />
                    </div>
                    <div>
                      <div
                        className="text-[#1B1B1B] font-semibold mb-0.5"
                        style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(13px, 1.5vw, 14px)' }}
                      >
                        {name}
                      </div>
                      <div
                        className="text-[#8B8B8B] leading-relaxed"
                        style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(12px, 1.4vw, 13px)' }}
                      >
                        {desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="mt-10"
        >
          <button
            onClick={() => navigate('/')}
            className="w-full py-4 rounded-2xl bg-[#E85D3A] text-white hover:bg-[#D14E2E] active:scale-95 transition-all shadow-lg shadow-[#E85D3A]/20 font-semibold flex items-center justify-center gap-2"
            style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(14px, 1.6vw, 16px)' }}
          >
            <Plane size={16} className="rotate-45" />
            Start Flying
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
