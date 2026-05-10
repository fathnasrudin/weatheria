"use client";
import {
  formatDateToNumber,
  formatDateToWeekday,
  formatHour,
} from "@/features/weather/weather.utils";
import React, { SetStateAction, useEffect, useState } from "react";

const weatherData: IWeatherData = {
  location: {
    name: "Garut",
    country: "Indonesia",
    latitude: -6.91,
    longitude: 107.61,
    timezone: "Asia/Jakarta",
  },

  current: {
    time: "2026-05-13T13:00",

    temperature: 24,
    feelsLike: 26,

    humidity: 80,
    windSpeed: 5,

    weatherCode: 3,

    isDay: true,
  },

  hourly: [
    {
      time: "2026-05-13T02:00",
      temperature: 24,
    },
    {
      time: "2026-05-13T03:00",
      temperature: 24,
    },
  ],

  daily: [
    {
      date: "2026-05-13",
      temperature: 27,
    },
  ],
};

const currentWeatherDetails = [
  { title: "Feels Like", value: weatherData.current.feelsLike },
  { title: "Humidity", value: weatherData.current.humidity },
  { title: "Wind Speed", value: weatherData.current.windSpeed },
];

function HourlyForecastCard({
  hForecast,
}: {
  hForecast: {
    time: string;
    temperature: number;
  };
}) {
  return (
    <div key={hForecast.time} className="border p-1 rounded-xl text-center">
      <div>{formatHour(hForecast.time, weatherData.location.timezone)}</div>
      <div>{hForecast.temperature}</div>
      <p>icon</p>
    </div>
  );
}

function DailyForecastCard({
  dForecast,
}: {
  dForecast: {
    date: string;
    temperature: number;
  };
}) {
  return (
    <div key={dForecast.date} className="border p-1 rounded-xl text-center">
      <div>
        {formatDateToWeekday(dForecast.date, weatherData.location.timezone)}
      </div>
      <div>
        {formatDateToNumber(dForecast.date, weatherData.location.timezone)}
      </div>
      <div>{dForecast.temperature}</div>
      <p>icon</p>
    </div>
  );
}

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

async function fetchWeather({ lat, long }: { lat: number; long: number }) {
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m`,
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

function Searchbar({
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
            await fetchWeather({
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

export default function Home() {
  const [weatherData, setWeatherData] = useState<IWeatherData | null>(null);

  return (
    <div className="flex flex-col sm:flex-row gap-4 p-6 bg-gray-100">
      {/* left part */}
      <div className="w-full sm:w-80 flex flex-col gap-4 ">
        {/* searchbar */}
        <Searchbar setWeatherData={setWeatherData} />

        {weatherData && (
          <div className="bg-blue-200 rounded-2xl p-4 space-y-16">
            {/* main part */}
            <div className="text-center text-xl">
              {weatherData.location.name}, {weatherData.location.country}
            </div>

            {/* main section */}
            <div className="text-center">
              <div className="text-6xl">{weatherData.current.temperature}</div>
              <div className="text-2xl">
                weather code {weatherData.current.weatherCode}
              </div>
            </div>

            {/* detail grid */}
            <section className="grid grid-cols-2 gap-2 ">
              {currentWeatherDetails.map((item) => (
                <div key={item.title} className="border p-2 rounded-xl">
                  {/* generic title */}
                  <div className="text-xs font-bold text-gray-700">
                    {item.title}
                  </div>
                  <div className="text-2xl font-bold">{item.value}</div>
                  <p className="text-xs mt-4 text-gray-800">No description</p>
                </div>
              ))}
            </section>
          </div>
        )}
      </div>

      {/* right part */}
      {weatherData && (
        <div className="flex-1 overflow-hidden grid grid-cols-2 auto-rows-min gap-4">
          {/* hourly forecast */}
          <div className="bg-blue-200 border col-span-2 rounded-2xl p-2 space-y-4">
            <h3>HOURLY FORECAST</h3>
            <div className="flex gap-2  overflow-auto">
              {weatherData.hourly.map((forecast) => (
                <HourlyForecastCard key={forecast.time} hForecast={forecast} />
              ))}
            </div>
          </div>

          {/* hourly forecast */}
          <div className="bg-blue-200 border  col-span-2  rounded-2xl p-2">
            <h3>DAILY FORECAST</h3>
            <div className="flex gap-2   overflow-auto">
              {weatherData.daily.map((dforecast) => (
                <DailyForecastCard key={dforecast.date} dForecast={dforecast} />
              ))}
            </div>
          </div>

          {/* other details */}
          <div className="bg-blue-200 border rounded-2xl p-2">
            <h3>uv index</h3>
            <div>3</div>
            <p>moderate</p>
            <p>lorem ipsum dolor sit amet</p>
          </div>

          <div className="bg-blue-200 border rounded-2xl p-2">
            <h3>wind</h3>
            <div>3</div>
            <p>moderate</p>
            <p>lorem ipsum dolor sit amet</p>
          </div>
        </div>
      )}
    </div>
  );
}
