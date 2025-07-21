"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
} from "./ui/dialog";
import Image from "next/image";

interface Message {
  id: string;
  content: string;
  createdAt: string;
  url?: string | null;
}

export default function DiscordMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedMsg, setSelectedMsg] = useState<Message | null>(null);

  useEffect(() => {
    fetch("/api/discord")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setMessages(data);
        } else {
          setError("Invalid response from server");
        }
      })
      .catch(() => setError("Failed to load messages"));
  }, []);

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl text-center font-bold mb-4">Announcements</h2>

      <div className="space-y-3">
        {messages.map((msg) => (
          <Dialog key={msg.id}>
            <DialogTrigger asChild>
              <div className="cursor-pointer border border-[#F4B448]/20 bg-black/50 p-4 rounded hover:shadow transition backdrop-blur-3xl">
                <p className="truncate">{msg.content}</p>
                <p className="text-sm text-white">
                  {new Date(msg.createdAt).toLocaleString()}
                </p>
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogDescription>
                  {new Date(msg.createdAt).toLocaleString()}
                </DialogDescription>
              </DialogHeader>
              <div className="text-[#F4B448] mb-4">{msg.content}</div>
              {msg.url && (
                <Image
                  src={msg.url}
                  alt="Discord Attachment"
                  className="rounded w-full h-auto border"
                  width={250}
                  height={250}
                />
              )}
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
}