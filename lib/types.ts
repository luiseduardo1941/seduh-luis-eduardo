export interface ForecastResponse {
  location: {
    name: string;
    region: string;
    country: string;
    tz_id: string;
    localtime: string;
  };

  current: {
    temp_c: number;
    wind_kph: number;
    humidity: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
  };

  forecast: {
    forecastday: {
      date: string;
      day: {
        maxtemp_c: number;
        mintemp_c: number;
        condition: {
          text: string;
          icon: string;
        };
      };
      astro: {
        sunrise: string;
        sunset: string;
      };
      hour: {
        time: string;
        temp_c: number;
        condition: {
          text: string;
          icon: string;
        };
      }[];
    }[];
  };
}
