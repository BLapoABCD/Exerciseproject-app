const FILTERS = [
  { id: "semua", label: "Semua" },
  { id: "aktif", label: "Aktif" },
  { id: "selesai", label: "Selesai" },
  { id: "terlambat", label: "Terlambat" },
];

export default function TaskToolbar({
  statusFilter,
  onStatusFilterChange,
  search,
  onSearchChange,
  sortBy,
  onSortByChange,
}) {
  return (
    <>
      <div className="inline-flex overflow-hidden rounded-lg border border-neutral-700 
    divide-neutral-700 divide-x">
        {/* button */}
        {FILTERS.map((btn) => (
          <button
            key={btn.id}
            type="button"
            aria-pressed={statusFilter === btn.id}
            onClick={() => onStatusFilterChange(btn.id)}
            className={`px-3 py-1.5 text-sm font-medium 
              transition-colors hover:cursor-pointer ${
              statusFilter === btn.id
                ? "bg-purple-600 text-white shadow-sm active:bg-purple-500"
                : "bg-neutral-900 hover:bg-neutral-800 active:bg-neutral-600"
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
        {/* Search dan sortir */}
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Cari tugas..."
          aria-label="Cari tugas"
          className="px-3 py-1.5 md:w-64 text-sm border border-neutral-700 bg-neutral-900 rounded-md 
          focus:outline-none focus:ring-2 focus:ring-purple-700 focus:border-purple-700"
        />

        <select
          value={sortBy}
          onChange={(e) => onSortByChange(e.target.value)}
          aria-label="Urutkan tugas"
          className="px-3 py-1.5 text-sm border border-neutral-700 bg-neutral-900 rounded-md hover:cursor-pointer
          focus:outline-none focus:ring-2 focus:ring-purple-700 focus:border-purple-700"
        >
          <option value="createdAt" className="bg-black hover:cursor-pointer">
            Urutkan: Terbaru Dibuat
          </option>
          <option value="deadline" className="bg-black hover:cursor-pointer">
            Urutkan: Deadline Terdekat
          </option>
        </select>
      </div>
    </>
  );
}