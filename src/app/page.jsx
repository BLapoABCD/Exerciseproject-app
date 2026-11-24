"use client";
import TaskManager from "@/components/TaskManager";
import Clock from "@/components/Clock";
import TodoFetcher from "@/components/ToDoFetcher";
import { useState, useEffect } from "react";

const tasks = [
  {
    id: 1,
    title: "Tugas kalkulus sub-CPMK 5",
    description: "Tugas kelompok, buat video pembahasan soalnya",
    deadline: "2026-11-23T10:00",
    createdAt: "2026-11-17T12:00",
    done: false,
  },
  {
    id: 2,
    title: "Tugas Fisika persiapan kuis 2",
    description: "Persiapan kuis 2: arus DC, arus AC, gelombang EM",
    deadline: "2026-11-22T23:59",
    createdAt: "2026-11-15T12:00",
    done: true,
  },
  {
    id: 3,
    title: "Final project Excercise software",
    description: "Deploy ke GitHub",
    deadline: "2026-11-25T23:59",
    createdAt: "2026-11-15T12:00",
    done: false,
  },
]; 
/*const tasks = []*/

export default function Home() {
  return (
    <main className="max-w-2xl w-1/2 mx-auto p-6 space-y-4">
      <h1 className="text-3xl text-center font-bold">Personal To-do Manager</h1>
      <TaskManager initialTasks={tasks}></TaskManager>
      {
        <Clock></Clock>
      }
      {/*<TodoFetcher></TodoFetcher>*/}
    </main>
  );
}
