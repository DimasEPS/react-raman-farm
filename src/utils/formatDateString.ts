export default function formatDateString(value: string | Date | undefined): string {
  if (!value) return ""
  const date = typeof value === "string" ? new Date(value) : value
  return !isNaN(date.getTime()) ? date.toLocaleDateString() : ""
}