import { IGeocodingItem, IOpenMeteoForecast } from "./types/weather";

export function normalizeOpenMeteo(
  rawForecast: IOpenMeteoForecast,
  geolocation: IGeocodingItem,
) {
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

      temperature: rawForecast.current.temperature_2m,
      feelsLike: 0,
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

      humidity: 0,
      windSpeed: 0,
      weatherCode: 0,
      isDay: true,
    },

    hourly: [
      {
        time: "2026-05-13T02:00",
        temperature: 0,
      },
      {
        time: "2026-05-13T03:00",
        temperature: 0,
      },
    ],

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
  ];
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=${currentProps.join(",")}`,
  );

  if (!response.ok) {
    throw new Error("Response Not Ok");
  }

  const result: IOpenMeteoForecast = await response.json();
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
  return normalizedWeather;
}
