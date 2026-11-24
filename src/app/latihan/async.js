/* const tunggu = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function demo() {
  console.log("Mulai");
  await tunggu(1000);
  console.log("Setelah 1 detik");
}

demo();
console.log("Ini tercetak lebih dulu!"); */

// NOMOR 1
/* async function ambilTodos() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=5");

    if (!response.ok) {
      throw new Error(`Gagal mengambil data (status ${response.status})`);
    }

    const data = await response.json();
    const ambilJudul = data.map((t) => t.title);
    console.log(ambilJudul);
  } catch (error) {
    console.error("Terjadi error:", error.message);
  }
} 

ambilTodos(); */

// NOMOR 2
/* async function ambilTodos() {
  try {
    const response = await fetch("https://jsonplaceholder.typicosde.com/todos?_limit=5");

    if (!response.ok) {
      throw new Error(`Gagal mengambil data (status ${response.status})`);
    }

    const data = await response.json();
    const ambilJudul = data.map((t) => t.title);
    console.log(ambilJudul);
  } catch (error) {
    console.error("Terjadi error:", error.message);
  }
}

ambilTodos();
// output: Terjadi error: fetch failed */

//NOMOR 3
async function ambilTodoById(id) {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${id}`,
    );

    if (!response.ok) {
      {
        throw new Error(`Gagal mengambil data (status ${response.status})`);
      }
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Terjadi error: ", error.message);
  }
}

async function fungsiLain() {
  const data = await ambilTodoById(1);
  console.log(data);
}

fungsiLain();

// NOMOR 4

const task = {
  id: 1,
  title: "Belajar JS",
  description: "Belajar object di JS",
  deadline: "2026-11-20",
  done: false,
};

async function buatTodo() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });

    if (!response.ok) {
      throw new Error(`Gagal membuat data (status ${response.status})`);
    }

    const hasil = await response.json();
    console.log("Berhasil dibuat:", hasil);
  } catch (error) {
    console.error("Terjadi error:", error.message);
  }
}

buatTodo();
