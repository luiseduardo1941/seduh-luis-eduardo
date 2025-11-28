"use client";

import Link from "next/link";
import { CITIES } from "@/lib/cities";

export default function CityCards() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4">
      {CITIES.map((city) => (
        <Link
          key={city.id}
          href={`/city/${city.id}`}
          className="p-4 rounded-lg bg-blue-200 hover:bg-blue-300 text-center"
        >
          {city.name}
        </Link>
      ))}
    </div>
  );
}
