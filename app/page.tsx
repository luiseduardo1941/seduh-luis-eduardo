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
    <main style={styles.container}>
      <h1 style={styles.title}>Weather</h1>
      <p style={styles.subtitle}>Select a city</p>

      <div style={{ marginBottom: 50 }}>
        <img
          src="/Vector.svg"
          alt="Globe Icon"
          width={110}
          height={110}
        />
      </div>

      <div style={styles.grid}>
        {cities.map((city) => (
          <Link
            key={city.name}
            href={`/city/${city.name}`}
            style={styles.card}
          >
            {city.name}
          </Link>
        ))}
      </div>
    </main>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "radial-gradient(circle at top, #000000ff, #000)",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: "2.5rem",
  },
  subtitle: {
    opacity: 0.7,
    marginBottom: 20,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 25,
  },
  card: {
    textDecoration: "none",
    color: "white",
    borderRadius: 12,
    padding: "20px 40px",
    transition: "0.3s",
    textAlign: "center",
  },
};
