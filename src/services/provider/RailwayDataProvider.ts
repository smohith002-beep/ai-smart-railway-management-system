import { TrainPosition, TrainDetails, RailwayStation, DataSourceHealth } from '../../types/railway';

export interface IRailwayDataProvider {
  id: string;
  name: string;
  providerType: 'OFFICIAL' | 'AUTHORIZED' | 'GTFS_RT' | 'THIRD_PARTY' | 'SIMULATION';
  isConfigured(): boolean;
  getHealth(): Promise<DataSourceHealth>;
  getActiveTrainPositions(): Promise<TrainPosition[]>;
  getTrainDetails(trainNumber: string): Promise<TrainDetails | null>;
  getStations(): Promise<RailwayStation[]>;
}
