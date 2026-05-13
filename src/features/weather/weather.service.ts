import { IGeocodingItem, IOpenMeteoForecast } from "./types/weather";

export function normalizeOpenMeteo(
  rawForecast: IOpenMeteoForecast,
  geolocation: IGeocodingItem,
) {
  const hourly = rawForecast.hourly.time.map((t, i) => ({
    time: t,
    temperature: rawForecast.hourly.temperature_2m[i],
    weatherCode: rawForecast.hourly.weather_code[i],
    isDay: rawForecast.hourly.is_day[i],
  }));

  return {
    location: {
      name: `${geolocation.name}, ${geolocation.admin2}, ${geolocation.admin1}`,
      country: geolocation.country,
      latitude: geolocation.latitude,
      longitude: geolocation.longitude,
      timezone: geolocation.timezone,
    },

    current: {
      time: rawForecast.current.time,

      temperature: {
        value: rawForecast.current.temperature_2m,
        unit: rawForecast.current_units.temperature_2m,
      },
      weatherCode: rawForecast.current.weather_code,
      isDay: rawForecast.current.is_day,
      details: [
        {
          title: "Feels Like",
          value: rawForecast.current.apparent_temperature,
          unit: rawForecast.current_units.apparent_temperature,
        },

        {
          title: "Humidity",
          value: rawForecast.current.relative_humidity_2m,
          unit: rawForecast.current_units.relative_humidity_2m,
        },

        {
          title: "Wind Speed",
          value: rawForecast.current.wind_speed_10m,
          unit: rawForecast.current_units.wind_speed_10m,
        },
      ],
    },

    hourly: hourly,

    daily: [
      {
        date: "2026-05-13",
        temperature: 0,
      },
    ],
  };
}

export async function getWeather({ lat, long }: { lat: number; long: number }) {
  const currentProps = ["temperature_2m", "apparent_temperature"];
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=${currentProps.join(",")}`,
    );

    if (!response.ok) {
      throw new Error("Response Not Ok");
    }

    const result: IOpenMeteoForecast = await response.json();
    return { data: result, error: null };
  } catch (error) {
    console.error(error);
    return { data: null, error };
  }
}

export async function getWeatherByCoordinate({
  lat,
  long,
}: {
  lat: number;
  long: number;
}) {
  const currentProps = [
    "temperature_2m",
    "apparent_temperature",
    "relative_humidity_2m",
    "wind_speed_10m",
    "weather_code",
    "is_day",
  ];
  const hourlyProps = ["temperature_2m", "weather_code", "rain", "is_day"];
  const forecastProps = [
    ["latitude", lat],
    ["longitude", long],
    ["forecast_days", 1],
    ["current", currentProps.join(",")],
    ["hourly", hourlyProps.join(",")],
  ];

  const forecastString = forecastProps.map((i) => i.join("=")).join("&");

  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?${forecastString}`,
  );

  if (!response.ok) {
    console.log(await response.json());
    throw new Error("Response Not Ok");
  }

  const result: IOpenMeteoForecast = await response.json();
  console.log({ result });
  return result;
}

const getGeocoding = async (searchLocation: string) => {
  const response = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${searchLocation}&count=3&language=en&format=json`,
  );

  if (!response.ok) {
    throw new Error("Response Not Ok");
  }

  const result = await response.json();

  const location: IGeocodingItem = result.results[0];
  if (!location) throw new Error("Location Not Found");
  return location;
};

export async function getWeatherByLocation(locationName: string) {
  const location = await getGeocoding(locationName);
  const weather = await getWeatherByCoordinate({
    lat: location.latitude,
    long: location.longitude,
  });

  const normalizedWeather = normalizeOpenMeteo(weather, location);
  console.log({ normalizedWeather });
  return normalizedWeather;
}
