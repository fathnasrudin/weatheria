"use client";
import { useEffect, useState } from "react";

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

    details: {},
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

function formatHour(time: string, timezone: string) {
  return new Date(time).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h24",
    timeZone: timezone,
  });
}

function formatDateToNumber(date: string, timezone: string) {
  return new Date(date).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "2-digit",
    timeZone: timezone,
  });
}

function formatDateToWeekday(date: string, timezone: string) {
  return new Date(date).toLocaleDateString("en-US", {
    weekday: "short",
    timeZone: timezone,
  });
}

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

interface IOpenMeteoForecast {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_units: {
    time: string;
    interval: string;
    temperature_2m: string;
  };
  current: {
    time: string;
    interval: number;
    temperature_2m: number;
  };
}

interface IWeatherData {
  location: {
    name: string;
    country: string;
    latitude: number;
    longitude: number;
    timezone: string;
  };

  current: {
    time: string;
    temperature: number;
    feelsLike: number;
    humidity: number;
    windSpeed: number;
    weatherCode: number;
    isDay: boolean;
  };

  hourly: {
    time: string;
    temperature: number;
  }[];

  daily: {
    date: string;
    temperature: number;
  }[];
}

function normalizeOpenMeteo(rawForecast: IOpenMeteoForecast) {
  return {
    location: {
      name: "unknown",
      country: "unknown",
      latitude: rawForecast.latitude,
      longitude: rawForecast.longitude,
      timezone: rawForecast.timezone,
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

export default function Home() {
  const [weatherData, setWeatherData] = useState<IWeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function fetchWeatherData() {
      const lat = -6.4214;
      const long = 106.7331;
      try {
        setLoading(true);
        setErrorMessage("");
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m`,
        );

        if (!response.ok) {
          throw new Error("Response Not Ok");
        }

        const result = await response.json();
        console.log({ result });
        console.log(normalizeOpenMeteo(result));
        setWeatherData(normalizeOpenMeteo(result));
      } catch (error) {
        console.log(error);
        setErrorMessage("Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    fetchWeatherData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (errorMessage) return <p>{errorMessage}</p>;
  if (!weatherData) return <p>Data not found</p>;

  return (
    <div className="flex flex-col sm:flex-row gap-4 p-6 bg-gray-100">
      {/* left part */}
      <div className="w-full sm:w-80 flex flex-col gap-4 ">
        {/* searchbar */}
        <div className="bg-gray-200 py-1 px-2 rounded-full">searchbar</div>

        {/* main part */}
        <div className="bg-blue-200 rounded-2xl p-4 space-y-16">
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
      </div>

      {/* right part */}
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
    </div>
  );
}
