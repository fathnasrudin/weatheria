import { normalizeOpenMeteo } from "../weather.service";

const openMeteoResponse = {
  latitude: 52.52,
  longitude: 13.419998,
  generationtime_ms: 0.273466110229492,
  utc_offset_seconds: 0,
  timezone: "GMT",
  timezone_abbreviation: "GMT",
  elevation: 38,
  current_units: {
    time: "iso8601",
    interval: "seconds",
    temperature_2m: "°C",
    apparent_temperature: "°C",
    rain: "mm",
    wind_speed_10m: "km/h",
    precipitation: "mm",
    relative_humidity_2m: "%",
    is_day: "",
    snowfall: "cm",
    showers: "mm",
    weather_code: "wmo code",
    cloud_cover: "%",
    pressure_msl: "hPa",
    surface_pressure: "hPa",
    wind_gusts_10m: "km/h",
    wind_direction_10m: "°",
  },
  current: {
    time: "2026-05-12T09:45",
    interval: 900,
    temperature_2m: 9,
    apparent_temperature: 5.3,
    rain: 0,
    wind_speed_10m: 11.7,
    precipitation: 0,
    relative_humidity_2m: 55,
    is_day: 1,
    snowfall: 0,
    showers: 0,
    weather_code: 3,
    cloud_cover: 100,
    pressure_msl: 1005.8,
    surface_pressure: 1001.2,
    wind_gusts_10m: 29.5,
    wind_direction_10m: 252,
  },
};

export type IOpenMeteoForecast = typeof openMeteoResponse;

export type IWeatherData = ReturnType<typeof normalizeOpenMeteo>;

interface IGeocodingItem {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  elevation: number;
  feature_code: string;
  country_code: string;
  admin1_id: number;
  admin2_id: number;
  timezone: string;
  population: number;
  country_id: number;
  country: string;
  admin1: string;
  admin2: string;
}
