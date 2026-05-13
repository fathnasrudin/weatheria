"use client";
import { useState } from "react";

export function Searchbar({
  onSearch,
}: {
  onSearch: (locationName: string) => void;
}) {
  const [searchLocation, setSearchLocation] = useState("");

  return (
    <form className="bg-gray-200 overflow-hidden rounded-full flex">
      <input
        type="text"
        placeholder="searchbar"
        className="flex-1 px-4 py-1 outline-0"
        value={searchLocation}
        onChange={(e) => {
          setSearchLocation(e.target.value);
        }}
      />
      <button
        onClick={(e) => {
          e.preventDefault();
          onSearch(searchLocation);
        }}
        className="bg-blue-300 cursor-pointer px-4 py-1 text-sm"
      >
        Search
      </button>
    </form>
  );
}
