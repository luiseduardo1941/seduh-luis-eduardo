import Link from "next/link";

const cities = [
  { id: "dallol", name: "Dallol", country: "ET" },
  { id: "fairbanks", name: "Fairbanks", country: "US" },
  { id: "london", name: "London", country: "GB" },
  { id: "recife", name: "Recife", country: "BR" },
  { id: "vancouver", name: "Vancouver", country: "CA" },
  { id: "yakutsk", name: "Yakutsk", country: "RU" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_#000,_#000000e0)] text-white flex flex-col items-center justify-center px-4">
      
      <h1 className="text-5xl font-light mb-1">Weather</h1>
      <p className="opacity-70 mb-8">Select a city</p>

      <div className="mb-12">
        <img
          src="/Vector.svg"
          alt="Globe Icon"
          width={110}
          height={110}
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
        {cities.map((city) => (
          <Link
            key={city.id}
            href={`/city/${city.id}`}
            className="px-6 py-3 rounded-xl text-center border border-white/20 hover:bg-white hover:text-black transition"
          >
            {city.name}
          </Link>
        ))}
      </div>
    </main>
  );
}
