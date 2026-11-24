"use client";
import { useEffect, useState } from "react";

export default function TodoFetcher() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function ambilData() {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/todoss?_limit=5");
        if (!res.ok) throw new Error(`Gagal mengambil data (status ${res.status})`);
        setTodos(await res.json());
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    ambilData();
  }, []);

  if (loading) return <p>Memuat...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <ul>
      {todos.map((t) => (
        <li key={t.id}>{t.title}</li>
      ))}
    </ul>
  );
}