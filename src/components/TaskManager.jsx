"use client";
import { useState, useEffect } from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import { isOverdue ,dateFormat } from "@/lib/taskUtils";
import TaskToolbar from "./TaskToolbar";
import {
  getTasks,
  addTaskToApi,
  updateTaskInApi,
  deleteTaskFromApi,
} from "./ToDoFetcher";

export default function TaskManager({ initialTasks = [] }) {
  const [statusFilter, setStatusFilter] = useState("semua")
  const [search, setSearch] = useState("")
  const [sortBy, setSortBy] = useState("deadline")
  const [tasks, setTasks] = useState(initialTasks);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);

  const editingTask = tasks.find((t) => t.id === editingId);
  const completedCount = tasks.filter((t) => t.done).length;
  const taskCount = tasks.length;

  useEffect(() => {
    let ignore = false;
    async function loadInitialTasks() {
      try {
        setLoading(true);
        setError("");
        const data = await getTasks();
        if (!ignore && Array.isArray(data)) {
          setTasks(data);
        }
      } catch (err) {
        if (!ignore) setError(err.message);
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    loadInitialTasks();
    return () => {
      ignore = true;
    };
  }, []);

  const visibleTasks = tasks // state untuk sortnya
  .filter((t) => {
    if (statusFilter === "aktif") return !t.done;
    if (statusFilter === "selesai") return t.done;
    if (statusFilter === "terlambat") return isOverdue(t);
    return true; // 
  })
  .filter((t) => t.title.toLowerCase().includes(search.trim().toLowerCase()))
  .sort((a, b) =>
    sortBy === "deadline"
      ? new Date(a.deadline) - new Date(b.deadline)
      : new Date(b.createdAt) - new Date(a.createdAt)
  );

  async function handleAddTask(values) {
    try {
      setError("");
      const payload = {
        createdAt: new Date().toISOString(),
        done: false,
        ...values,
      };
      const created = await addTaskToApi(payload);
      setTasks((prev) => [created, ...prev]);
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleUpdateTask(id, values) {
  try {
      setError("");
      const updated = await updateTaskInApi(id, values);
      setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
      setEditingId(null);
    } catch (err) {
      setError(err.message);
    }
}

  async function handleToggleDone(id) {
    const target = tasks.find((t) => t.id === id);
    if (!target) return;
    try {
      setError("");
      const updated = await updateTaskInApi(id, { done: !target.done });
      setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch (err) {
      setError(err.message);
    }
  };

  async function handleDeleteTask(id) {
   if (!window.confirm("Hapus tugas ini?")) return;
    try {
      setError("");
      await deleteTaskFromApi(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="space-y-4">
      {error && <p className="text-red-600 text-sm">{error}</p>}
      {editingTask ? (
      <TaskForm
        key={editingTask.id}
        initialValues={editingTask}
        submitLabel="Simpan perubahan"
        onSubmit={(values) => handleUpdateTask(editingTask.id, values)}
        onCancel={() => setEditingId(null)}
      />
      ) : (
        <TaskForm onSubmit={handleAddTask} />
      )}

      <TaskToolbar
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        search={search}
        onSearchChange={setSearch}
        sortBy={sortBy}
        onSortByChange={setSortBy}
      ></TaskToolbar>

      <p>{`${completedCount} dari ${taskCount} tugas selesai!`}</p>

      {loading ? (
        <p className="text-sm text-gray-500">Memuat tugas...</p>
      ) : (
        <TaskList
          allTasks={tasks}
          tasks={visibleTasks}
          onToggleDone={handleToggleDone}
          onDelete={handleDeleteTask}
          onEdit={setEditingId}
        />
      )}
    </div>
  );
}