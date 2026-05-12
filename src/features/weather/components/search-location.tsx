"use client";
import { SetStateAction, useState } from "react";
import { getWeatherByLocation } from "../weather.service";

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
          const data = await getWeatherByLocation(searchLocation);
          setWeatherData(data);
        }}
        className="cursor-pointer"
      >
        Search
      </button>
    </form>
  );
}
