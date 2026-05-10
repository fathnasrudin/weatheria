"use client";
import { SetStateAction, useState } from "react";
import { getWeather } from "../weather.service";

const fetchGeocoding = async (searchLocation: string) => {
  try {
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${searchLocation}&count=3&language=en&format=json`,
    );

    if (!response.ok) {
      throw new Error("Response Not Ok");
    }

    const result = await response.json();

    const location: IGeocodingItem = result.results[0];
    if (!location) throw new Error("Location not found");

    return { location, error: null };
  } catch (error) {
    console.error(error);
    return { location: null, error };
  }
};

function normalizeOpenMeteo(
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

      humidity: 0,
      windSpeed: 0,

      weatherCode: 0,

      details: {},
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

export function Searchbar({
  setWeatherData,
}: {
  setWeatherData: React.Dispatch<SetStateAction<IWeatherData | null>>;
}) {
  const [searchLocation, setSearchLocation] = useState("");

  return (
    <form className="flex gap-4">
      <input
        type="text"
        placeholder="searchbar"
        className="flex-1 bg-gray-200 py-1 px-2 rounded-full"
        value={searchLocation}
        onChange={(e) => {
          setSearchLocation(e.target.value);
        }}
      />
      <button
        onClick={async (e) => {
          e.preventDefault();

          const { error, location } = await fetchGeocoding(searchLocation);
          console.log({ error, location });

          if (!location) {
            console.error(error);
            return;
          }

          const { data: rawForecast, error: fetchWeatherError } =
            await getWeather({
              lat: location?.latitude,
              long: location?.longitude,
            });

          if (fetchWeatherError) {
            console.error(fetchWeatherError);
            return;
          }

          if (!rawForecast) {
            console.error("Data not found");
            return;
          }

          //
          const normalizedData = normalizeOpenMeteo(rawForecast, location);
          console.log({ normalizedData });
          setWeatherData(normalizedData);
        }}
        className="cursor-pointer"
      >
        Search
      </button>
    </form>
  );
}
