"use client";

interface WeatherStatsProps {
  wind: number;
  sunrise: string;
  sunset: string;
  humidity: number;
}

export default function WeatherStats({ wind, sunrise, sunset, humidity }: WeatherStatsProps) {
  return (
   <section className="flex justify-center items-center gap-8 mt-16 max-w-lg mx-auto text-white text-center font-light text-sm">
  {[
    { label: "Wind speed", value: `${wind.toFixed(1)} km/h` },
    { label: "Sunrise", value: sunrise },
    { label: "Sunset", value: sunset },
    { label: "Humidity", value: `${humidity}%` },
  ].map((item, idx) => (
    <div
      key={idx}
      className={`flex flex-col items-center min-w-[90px] ${
        idx !== 0 ? "border-l border-white/40 pl-4" : ""
      }`}
    >
      <span className="text-[13px] opacity-80">{item.label}</span>
      <span className="mt-1 text-[12px] opacity-90">{item.value}</span>
    </div>
  ))}
</section>



  );
}
