"use client";
import TaskManager from "@/components/TaskManager";
import Clock from "@/components/Clock";

const tasks = []

export default function Home() {
  return (
    <main className="max-w-2xl w-1/2 mx-auto p-6 space-y-4">
      <h1 className="text-3xl text-center font-bold">Personal To-do Manager</h1>
      <TaskManager initialTasks={tasks}></TaskManager>
      {
        <Clock></Clock>
      }
    </main>
  );
}
