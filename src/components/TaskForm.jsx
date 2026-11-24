"use client";
import { useState } from "react";

export default function TaskForm({ 
  submitLabel = "Tambah tugas",
  initialValues,
  onSubmit,
  onCancel,
   }) {
  const [title, setTitle] = useState(initialValues?.title ?? "");
  const [description, setDescription] = useState(initialValues?.description ?? "");
  const [deadline, setDeadline] = useState(initialValues?.deadline ?? "");
  const [error, setError] = useState(null);
  const isEditing = Boolean(initialValues)

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) {
      setError("*Isi nama judul tugas terlebih dahulu!")
      return
    };
    if (!deadline) {
      setError("*Isi deadline tugas terlebih dahulu!")
      return
    }
    setError(null);
  
    onSubmit({ title: title.trim(), description: description.trim(), deadline });

    if (!isEditing) {
      setTitle("");
      setDescription("");
      setDeadline("");
    }
  }

  const inputClass = "border rounded-lg px-3 py-2 w-full bg-transparent";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-3xl mx-auto w-full">
      <input className={inputClass} placeholder="Nama tugas" value={title}
        onChange={(e) => setTitle(e.target.value)} />
      <textarea className={inputClass} placeholder="Deskripsi" value={description}
        onChange={(e) => setDescription(e.target.value)} />
      <input className={`${inputClass} hover:cursor-text scheme-dark`} type="datetime-local" value={deadline}
        onChange={(e) => setDeadline(e.target.value)} />
      <button type="submit" className="border rounded-lg px-3 py-2 hover:bg-neutral-800 hover:cursor-pointer active:bg-neutral-700">
        {submitLabel}
      </button>
      {onCancel && <button type="button" className={`${inputClass} hover:cursor-pointer hover:bg-neutral-800 active:bg-neutral-700`} onClick={onCancel}>Batal</button>}
       {error && <p className="text-red-400 text-sm">{error}</p>}
    </form>
  );
}