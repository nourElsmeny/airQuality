export interface NearestCityWithLocation {
  key?: string;
  lat?: number;
  lon?: number;
}
export interface PollutionCron {
  Result: {
    pollution:{
    ts: string;
    aqius: number;
    mainus: string;
    aqicn: number;
    maincn: string;
    }
  };
}
