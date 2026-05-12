"use client";
import { useState } from "react";

export function Searchbar({
  onSearch,
}: {
  onSearch: (locationName: string) => void;
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
        onClick={(e) => {
          e.preventDefault();
          onSearch(searchLocation);
        }}
        className="cursor-pointer"
      >
        Search
      </button>
    </form>
  );
}
