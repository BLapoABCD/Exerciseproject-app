// @/components/ToDoFetcher.jsx
const API_BASE = "/api/tasks";

export async function getTasks() {
  const res = await fetch(API_BASE, { cache: "no-store" });
  if (!res.ok) throw new Error("Gagal memuat tasks dari API");
  return res.json();
}

export async function addTaskToApi(task) {
  const res = await fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  if (!res.ok) throw new Error("Gagal menyimpan task baru ke API");
  return res.json();
}

export async function updateTaskInApi(id, updates) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  if (!res.ok) throw new Error("Gagal memperbarui task di API");
  return res.json();
}

export async function deleteTaskFromApi(id) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Gagal menghapus task dari API");
  return res.json();
}