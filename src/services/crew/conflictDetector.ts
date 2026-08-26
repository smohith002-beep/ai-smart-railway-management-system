import { StaffMember, DutyAssignment, CrewConflictResult } from '../../types/railway';

export class CrewConflictDetector {
  /**
   * Evaluates proposed duty assignment against existing roster, rest records, qualifications, and attendance state.
   */
  public static checkConflict(
    staff: StaffMember,
    proposedDuty: Partial<DutyAssignment>,
    existingDuties: DutyAssignment[]
  ): CrewConflictResult {
    const conflicts: CrewConflictResult['conflicts'] = [];

    // 1. Check Attendance Status
    if (staff.attendanceStatus === 'LEAVE' || staff.attendanceStatus === 'SICK_LEAVE') {
      conflicts.push({
        type: 'SICK_OR_LEAVE',
        severity: 'CRITICAL',
        description: `Staff ${staff.name} is currently recorded as '${staff.attendanceStatus}'.`,
        details: 'Cannot assign operational duty to personnel on medical or authorized leave without prior clearance.'
      });
    }

    // 2. Check Overlapping Duties
    if (proposedDuty.startTime && proposedDuty.endTime) {
      const propStart = new Date(proposedDuty.startTime).getTime();
      const propEnd = new Date(proposedDuty.endTime).getTime();

      const overlapping = existingDuties.filter(d => {
        if (d.staffId !== staff.id || d.status === 'CANCELLED' || d.status === 'COMPLETED') return false;
        const dStart = new Date(d.startTime).getTime();
        const dEnd = new Date(d.endTime).getTime();
        return (propStart < dEnd && propEnd > dStart);
      });

      if (overlapping.length > 0) {
        conflicts.push({
          type: 'OVERLAPPING_DUTY',
          severity: 'CRITICAL',
          description: `Direct time conflict with ${overlapping.length} existing active duty assignment(s).`,
          details: `Existing Duty: ${overlapping[0].dutyType} (${overlapping[0].trainNumber || overlapping[0].stationCode}) from ${new Date(overlapping[0].startTime).toLocaleTimeString()} to ${new Date(overlapping[0].endTime).toLocaleTimeString()}.`
        });
      }
    }

    // 3. Check Statutory Mandatory Rest (HOER - Hours of Employment Regulations)
    // Running staff (Loco Pilot, ALP, Guard) require at least 12 hours rest at headquarters or 8 hours at outstation
    if (['loco_pilot', 'assistant_loco_pilot', 'train_manager_guard'].includes(staff.role)) {
      if (staff.lastRestCompletedAt && proposedDuty.startTime) {
        const lastRestEnd = new Date(staff.lastRestCompletedAt).getTime();
        const nextDutyStart = new Date(proposedDuty.startTime).getTime();
        const restHours = (nextDutyStart - lastRestEnd) / (1000 * 60 * 60);

        if (restHours < 12) {
          conflicts.push({
            type: 'INSUFFICIENT_REST',
            severity: 'CRITICAL',
            description: `Mandatory 12-Hour Rest Violation (HOER Statutory Rule).`,
            details: `Only ${restHours.toFixed(1)} hours of rest elapsed since last sign-off at ${new Date(staff.lastRestCompletedAt).toLocaleTimeString()}. Minimum required: 12.0 hours.`
          });
        }
      }
    }

    // 4. Medical Fitness & Qualification check
    if (staff.role === 'loco_pilot' && staff.medicalFitnessCategory !== 'A-1') {
      conflicts.push({
        type: 'QUALIFICATION_MISMATCH',
        severity: 'HIGH',
        description: `Medical Category Mismatch (${staff.medicalFitnessCategory} vs Required A-1).`,
        details: 'Chief and Mail Loco Pilots must possess valid A-1 medical fitness certificate with zero night-blindness endorsements.'
      });
    }

    // 5. Route Learning check for Vande Bharat / Superfast trains
    if (proposedDuty.trainNumber === '22436' && staff.role === 'loco_pilot') {
      const hasVbCert = staff.qualifications.some(q => q.toLowerCase().includes('vande bharat') || q.toLowerCase().includes('train-18'));
      if (!hasVbCert) {
        conflicts.push({
          type: 'QUALIFICATION_MISMATCH',
          severity: 'HIGH',
          description: 'Missing Train-18 / Vande Bharat Type Competency Certification.',
          details: 'Pilot must undergo specialized simulator and regenerative brake handling qualification for Train 18 trainsets.'
        });
      }
    }

    return {
      hasConflict: conflicts.length > 0,
      conflicts
    };
  }
}
