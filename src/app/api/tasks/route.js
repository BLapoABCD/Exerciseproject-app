import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const filePath = path.join(process.cwd(), "data", "tasks.json");

const INITIAL_SEED_TASKS = [
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

async function readTasks() {
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    if (err.code === "ENOENT") {
      await fs.mkdir(path.dirname(filePath), { recursive: true });
      await fs.writeFile(
        filePath,
        JSON.stringify(INITIAL_SEED_TASKS, null, 2),
        "utf-8"
      );
      return INITIAL_SEED_TASKS;
    }
    throw err;
  }
}

async function writeTasks(tasks) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(tasks, null, 2), "utf-8");
}

export async function GET() {
  const tasks = await readTasks();
  return NextResponse.json(tasks);
}

export async function POST(request) {
  const body = await request.json();
  const tasks = await readTasks();

  const newTask = {
    id: crypto.randomUUID(),
    title: body.title ?? "",
    description: body.description ?? "",
    deadline: body.deadline ?? "",
    createdAt: body.createdAt ?? new Date().toISOString(),
    done: Boolean(body.done),
  };

  const updated = [newTask, ...tasks];
  await writeTasks(updated);
  return NextResponse.json(newTask, { status: 201 });
}