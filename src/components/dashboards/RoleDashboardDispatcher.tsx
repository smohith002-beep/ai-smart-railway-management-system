import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { SuperAdminDashboard } from './SuperAdminDashboard';
import { StationMasterDashboard } from './StationMasterDashboard';
import { TrainControllerDashboard } from './TrainControllerDashboard';
import { LocoPilotDashboard } from './LocoPilotDashboard';
import { ALPDashboard } from './ALPDashboard';
import { TrainManagerGuardDashboard } from './TrainManagerGuardDashboard';
import { TTEDashboard } from './TTEDashboard';
import { RPFSecurityDashboard } from './RPFSecurityDashboard';
import {
  MaintenanceDashboards,
  EmergencyMedicalDashboard,
  HRStaffAdminDashboard
} from './MaintenanceDashboards';
import { PassengerDashboard } from './PassengerDashboard';

interface RoleDashboardDispatcherProps {
  onSelectView: (view: string) => void;
  onSelectTrain: (trainNumber: string) => void;
  onInspectDetails: (trainNumber: string) => void;
}

export const RoleDashboardDispatcher: React.FC<RoleDashboardDispatcherProps> = ({
  onSelectView,
  onSelectTrain,
  onInspectDetails
}) => {
  const { currentUser } = useAuth();
  const role = currentUser.role;

  switch (role) {
    case 'super_admin':
    case 'railway_admin':
    case 'zonal_admin':
    case 'divisional_manager':
      return <SuperAdminDashboard onSelectView={onSelectView} onSelectTrain={onSelectTrain} />;

    case 'station_master':
    case 'assistant_station_master':
      return <StationMasterDashboard onSelectTrain={onSelectTrain} />;

    case 'train_controller':
    case 'control_room_operator':
      return <TrainControllerDashboard onSelectTrain={onSelectTrain} />;

    case 'loco_pilot':
      return <LocoPilotDashboard onSelectTrain={onSelectTrain} />;

    case 'assistant_loco_pilot':
      return <ALPDashboard onSelectTrain={onSelectTrain} />;

    case 'train_manager_guard':
      return <TrainManagerGuardDashboard onSelectTrain={onSelectTrain} />;

    case 'tte':
    case 'te':
      return <TTEDashboard onSelectTrain={onSelectTrain} />;

    case 'rpf_security':
      return <RPFSecurityDashboard />;

    case 'maintenance_staff':
    case 'electrical_staff':
    case 'signal_telecom_staff':
    case 'track_maintenance_staff':
    case 'coach_maintenance_staff':
    case 'authorized_contractor':
      return <MaintenanceDashboards roleType={role} />;

    case 'medical_emergency_staff':
      return <EmergencyMedicalDashboard />;

    case 'hr_staff_admin':
      return <HRStaffAdminDashboard />;

    case 'passenger':
      return <PassengerDashboard onSelectTrain={onSelectTrain} onInspectDetails={onInspectDetails} />;

    default:
      return <SuperAdminDashboard onSelectView={onSelectView} onSelectTrain={onSelectTrain} />;
  }
};
