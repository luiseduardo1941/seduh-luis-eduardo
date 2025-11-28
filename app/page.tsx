"use client";

import Link from "next/link";

const cities = [
  { name: "Dallol", country: "ET" },
  { name: "Fairbanks", country: "US" },
  { name: "London", country: "GB" },
  { name: "Recife", country: "BR" },
  { name: "Vancouver", country: "CA" },
  { name: "Yakutsk", country: "RU" },
];

export default function Home() {
  return (
    <main
      className="min-h-screen w-full flex flex-col items-center justify-center"
      style={{ color: "white" }} 
    >
      <h1
        className="text-4xl font-semibold mb-2"
        style={{ marginBottom: "8px" }}
      >
        Weather
      </h1>

      <p
        className="opacity-70 mb-10"
        style={{ marginBottom: "40px" }}
      >
        Select a city
      </p>

      <div
        className="mb-16"
        style={{ marginBottom: "64px" }}
      >
        <img
          src="/Vector.svg"
          alt="Globe Icon"
          width={110}
          height={110}
        />
      </div>

      <div
        className="grid grid-cols-3 gap-x-24 gap-y-10 text-center"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          columnGap: "96px",
          rowGap: "40px",
          textAlign: "center",
        }}
      >
        {cities.map((city) => (
          <Link
            key={city.name}
            href={`/city/${city.name}`}
            className="transition hover:text-gray-400"
            style={{
              color: "white",        
              textDecoration: "none", 
              fontSize: "16px",
            }}
          >
            {city.name}
          </Link>
        ))}
      </div>
    </main>
  );
}
