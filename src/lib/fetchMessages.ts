export async function fetchMessages() {
  const res = await fetch("/api/discord");
  if (!res.ok) throw new Error("Failed to load messages");
  return res.json();
}
