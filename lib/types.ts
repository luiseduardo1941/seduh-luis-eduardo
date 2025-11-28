export interface Condition {
  text: string;
  icon: string;
}

export interface HourData {
  time: string;
  temp_c: number;
  condition: Condition;
}

export interface ForecastDay {
  date: string;
  hour: HourData[];
}

export interface ForecastResponse {
  forecast: {
    forecastday: ForecastDay[];
  };
}
