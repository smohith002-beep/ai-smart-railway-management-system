import React, { createContext, useContext, useState, useEffect } from 'react';
import { RailwayRole, RoleDefinition, StaffMember } from '../types/railway';
import { ALL_ROLES_CONFIG, ROLE_MAP } from '../config/rolesConfig';
import { MOCK_STAFF_MEMBERS } from '../services/provider/mockAuthorizedProvider';

interface AuthUser {
  id: string;
  name: string;
  email: string;
  employeeId: string;
  role: RailwayRole;
  zone: string;
  division: string;
  stationCode: string;
  department: string;
}

interface AuthContextType {
  currentUser: AuthUser;
  currentRoleDefinition: RoleDefinition;
  allRoles: RoleDefinition[];
  isAuthenticated: boolean;
  switchRole: (newRole: RailwayRole) => void;
  login: (email: string, role: RailwayRole) => void;
  logout: () => void;
  hasPermission: (permission: string) => boolean;
}

const DEFAULT_USER: AuthUser = {
  id: 'usr_super_01',
  name: 'MOHITH S',
  email: 'smohith002@gmail.com',
  employeeId: 'RB-HQ-0001',
  role: 'super_admin',
  zone: 'NR',
  division: 'Delhi HQ',
  stationCode: 'NDLS',
  department: 'Railway Board Administration'
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<AuthUser>(() => {
    const saved = localStorage.getItem('railway_auth_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return DEFAULT_USER;
  });

  useEffect(() => {
    localStorage.setItem('railway_auth_user', JSON.stringify(currentUser));
  }, [currentUser]);

  const switchRole = (newRole: RailwayRole) => {
    const roleDef = ROLE_MAP[newRole];
    if (!roleDef) return;

    // Find staff member matching role or create realistic mock profile
    const existingStaff = MOCK_STAFF_MEMBERS.find(s => s.role === newRole);
    if (existingStaff) {
      setCurrentUser({
        id: existingStaff.id,
        name: existingStaff.name,
        email: existingStaff.email,
        employeeId: existingStaff.employeeId,
        role: newRole,
        zone: existingStaff.zone,
        division: existingStaff.division,
        stationCode: existingStaff.stationCode,
        department: existingStaff.department
      });
    } else {
      setCurrentUser({
        id: `usr_${newRole}_${Date.now()}`,
        name: `${roleDef.title} Officer`,
        email: `${newRole}@railnet.gov.in`,
        employeeId: `EMP-${newRole.toUpperCase().slice(0, 4)}-${Math.floor(1000 + Math.random() * 9000)}`,
        role: newRole,
        zone: 'NR',
        division: 'Delhi',
        stationCode: 'NDLS',
        department: roleDef.category
      });
    }
  };

  const login = (email: string, role: RailwayRole) => {
    switchRole(role);
  };

  const logout = () => {
    switchRole('passenger');
  };

  const hasPermission = (permission: string): boolean => {
    if (currentUser.role === 'super_admin') return true;
    const roleDef = ROLE_MAP[currentUser.role];
    if (!roleDef) return false;
    return roleDef.permissions.includes('all') || roleDef.permissions.includes(permission);
  };

  const currentRoleDefinition = ROLE_MAP[currentUser.role] || ROLE_MAP['passenger'];

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        currentRoleDefinition,
        allRoles: ALL_ROLES_CONFIG,
        isAuthenticated: true,
        switchRole,
        login,
        logout,
        hasPermission
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
