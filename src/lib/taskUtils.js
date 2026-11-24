export function isOverdue(task) {
  return !task.done && new Date(task.deadline) < new Date();
}

export function dateFormat(iso) {
  return iso ? new Date(iso).toLocaleString("id-ID") : "-";
}