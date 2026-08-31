import React, { useState, useEffect } from 'react';
import { useRailway } from '../../context/RailwayContext';
import {
  Star,
  Train,
  Clock,
  ArrowRight,
  Trash2,
  Navigation,
  ExternalLink,
  ChevronRight,
  Plus,
  Radio,
  MapPin
} from 'lucide-react';
import { findRealTrain } from '../../services/railwayApi/realIndianRailwaysDataset';
import { nationalTrainDatabaseService } from '../../services/railwayApi/nationalTrainDatabaseService';
import { IrctcBookingService } from '../../services/booking/irctcBookingService';

interface SavedTrainsViewProps {
  onInspectDetails: (trainNumber: string) => void;
  onTrackOnMap?: (trainNumber: string) => void;
  onExploreFleet?: () => void;
}

export const SavedTrainsView: React.FC<SavedTrainsViewProps> = ({
  onInspectDetails,
  onTrackOnMap,
  onExploreFleet
}) => {
  const { trainPositions } = useRailway();
  const [savedNumbers, setSavedNumbers] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('smart_railway_saved_trains');
      return stored ? JSON.parse(stored) : ['20607', '12635', '12673', '22436'];
    } catch {
      return ['20607', '12635', '12673', '22436'];
    }
  });

  const removeTrain = (trainNum: string) => {
    const updated = savedNumbers.filter(n => n !== trainNum);
    setSavedNumbers(updated);
    try {
      localStorage.setItem('smart_railway_saved_trains', JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }
  };

  const savedList = savedNumbers.map(num => {
    const details = findRealTrain(num) || nationalTrainDatabaseService.getFullTrainDetails(num);
    const pos = trainPositions.find(p => p.trainNumber === num);
    return { num, details, pos };
  });

  return (
    <div className="space-y-6 pb-20 md:pb-6 font-mono text-white">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-[#080808] border border-neutral-800 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-700 text-neutral-300 text-xs mb-2">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>SAVED TRAIN COMMUTES & FAVORITES</span>
          </div>
          <h1 className="text-2xl font-black text-white uppercase">
            My Saved Trains ({savedNumbers.length})
          </h1>
          <p className="text-xs text-neutral-400 mt-1 font-sans">
            Pin and follow daily commutes, live running delays, and platform halts with one tap.
          </p>
        </div>

        {onExploreFleet && (
          <button
            onClick={onExploreFleet}
            className="px-4 py-2.5 rounded-xl bg-white hover:bg-neutral-200 text-black font-bold text-xs uppercase flex items-center gap-2 transition cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add More Trains</span>
          </button>
        )}
      </div>

      {/* Grid of Saved Trains */}
      {savedList.length === 0 ? (
        <div className="p-12 rounded-2xl bg-black border border-neutral-800 text-center space-y-3">
          <Star className="w-10 h-10 text-neutral-600 mx-auto" />
          <h3 className="text-base font-bold text-neutral-300">No Saved Trains Yet</h3>
          <p className="text-xs text-neutral-500 font-sans max-w-sm mx-auto">
            Search from over 13,198+ Indian Railways trains and save your favorite services for quick tracking.
          </p>
          {onExploreFleet && (
            <button
              onClick={onExploreFleet}
              className="mt-2 px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-white text-xs font-bold transition"
            >
              Explore National Train Fleet
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {savedList.map(({ num, details, pos }) => {
            const delay = pos?.delayMinutes ?? 0;
            const isDelayed = delay > 5;
            const isGps = pos?.telemetryType === 'EXACT_GPS';

            return (
              <div
                key={num}
                onClick={() => onInspectDetails(num)}
                className="p-5 rounded-2xl bg-[#090909] border border-neutral-800 hover:border-neutral-700 transition cursor-pointer flex flex-col justify-between space-y-4 group shadow-xl"
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between gap-2 pb-3 border-b border-neutral-900">
                    <div className="flex items-center gap-2.5">
                      <span className="text-xl font-black text-white">{num}</span>
                      <span className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-[10px] text-neutral-300 font-bold">
                        {details?.trainType?.replace('_', ' ') || 'EXPRESS'}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                        isDelayed
                          ? 'bg-amber-950/40 border-amber-800/60 text-amber-300'
                          : 'bg-emerald-950/40 border-emerald-800/60 text-emerald-300'
                      }`}>
                        {delay > 0 ? `+${delay}m DELAY` : 'RIGHT TIME'}
                      </span>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeTrain(num);
                        }}
                        className="p-1.5 rounded-lg text-neutral-500 hover:text-rose-400 hover:bg-neutral-900 transition"
                        title="Remove from saved"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Train Name & Route */}
                  <div className="pt-3">
                    <h3 className="text-sm font-bold text-neutral-200 font-sans group-hover:text-white transition">
                      {details?.trainName || pos?.trainName || `Train ${num}`}
                    </h3>
                    <div className="text-xs text-neutral-400 mt-1 flex items-center gap-2">
                      <span>{details?.originStationCode || 'SRC'}</span>
                      <ArrowRight className="w-3 h-3 text-neutral-600" />
                      <span>{details?.destinationStationCode || 'DST'}</span>
                      <span className="text-neutral-600">•</span>
                      <span>Zone: <strong className="text-neutral-300">{details?.zone || 'SR'}</strong></span>
                    </div>
                  </div>

                  {/* Live Status Summary Card */}
                  <div className="p-3 rounded-xl bg-black border border-neutral-800/80 text-xs mt-3 space-y-1">
                    <div className="text-[10px] text-neutral-500 uppercase flex items-center gap-1 font-bold">
                      <MapPin className="w-3 h-3 text-neutral-400" />
                      <span>CURRENT RUNNING FIX</span>
                    </div>
                    <div className="text-neutral-200 font-bold truncate">
                      {pos?.locationMessage || pos?.lastReportedStationName || 'In Transit on Mainline'}
                    </div>
                    <div className="text-[10px] text-neutral-400 pt-1 border-t border-neutral-900 flex items-center justify-between">
                      <span>SPEED: <strong className="text-white">{pos?.speedKmph || 0} KM/H</strong></span>
                      <span>NEXT: <strong className="text-white">{pos?.nextStationName || 'Next Stop'}</strong></span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-2 border-t border-neutral-900 flex items-center justify-between text-xs">
                  <span className="text-neutral-400 group-hover:text-white flex items-center gap-1">
                    <span>Inspect Live Tracking</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        IrctcBookingService.openOfficialBooking({
                          trainNumber: num,
                          trainName: details?.trainName,
                          sourceStationCode: details?.originStationCode,
                          destinationStationCode: details?.destinationStationCode
                        });
                      }}
                      className="px-2.5 py-1 rounded bg-emerald-950/40 hover:bg-emerald-500 hover:text-black border border-emerald-800/60 text-emerald-300 text-[10px] font-bold uppercase transition"
                    >
                      Book Ticket
                    </button>

                    {onTrackOnMap && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onTrackOnMap(num);
                        }}
                        className="px-2.5 py-1 rounded bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-300 text-[10px] font-bold transition"
                      >
                        Track Map
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
