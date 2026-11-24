// Variable
const appName = "TaskManager";
let jumlahTask = 0;

// Object
const task = {
    id: 1,
    title: "Belajar JS",
    description: "Belajar object di JS",
    deadline: "2026-11-20",
    done: false,
}

// array with objects
const tasks = [
    task,
    { id: 2, title: "Tugas Fisika", description: "Laporan praktikum", deadline: "2026-11-18", done: false },
    { id: 3, title: "Push ke GitHub", description: "Commit harian", deadline: "2026-11-12", done: true },
];

// 4. Fungsi
function tambahTask(daftar, taskBaru) {
  return [...daftar, taskBaru]; // 
}

// 5. Arrow function + method array
const belumSelesai = tasks.filter((t) => t.done === false);
const judulSaja = tasks.map( (t) => t.title);
const tugasFisika = tasks.find((t) => t.id === 2);

console.log(appName);
console.log("Belum selesai:", belumSelesai);
console.log("Judul:", judulSaja);
console.log("Ditemukan:", tugasFisika);

// 6. Tanggal
const sekarang = new Date();
console.log("Dibuat pada:",sekarang.toLocaleString("id-ID"), "\n");

// LATIHAN
// no 1
console.log("NOMOR 1\n");
const tandaiSelesai = (daftar, id) => {
    return daftar.map((task => {
        if (task.id === id) {
            return {...task, done:true}
        }
    return task;
    }))
}
console.log(tandaiSelesai(tasks, 2), "\n");

// no 2
console.log("NOMOR 2\n");
const hapusTask = (daftar, id) => {
    return daftar.filter((task => task.id !== id));
}
console.log(hapusTask(tasks, 2), "\n");

// no 3
console.log("NOMOR 3\n");
console.log(new Date())
const lewatDeadline = tasks.filter((t) => new Date(t.deadline) < new Date() && !t.done) ;
console.log(lewatDeadline);