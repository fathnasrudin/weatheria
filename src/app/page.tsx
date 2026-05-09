const weatherData = {
  location: {
    name: "Garut",
    country: "Indonesia",
    latitude: -6.91,
    longitude: 107.61,
    timezone: "Asia/Jakarta",
  },

  current: {
    time: "2026-05-13T02:00",

    temperature: 24,
    feelsLike: 26,

    humidity: 80,
    windSpeed: 5,

    weatherCode: 3,

    isDay: true,
  },

  hourly: [
    {
      time: "2026-05-13T03:00",

      temperature: 24,

      humidity: 82,

      weatherCode: 3,
    },
  ],

  daily: [
    {
      date: "2026-05-13",

      minTemperature: 21,
      maxTemperature: 29,

      weatherCode: 2,

      sunrise: "2026-05-13T05:48",
      sunset: "2026-05-13T17:52",
    },
  ],
};

export default function Home() {
  return (
    <div className="flex gap-4 p-6">
      {/* left part */}
      <div className="flex flex-col gap-4 w-80">
        {/* searchbar */}
        <div className="bg-red-200 py-1 px-2 rounded-full">searchbar</div>

        {/* main part */}
        <div className="bg-red-200 rounded-2xl p-2">
          {/* main section */}
          <div className="text-center py-16">
            <div className="text-6xl">28</div>
            <div className="text-2xl">Rainy Day</div>
            <div>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Nesciunt, sed. Sequi quis at,
            </div>
          </div>

          {/* detail grid */}
          <section className="grid grid-cols-2 gap-2 ">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="border p-2 rounded-xl">
                <div>FEELS LIKE</div>
                <div>30</div>
                <p>lorem ipsum dolor sit</p>
              </div>
            ))}
          </section>
        </div>
      </div>

      {/* right part */}
      <div className="flex-1 overflow-hidden grid grid-cols-2 auto-rows-min gap-4">
        {/* hourly forecast */}
        <div className="bg-red-200 border col-span-2 rounded-2xl p-2">
          <h3>HOURLY FORECAST</h3>
          <div className="flex gap-2  overflow-hidden">
            {Array.from({ length: 15 }).map((_, i) => (
              <div key={i} className="border p-1 rounded-xl text-center">
                <div>Now</div>
                <div>28</div>
                <p>icon</p>
              </div>
            ))}
          </div>
        </div>

        {/* hourly forecast */}
        <div className="bg-red-200 border  col-span-2  rounded-2xl p-2">
          <h3>DAILY FORECAST</h3>
          <div className="flex gap-2 overflow-hidden">
            {Array.from({ length: 15 }).map((_, i) => (
              <div key={i} className="border p-1 rounded-xl text-center">
                <div>Now</div>
                <div>28</div>
                <p>icon</p>
              </div>
            ))}
          </div>
        </div>

        {/* other details */}
        <div className="bg-red-200 border rounded-2xl p-2">
          <h3>uv index</h3>
          <div>3</div>
          <p>moderate</p>
          <p>lorem ipsum dolor sit amet</p>
        </div>

        <div className="bg-red-200 border rounded-2xl p-2">
          <h3>wind</h3>
          <div>3</div>
          <p>moderate</p>
          <p>lorem ipsum dolor sit amet</p>
        </div>
      </div>
    </div>
  );
}
