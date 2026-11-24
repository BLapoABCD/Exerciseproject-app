import { isOverdue, dateFormat } from "@/lib/taskUtils";

export default function TaskCard({ task, onToggleDone, onDelete, onEdit}) {

  const overdue = !task.done && new Date(task.deadline) < new Date();

  return (
    <div className="flex flex-col sm:flex-row sm:items-stretch justify-between w-full max-w-3xl mx-auto mb-5 rounded-xl border border-neutral-700 overflow-hidden bg-neutral-900">
      <div className="flex-1 p-4 sm:p-6 flex flex-col justify-between gap-2">
        <h2 className="text-lg font-semibold">{task.title}</h2>
        <p className="text-sm opacity-80">{task.description}</p>
        <p className="text-sm">Deadline: {dateFormat(new Date(task.deadline))}</p>
        <p className="text-sm">Dibuat pada: {!task.createdAt ? "-" : dateFormat(new Date(task.createdAt))}</p>
        <p>{task.done ? "✅ Selesai" : "⏳ Belum selesai"}</p>
      </div>
      <div className="p-4 sm:p-6 sm:w-48 md:w-56 flex flex-row sm:flex-col items-center justify-between sm:justify-center gap-3 shrink-0">
        <button
          className="border rounded-lg px-2 py-1 max-w-100 min-w-40 min-h-10 
          text-sm hover:cursor-pointer hover:bg-neutral-800
          active:bg-neutral-700"
          onClick={() => onToggleDone(task.id)}
        >
          {task.done ? "Tandai belum selesai" : "Tandai selesai"}
        </button>
        <button 
          className="border rounded-lg px-2 py-1 max-w-100 min-w-40 min-h-10 
          text-sm hover:cursor-pointer hover:bg-neutral-800
          active:bg-neutral-700"
          onClick={() => onDelete(task.id)}>
          Hapus tugas
        </button>
          <button 
          className="border rounded-lg px-2 py-1 max-w-100 min-w-40 min-h-10 
          text-sm hover:cursor-pointer hover:bg-neutral-800
          active:bg-neutral-700"
          onClick={() => onEdit(task.id)}>
          Edit tugas
        </button>
        {!overdue ? (
          <p className=" rounded-lg bg-green-700 min-w-30 text-sm mt-2 pl-1 pr-1 text-center">
            Aman
          </p>
        ) : (
          <p className=" rounded-lg bg-red-700 min-w-30 text-sm mt-2 pl-1 pr-1 text-center">
            Lewat deadline
          </p>
        )}
      </div>
    </div>
  );
}
