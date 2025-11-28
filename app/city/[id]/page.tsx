"use client";

import { useParams } from "next/navigation";
import useSWR from "swr";
import { DateTime } from "luxon";
import {
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
  Moon,
} from "lucide-react";

import { CITIES } from "@/lib/cities";
import { fetchForecast } from "@/lib/api";
import { getReferenceDateTimes } from "@/lib/timezone";
import { ForecastResponse } from "@/lib/types";
import WeatherStats from "@/components/WeatherStats";

function normalize(str: string) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .toLowerCase();
}

export default function CityPage() {
  const params = useParams();
  const cityParam = Array.isArray(params.id) ? params.id[0] : params.id;

  if (!cityParam)
    return <div className="p-4 text-white">Cidade não encontrada</div>;

  const city = CITIES.find((c) => normalize(c.id) === normalize(cityParam));

  const { data, error } = useSWR<ForecastResponse>(
    city ? ["forecast", city.q] : null,
    city ? () => fetchForecast(city.q) : null
  );

  if (!city) return <div className="p-4 text-white">Cidade não encontrada</div>;
  if (error) return <div className="p-4 text-white">Erro ao carregar os dados</div>;
  if (!data) return <div className="p-4 text-white">Carregando...</div>;

  // === horários ===
  const nowInCity = DateTime.now().setZone(city.tz);
  const dateISO = nowInCity.toFormat("yyyy-MM-dd");
  const refs = getReferenceDateTimes(dateISO, city.tz);

  const allHours = data.forecast.forecastday.flatMap(
    (fd: ForecastResponse["forecast"]["forecastday"][number]) => fd.hour
  );

  function findHourFor(refUtcIso: string) {
    const ref = DateTime.fromISO(refUtcIso);
    return allHours.find((h) => {
      const hLocal = DateTime.fromFormat(h.time, "yyyy-LL-dd HH:mm", {
        zone: data!.location.tz_id,
      });
      return hLocal.toUTC().hasSame(ref, "hour");
    });
  }

  const tiles = [
    { label: "Amanhecer", ref: refs[0] },
    { label: "Manhã", ref: refs[1] },
    { label: "Tarde", ref: refs[2] },
    { label: "Noite", ref: refs[3] },
  ].map((item) => ({
    label: item.label,
    hour: item.ref ? findHourFor(item.ref.utcISO) : null,
  }));

  // === tema pela condição ===
  const condition = data.current.condition.text.toLowerCase();
  let bgClass = "bg-[#36A8F6]";
  let textClass = "text-white";

  if (condition.includes("cloud")) {
    bgClass = "bg-[#C4C4C4]";
    textClass = "text-black";
  } else if (condition.includes("snow")) {
    bgClass = "bg-[#EAF6FF]";
    textClass = "text-black";
  } else if (condition.includes("rain")) {
    bgClass = "bg-[#506680]";
    textClass = "text-white";
  } else if (condition.includes("storm") || condition.includes("thunder")) {
    bgClass = "bg-[#2A3452]";
    textClass = "text-white";
  } else if (condition.includes("night") || condition.includes("moon")) {
    bgClass = "bg-[#0B1A30]";
    textClass = "text-white";
  }

  const finalTextColor =
    textClass === "text-white" ? "#FFFFFF" : "#000000";

  function getWeatherIcon(text: string, size = 42) {
    const t = text.toLowerCase();
    if (t.includes("rain")) return <CloudRain size={size} />;
    if (t.includes("cloud")) return <Cloud size={size} />;
    if (t.includes("snow")) return <CloudSnow size={size} />;
    if (t.includes("storm") || t.includes("thunder"))
      return <CloudLightning size={size} />;
    if (t.includes("night") || t.includes("moon")) return <Moon size={size} />;
    return <Sun size={size} />;
  }

  return (
    <main
      className={`min-h-screen flex items-center justify-center px-4 ${bgClass}`}
      style={{ color: finalTextColor }}
    >
      {/* Container principal */}
      <div className="w-full max-w-4xl text-center flex flex-col items-center pt-20">

        {/* Cidade e condição */}
        <h1 className="text-4xl font-light mb-1">{city.name}</h1>
        <p className="text-sm mb-10 opacity-80">{data.current.condition.text}</p>

        {/* Temperatura */}
        <div className="mb-6">
          <span className="text-[150px] font-light leading-none">{Math.round(data.current.temp_c)}</span>
          <span className="text-5xl align-super ml-2">°C</span>
        </div>

        {/* Ícone principal */}
        <div className="flex justify-center mb-20">
          {getWeatherIcon(data.current.condition.text, 120)}
        </div>

        {/* Tiles horários */}
        <section className="flex justify-center gap-32 mb-20 flex-wrap">
          {tiles.map((t) => (
            <div
              key={t.label}
              className="flex flex-col items-center min-w-[120px]"
            >
              <span className="text-sm opacity-80 mb-3">{t.label}</span>
              {t.hour ? (
                <>
                  <div className="mb-3">
                    {getWeatherIcon(t.hour.condition.text, 64)}
                  </div>
                  <span className="text-base font-medium">
                    {Math.round(t.hour.temp_c)}°C
                  </span>
                </>
              ) : (
                <span className="opacity-50">--</span>
              )}
            </div>
          ))}
        </section>

        {/* WeatherStats com espaço correto */}
        <div className="mt-40">
          <WeatherStats
            wind={data.current.wind_kph}
            sunrise={data.forecast.forecastday[0].astro.sunrise}
            sunset={data.forecast.forecastday[0].astro.sunset}
            humidity={data.current.humidity}
          />
        </div>

      </div>
    </main>
  );
}
