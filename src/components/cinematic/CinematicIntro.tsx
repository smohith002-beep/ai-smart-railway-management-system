import React, { useState, useEffect } from 'react';
import { RailwayLogo } from '../common/RailwayLogo';
import { soundService } from '../../services/sound/soundService';
import { Volume2, VolumeX, FastForward, Shield, Radio, Sparkles } from 'lucide-react';

interface CinematicIntroProps {
  onComplete: () => void;
}

export const CinematicIntro: React.FC<CinematicIntroProps> = ({ onComplete }) => {
  const [shot, setShot] = useState<number>(1); // 1 to 6
  const [isAudioEnabled, setIsAudioEnabled] = useState<boolean>(!soundService.isMuted);

  useEffect(() => {
    // Check user preference for reduced motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      const timer = setTimeout(() => {
        onComplete();
      }, 1000);
      return () => clearTimeout(timer);
    }

    // Realistic Documentary Cinematic Sequence Timing
    const t1 = setTimeout(() => {
      setShot(2); // Shot 2: Distant Approaching Express
      soundService.playHorn();
    }, 2800);

    const t2 = setTimeout(() => {
      setShot(3); // Shot 3: Close-up Locomotive Nose & Pantograph
    }, 5600);

    const t3 = setTimeout(() => {
      setShot(4); // Shot 4: High-speed Passage & Motion Blur
    }, 8400);

    const t4 = setTimeout(() => {
      setShot(5); // Shot 5: Network Intelligence Transition
    }, 11200);

    const t5 = setTimeout(() => {
      setShot(6); // Shot 6: New White Logo & Title
      soundService.playChime();
    }, 14000);

    const t6 = setTimeout(() => {
      onComplete(); // Transition into Main Dashboard
    }, 18000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
    };
  }, [onComplete]);

  const handleToggleAudio = () => {
    const muted = soundService.toggleMute();
    setIsAudioEnabled(!muted);
  };

  return (
    <div
      className={`fixed inset-0 z-50 bg-[#000000] text-white flex flex-col justify-between p-6 transition-opacity duration-1000 select-none overflow-hidden ${
        shot === 6 ? 'opacity-100' : 'opacity-100'
      }`}
    >
      {/* Background Photographic Shots with Documentary Transitions */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Shot 1: Low track angle */}
        <div
          className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ${
            shot === 1
              ? 'opacity-80 scale-100 blur-0'
              : 'opacity-0 scale-105 blur-sm'
          }`}
          style={{
            backgroundImage: `url('/assets/images/railway_track.jpg')`,
            filter: 'contrast(1.15) brightness(0.7)'
          }}
        />

        {/* Shot 2: Approaching Vande Bharat / WAP-7 express */}
        <div
          className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ${
            shot === 2 || shot === 5
              ? 'opacity-85 scale-100'
              : 'opacity-0 scale-105'
          }`}
          style={{
            backgroundImage: `url('/assets/images/train_cinematic.jpg')`,
            filter: 'contrast(1.15) brightness(0.75)'
          }}
        />

        {/* Shot 3 & 4: Locomotive close-up with electric catenary sparks & motion blur */}
        <div
          className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ${
            shot === 3 || shot === 4
              ? 'opacity-85 scale-100'
              : 'opacity-0 scale-105'
          }`}
          style={{
            backgroundImage: `url('/assets/images/locomotive_motion.jpg')`,
            filter: 'contrast(1.2) brightness(0.75)'
          }}
        />

        {/* Cinematic Vignette & Atmospheric Film Grain Overlay */}
        <div className="absolute inset-0 bg-radial-vignette opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/80" />
      </div>

      {/* Top Controls: Documentary Tag + Skip + Audio */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-black/80 border border-neutral-800 text-[11px] font-mono text-neutral-400">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span className="tracking-widest uppercase">CINEMATIC INTRO • VISUAL SEQUENCE ONLY</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleToggleAudio}
            className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-black/80 border border-neutral-800 hover:border-neutral-600 text-neutral-300 text-xs font-mono transition"
            aria-label="Toggle Audio"
          >
            {isAudioEnabled ? <Volume2 className="w-3.5 h-3.5 text-white" /> : <VolumeX className="w-3.5 h-3.5 text-neutral-500" />}
            <span className="hidden sm:inline">{isAudioEnabled ? 'AUDIO ON' : 'AUDIO OFF'}</span>
          </button>

          <button
            onClick={onComplete}
            className="flex items-center gap-2 px-4 py-1.5 rounded-md bg-white hover:bg-neutral-200 text-black text-xs font-mono font-bold tracking-wider uppercase transition shadow-sm"
            aria-label="Skip Intro"
          >
            <span>SKIP INTRO</span>
            <FastForward className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Center Cinematic Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center px-4 flex flex-col items-center">
        {shot === 1 && (
          <div className="space-y-3 animate-fade-in font-mono text-xs text-neutral-400">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mx-auto status-dot-live" />
            <div className="tracking-widest uppercase text-white font-semibold">
              SECTION LINE CLEAR // AUTOMATIC BLOCK SIGNAL LOCKED
            </div>
            <p className="text-[11px] text-neutral-500 font-sans">
              Northern Railway Quadruple Line Corridor • 25kV 50Hz AC Catenary
            </p>
          </div>
        )}

        {shot === 2 && (
          <div className="space-y-3 animate-fade-in font-mono text-xs text-neutral-300">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-black/80 border border-neutral-800 text-[11px]">
              <Radio className="w-3 h-3 text-white animate-pulse" />
              <span>APPROACHING EXPRESS // CRIS GPS TELEMETRY: 130 KM/H</span>
            </div>
          </div>
        )}

        {shot === 3 && (
          <div className="space-y-3 animate-fade-in font-mono text-xs text-neutral-300">
            <div className="text-white font-bold tracking-widest uppercase text-sm">
              LOCOMOTIVE PROPULSION & 25kV TRACTION ENGAGED
            </div>
            <div className="text-[11px] text-neutral-400">
              WAP-7 / TRAIN-18 SELF-PROPELLED ELECTRIC MULTIPLE UNIT
            </div>
          </div>
        )}

        {shot === 4 && (
          <div className="space-y-3 animate-fade-in font-mono text-xs text-neutral-300">
            <div className="text-white font-bold tracking-widest uppercase text-sm">
              HIGH-SPEED PASSAGE // RIGHT TIME (0m DELAY)
            </div>
            <div className="text-[11px] text-neutral-400">
              16 COACHES • AIR BRAKE CONTINUITY VERIFIED (BP 5.0 kg/cm²)
            </div>
          </div>
        )}

        {shot === 5 && (
          <div className="space-y-3 animate-fade-in font-mono text-xs text-neutral-300">
            <div className="text-white font-bold tracking-widest uppercase text-sm">
              SYNCHRONIZING TELEMETRY INTO RAILWAY INTELLIGENCE
            </div>
            <div className="text-[11px] text-neutral-400">
              CONNECTING 17 ZONAL HEADQUARTERS & 7,325 STATIONS
            </div>
          </div>
        )}

        {shot >= 6 && (
          <div className="flex flex-col items-center animate-fade-in space-y-5">
            {/* New Bespoke AI + Railway Minimalist Logo */}
            <RailwayLogo variant="login" />

            <div className="space-y-2">
              <h1 className="text-3xl md:text-5xl font-black font-display tracking-tight text-white uppercase">
                AI SMART RAILWAY <br />
                <span className="text-neutral-400 font-light">MANAGEMENT SYSTEM</span>
              </h1>

              <p className="text-xs md:text-sm font-mono text-neutral-300 tracking-widest uppercase">
                "Real-Time Railway Intelligence. Smarter Operations. Safer Journeys."
              </p>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-3 text-[11px] font-mono text-neutral-400">
              <span>DEVELOPER: <strong className="text-white">MOHITH S</strong></span>
              <span>•</span>
              <span>smohith002@gmail.com</span>
              <span>•</span>
              <span className="text-white font-semibold">23 OPERATIONAL ROLES</span>
            </div>

            <button
              onClick={onComplete}
              className="mt-4 px-8 py-3 rounded-xl bg-white hover:bg-neutral-200 text-black text-xs font-mono font-bold tracking-widest uppercase transition shadow-lg"
            >
              ENTER COMMAND CENTER &rarr;
            </button>
          </div>
        )}
      </div>

      {/* Bottom Status Bar */}
      <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-neutral-500 border-t border-neutral-900 pt-3">
        <span>SECURITY: APEX ENTERPRISE</span>
        <span>AUTHORITATIVE TELEMETRY PIPELINE ACTIVE</span>
        <span>SYS: 2026.8</span>
      </div>
    </div>
  );
};
