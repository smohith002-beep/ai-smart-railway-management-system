// ===============================================================
// OFFICIAL IRCTC TICKET BOOKING SERVICE INTEGRATION
// Safe, compliant external booking redirection
// ===============================================================

export interface BookingDetails {
  trainNumber?: string;
  trainName?: string;
  sourceStationCode?: string;
  sourceStationName?: string;
  destinationStationCode?: string;
  destinationStationName?: string;
  journeyDate?: string;
  classCode?: string;
  passengersCount?: number;
}

export class IrctcBookingService {
  private static defaultBaseUrl = 'https://www.irctc.co.in/nget/train-search';

  /**
   * Retrieves the configured official IRCTC booking portal URL
   */
  public static getBookingPortalUrl(): string {
    return (import.meta.env.VITE_IRCTC_BOOKING_URL as string) || this.defaultBaseUrl;
  }

  /**
   * Generates a safe, non-sensitive booking search URL
   * Opens the official IRCTC portal with prefilled parameters where supported.
   */
  public static generateBookingUrl(details: BookingDetails): string {
    const cleanTrainNum = details.trainNumber ? details.trainNumber.replace(/\D/g, '').trim() : '';
    const baseUrl = this.getBookingPortalUrl();

    const params = new URLSearchParams();
    if (cleanTrainNum) {
      params.set('trainNo', cleanTrainNum);
    }
    if (details.sourceStationCode) {
      params.set('source', details.sourceStationCode.toUpperCase().trim());
    }
    if (details.destinationStationCode) {
      params.set('destination', details.destinationStationCode.toUpperCase().trim());
    }
    if (details.journeyDate) {
      // Format YYYY-MM-DD or DD-MM-YYYY
      params.set('journeyDate', details.journeyDate);
    }
    if (details.classCode && details.classCode !== 'ALL') {
      params.set('quota', 'GN');
      params.set('class', details.classCode);
    }

    const queryStr = params.toString();
    return queryStr ? `${baseUrl}?${queryStr}` : baseUrl;
  }

  /**
   * Dispatches the user to the official IRCTC website in a secure new tab.
   * Zero sensitive credentials (passwords/OTPs/PINs) are ever requested or stored.
   */
  public static openOfficialBooking(details: BookingDetails): void {
    const url = this.generateBookingUrl(details);
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}
