export async function fetchForecast(q: string) {
  const key = process.env.NEXT_PUBLIC_WEATHERAPI_KEY;
  if (!key) throw new Error("API KEY faltando!");

  const url = `https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${q}&days=2&aqi=no&alerts=no`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Erro na API");
  
  return res.json();
}
