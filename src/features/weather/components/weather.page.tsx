"use client";
import {
  formatDateToNumber,
  formatDateToWeekday,
  formatHour,
} from "@/features/weather/weather.utils";
import { useState } from "react";
import { Searchbar } from "./search-location";
import { getWeatherByLocation } from "../weather.service";
import { IWeatherData } from "../types/weather";
import { weatherCodeMap } from "../weather-code-map";
import Image from "next/image";

function useGetWeatherByLocation() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [weather, setWeather] = useState<IWeatherData>();

  async function searchWeather(locationName: string) {
    try {
      setIsLoading(true);
      setErrorMessage("");
      const res = await getWeatherByLocation(locationName);
      setWeather(res);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Failed to fetch weather data");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return {
    isLoading,
    errorMessage,
    weather,
    searchWeather,
  };
}

export function WeatherPage() {
  const {
    errorMessage,
    isLoading,
    weather: weatherData,
    searchWeather,
  } = useGetWeatherByLocation();

  async function handleSearch(locationName: string) {
    searchWeather(locationName);
  }

  if (isLoading) return <p>Loading...</p>;
  if (errorMessage) return <p>{errorMessage}</p>;

  return (
    <div className="flex flex-col sm:flex-row gap-4 p-6 bg-gray-100">
      {/* left part */}
      <div className="w-full sm:w-80 flex flex-col gap-4 ">
        {/* searchbar */}
        <Searchbar onSearch={handleSearch} />

        {weatherData && (
          <div className="bg-blue-200 rounded-2xl p-4 space-y-16">
            {/* main part */}
            <div className="text-center text-sm font-bold">
              {weatherData.location.name}, {weatherData.location.country}
            </div>

            {/* main section */}
            <div className="text-center">
              <div className="text-4xl font-bold flex justify-center">
                <span>{weatherData.current.temperature.value}</span>
                <span className="text-base font-extrabold">
                  {weatherData.current.temperature.unit}
                </span>
              </div>
              <div className="mx-auto flex items-center justify-center h-16 w-16 relative">
                <Image
                  className=" h-full object-cover"
                  src={
                    weatherCodeMap[weatherData.current.weatherCode][
                      weatherData.current.isDay ? "day" : "night"
                    ].image
                  }
                  alt={
                    weatherCodeMap[weatherData.current.weatherCode][
                      weatherData.current.isDay ? "day" : "night"
                    ].description
                  }
                  width={100}
                  height={100}
                />
              </div>
              <div className="text-xl text-gray-700">
                {
                  weatherCodeMap[weatherData.current.weatherCode][
                    weatherData.current.isDay ? "day" : "night"
                  ].description
                }
              </div>
            </div>

            {/* detail grid */}
            <section className="grid grid-cols-2 gap-2 ">
              {/* current detail card */}
              {weatherData.current.details.map((item) => (
                <div key={item.title} className="border p-2 rounded-xl">
                  <div className="text-xs font-bold text-gray-700">
                    {item.title}
                  </div>
                  <div className="text-2xl font-bold">
                    {item.value}
                    <span className="text-xs">{item.unit}</span>
                  </div>
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
                <div
                  key={forecast.time}
                  className="border p-1 rounded-xl text-center"
                >
                  <div>
                    {formatHour(forecast.time, weatherData.location.timezone)}
                  </div>
                  <div>{forecast.temperature}</div>
                  <div className="mx-auto flex items-center justify-center h-16 w-16 relative">
                    <Image
                      className=" h-full object-cover"
                      src={
                        weatherCodeMap[forecast.weatherCode][
                          forecast.isDay ? "day" : "night"
                        ].image
                      }
                      alt={
                        weatherCodeMap[forecast.weatherCode][
                          forecast.isDay ? "day" : "night"
                        ].description
                      }
                      width={100}
                      height={100}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* daily forecast */}
          <div className="bg-blue-200 border  col-span-2  rounded-2xl p-2">
            <h3>DAILY FORECAST</h3>
            <div className="flex gap-2   overflow-auto">
              {weatherData.daily.map((dforecast) => (
                <div
                  key={dforecast.date}
                  className="border p-1 rounded-xl text-center"
                >
                  <div>
                    {formatDateToWeekday(
                      dforecast.date,
                      weatherData.location.timezone,
                    )}
                  </div>
                  <div>
                    {formatDateToNumber(
                      dforecast.date,
                      weatherData.location.timezone,
                    )}
                  </div>
                  <div>{dforecast.temperature}</div>
                  <p>icon</p>
                </div>
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
