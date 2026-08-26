import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { RailwayRole, RoleDefinition } from '../../types/railway';
import { ALL_ROLES_CONFIG } from '../../config/rolesConfig';
import { Shield, Search, X, Check, ArrowRight } from 'lucide-react';

interface RoleSwitcherProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RoleSwitcher: React.FC<RoleSwitcherProps> = ({ isOpen, onClose }) => {
  const { currentUser, switchRole } = useAuth();
  const [search, setSearch] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  if (!isOpen) return null;

  const categories = ['ALL', 'Administration', 'Operations', 'Running Crew', 'Ticketing & Security', 'Engineering & Maintenance', 'Emergency & HR', 'Public'];

  const filteredRoles = ALL_ROLES_CONFIG.filter(role => {
    if (selectedCategory !== 'ALL' && role.category !== selectedCategory) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        role.title.toLowerCase().includes(q) ||
        role.description.toLowerCase().includes(q) ||
        role.id.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleSelectRole = (roleId: RailwayRole) => {
    switchRole(roleId);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-4xl max-h-[85vh] bg-[#0A0A0A] border border-neutral-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="p-5 border-b border-neutral-800 flex items-center justify-between bg-black">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-neutral-900 border border-neutral-700 flex items-center justify-center text-white">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white font-display uppercase tracking-wider">
                Multi-Role Operations Switcher (23 Roles)
              </h2>
              <p className="text-xs text-neutral-400 font-mono">
                Select any authorized railway role to inspect its custom command console & permissions.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-900 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div className="p-4 border-b border-neutral-800/80 bg-neutral-950/40 flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search by role title, category or jurisdiction..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white font-mono"
            />
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition ${
                  selectedCategory === cat
                    ? 'bg-white text-black font-bold shadow-sm'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Role Cards Grid */}
        <div className="p-5 overflow-y-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 flex-1">
          {filteredRoles.map(role => {
            const isCurrent = currentUser.role === role.id;
            return (
              <div
                key={role.id}
                onClick={() => handleSelectRole(role.id)}
                className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                  isCurrent
                    ? 'bg-neutral-900 border-white text-white'
                    : 'bg-neutral-950/60 hover:bg-neutral-900/80 border-neutral-800/90 text-neutral-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-900 text-neutral-300 border border-neutral-800">
                      {role.category}
                    </span>
                    <span className="text-[10px] font-mono text-neutral-500">
                      Level: {role.jurisdictionLevel}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white font-display mb-1 flex items-center gap-2">
                    {role.title}
                    {isCurrent && <Check className="w-4 h-4 text-white" />}
                  </h3>

                  <p className="text-xs text-neutral-400 line-clamp-2 mb-3">
                    {role.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-neutral-800/80 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-neutral-500">{role.permissions.length} Permissions</span>
                  <span className="text-white flex items-center gap-1 font-semibold">
                    {isCurrent ? 'ACTIVE' : 'SWITCH'} <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-neutral-800 bg-black flex items-center justify-between text-xs font-mono text-neutral-400">
          <div>Operating as: <strong className="text-white">{currentUser.name}</strong> ({currentUser.role})</div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-800"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
