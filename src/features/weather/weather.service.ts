export async function getWeather({ lat, long }: { lat: number; long: number }) {
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
