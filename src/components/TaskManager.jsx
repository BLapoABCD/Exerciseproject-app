"use client";
import { useState } from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import { isOverdue ,dateFormat } from "@/lib/taskUtils";
import TaskToolbar from "./TaskToolbar";

export default function TaskManager({ initialTasks }) {
  const [statusFilter, setStatusFilter] = useState("semua")
  const [search, setSearch] = useState("")
  const [sortBy, setSortBy] = useState("deadline")
  const [tasks, setTasks] = useState(initialTasks);
  const completedCount = tasks.filter((t) => t.done).length;
  const taskCount = tasks.length;
  const [editingId, setEditingId] = useState(null);
  const editingTask = tasks.find((t) => t.id === editingId);

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

  function handleAddTask(values) {
    setTasks([
    { id: crypto.randomUUID(), createdAt: new Date().toISOString(), done: false, ...values },
    ...tasks,
  ]);
  }

  function handleUpdateTask(id, values) {
  setTasks(tasks.map((t) => (t.id === id ? { ...t, ...values } : t)));
  setEditingId(null);
}

  function handleToggleDone(id) {
    setTasks((tasks.map((t) => {
      if (id === t.id) {
        return {...t, done: !t.done};
      }
      else return t;
    })))
  };

  function handleDeleteTask(id) {
    if (window.confirm("Hapus tugas ini?")){
      setTasks(tasks.filter((t) => {return t.id !== id}))
    }
  }

  return (
    <div className="space-y-4">
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

      <TaskList 
      allTasks={tasks}
      tasks={visibleTasks} 
      onToggleDone={handleToggleDone} 
      onDelete={handleDeleteTask}
      onEdit={setEditingId}
      />
    </div>
  );
}