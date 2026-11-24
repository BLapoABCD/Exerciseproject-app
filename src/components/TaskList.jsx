import TaskCard from "./TaskCard";

export default function TaskList({tasks, allTasks, onToggleDone, onDelete, onEdit}) {
  if (allTasks.length === 0) {
    return (
      <p className="text-red-400 text-center text-lg opacity-80">Tugas masih kosong! tambahkan tugasmu!</p>
    );
  }

  if (tasks.length === 0) {
    return (
      <p className="text-center text-lg opacity-80">Tidak ada tugas yang bisa ditampilkan untuk filter ini</p>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onToggleDone={onToggleDone}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}
