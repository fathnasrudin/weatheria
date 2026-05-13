# Weatheria

Weatheria is a web-based weather application for checking current weather conditions and weather forecasts based on searched locations.

## Preview

Open the application in your browser after starting the development server:

```txt id="x1"
http://localhost:3000
```

# Features

- Search weather by location name
- Display current weather conditions
- Display weather forecasts
- Real-time weather data powered by Open-Meteo

# Tech Stack

- Next.js
- React

# Installation

Clone the repository:

```bash id="x2"
git clone <repository-url>
```

Navigate to the project directory:

```bash id="x3"
cd weatheria
```

Install dependencies:

```bash id="x4"
npm install
```

Start the development server:

```bash id="x5"
npm run dev
```

Alternative package managers:

```bash id="x6"
yarn dev
# or
pnpm dev
# or
bun dev
```

Once the server is running, open:

```txt id="x7"
http://localhost:3000
```

# Data Sources

- [Open-Meteo API](https://open-meteo.com) — Weather and forecast data provider
- [Stellasphere WMO Weather Codes](https://gist.github.com/stellasphere/9490c195ed2b53c707087c8c2db4ec0c) — WMO weather code interpretation reference

# Roadmap

- Add Fahrenheit temperature option
- Add today's weather highlights:
  - UV Index
  - Sunrise & Sunset

- Add automatic geolocation support
- Add dark mode
- Add hourly forecast

# License

MIT License
