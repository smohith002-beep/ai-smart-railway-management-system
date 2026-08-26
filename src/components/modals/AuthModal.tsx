import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { RailwayRole } from '../../types/railway';
import { ALL_ROLES_CONFIG } from '../../config/rolesConfig';
import { RailwayLogo } from '../common/RailwayLogo';
import { Shield, Lock, Mail, User, X, Check, ArrowRight } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { currentUser, login } = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState<string>('smohith002@gmail.com');
  const [password, setPassword] = useState<string>('••••••••••••');
  const [selectedRole, setSelectedRole] = useState<RailwayRole>('super_admin');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, selectedRole);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-md bg-[#0A0A0A] border border-neutral-800 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6 overflow-hidden">
        {/* Background Subtle Photographic Grain */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center pointer-events-none opacity-20 filter contrast-125 brightness-75"
          style={{ backgroundImage: `url('/assets/images/train_cinematic.jpg')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/60 z-0 pointer-events-none" />

        {/* Modal Header */}
        <div className="relative z-10 flex items-center justify-between border-b border-neutral-800 pb-4">
          <div className="flex items-center gap-3">
            <RailwayLogo variant="compact" />
          </div>

          <button onClick={onClose} className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-900 transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="relative z-10 space-y-4 font-mono text-xs">
          <div>
            <label className="text-neutral-400 block mb-1">Official Railway Email:</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="name@railnet.gov.in"
                className="w-full pl-9 pr-3 py-2.5 bg-black border border-neutral-700 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-white"
              />
            </div>
          </div>

          <div>
            <label className="text-neutral-400 block mb-1">Secure Password:</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-9 pr-3 py-2.5 bg-black border border-neutral-700 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-white"
              />
            </div>
          </div>

          <div>
            <label className="text-neutral-400 block mb-1">Assign Operational Role (23 Roles):</label>
            <select
              value={selectedRole}
              onChange={e => setSelectedRole(e.target.value as RailwayRole)}
              className="w-full bg-black border border-neutral-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-white"
            >
              {ALL_ROLES_CONFIG.map(r => (
                <option key={r.id} value={r.id}>
                  {r.title} ({r.category})
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-white hover:bg-neutral-200 text-black font-mono font-bold tracking-wider uppercase transition flex items-center justify-center gap-2 mt-4 shadow-lg"
          >
            <span>{mode === 'login' ? 'Authenticate Session' : 'Create Profile'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="relative z-10 pt-3 border-t border-neutral-800 text-center text-xs font-mono text-neutral-500">
          <span>Active Profile: <strong className="text-white">{currentUser.name}</strong> ({currentUser.role})</span>
        </div>
      </div>
    </div>
  );
};
