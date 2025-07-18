"use client";

import { useEffect, useState } from "react";

interface Message {
  id: string;
  content: string;
  author: string;
  createdAt: string;
}

export default function DiscordMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/discord")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setMessages(data);
        } else {
          setError("Invalid response from server");
          console.error("Invalid response:", data);
        }
      })
      .catch(() => setError("Failed to load messages"));
  }, []);

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="space-y-4">
      {messages.map((msg) => (
        <div key={msg.id} className="p-4 border rounded">
          <div className="font-semibold">{msg.author}</div>
          <div>{msg.content}</div>
          <div className="text-sm text-gray-500">
            {new Date(msg.createdAt).toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
}
