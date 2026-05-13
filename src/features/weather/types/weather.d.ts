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
  hourly: {
    time: [
      "2026-05-12T00:00",
      "2026-05-12T01:00",
      "2026-05-12T02:00",
      "2026-05-12T03:00",
      "2026-05-12T04:00",
      "2026-05-12T05:00",
      "2026-05-12T06:00",
      "2026-05-12T07:00",
      "2026-05-12T08:00",
      "2026-05-12T09:00",
      "2026-05-12T10:00",
      "2026-05-12T11:00",
      "2026-05-12T12:00",
      "2026-05-12T13:00",
      "2026-05-12T14:00",
      "2026-05-12T15:00",
      "2026-05-12T16:00",
      "2026-05-12T17:00",
      "2026-05-12T18:00",
      "2026-05-12T19:00",
      "2026-05-12T20:00",
      "2026-05-12T21:00",
      "2026-05-12T22:00",
      "2026-05-12T23:00",
    ],
    temperature_2m: [
      8.1, 7.8, 7.3, 6.4, 5.8, 5.9, 6.9, 7.7, 8.2, 9, 9.8, 9.6, 9.8, 11, 10.1,
      12.4, 10.5, 9.4, 8.1, 7.4, 7.5, 7.8, 8, 7.7,
    ],
    weather_code: [
      3, 3, 3, 0, 1, 0, 2, 3, 3, 3, 3, 80, 61, 2, 61, 80, 80, 80, 61, 80, 61,
      61, 61, 3,
    ],
    relative_humidity_2m: [
      82, 81, 75, 76, 73, 73, 65, 59, 56, 57, 55, 51, 55, 58, 56, 50, 64, 69,
      73, 81, 86, 88, 81, 79,
    ],
    dew_point_2m: [
      5.2, 4.7, 3.2, 2.5, 1.3, 1.5, 0.8, 0.2, -0.1, 1, 1.2, -0.1, 1.2, 3, 1.7,
      2.3, 4, 4, 3.5, 4.4, 5.3, 5.9, 5, 4.3,
    ],
    apparent_temperature: [
      5.5, 4.8, 4.2, 3.1, 2.4, 2.6, 2.9, 3.9, 4.4, 5.4, 6.3, 6, 6.5, 7.6, 7.1,
      8.9, 7.1, 5.3, 4.8, 4, 4.8, 5.1, 5.1, 4.6,
    ],
    precipitation: [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.3, 0, 0, 0.5, 0, 2.4, 1.1, 0.1, 2.1,
      0.5, 1, 0.3, 0,
    ],
    precipitation_probability: [
      0, 0, 0, 0, 0, 0, 0, 0, 3, 15, 23, 5, 25, 28, 48, 65, 100, 100, 98, 100,
      100, 100, 75, 8,
    ],
    rain: [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.3, 0, 0, 0.5, 0, 2.4, 1.1, 0.1, 1.7,
      0.5, 1, 0.3, 0,
    ],
    showers: [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.4, 0, 0, 0, 0,
    ],
    snowfall: [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    snow_depth: [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    is_day: [
      0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
  },
  daily: {
    time: ["2026-05-13"],
    weather_code: [95],
    temperature_2m_max: [13.3],
    temperature_2m_min: [6.2],
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
