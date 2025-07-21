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

  if (error) return <p className="text-red-500 text-center p-4">{error}</p>;

  return (
    <div className="w-full min-h-screen px-4 sm:px-6 lg:px-8 py-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-xl sm:text-2xl lg:text-3xl text-center font-bold mb-6 text-white">
          Announcements
        </h2>

        <div className="grid gap-3 sm:gap-4">
          {messages.map((msg) => (
            <Dialog key={msg.id}>
              <DialogTrigger asChild>
                <div className="cursor-pointer border border-[#F4B448]/20 bg-black/50 p-3 sm:p-4 lg:p-5 rounded-lg hover:shadow-lg hover:border-[#F4B448]/40 transition-all duration-200 backdrop-blur-3xl hover:bg-black/60">
                  <p className="text-sm sm:text-base truncate text-white mb-2">
                    {msg.content}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-400">
                    {new Date(msg.createdAt).toLocaleString()}
                  </p>
                </div>
              </DialogTrigger>

              <DialogContent className="w-[95vw] max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogDescription className="text-sm sm:text-base text-gray-400">
                    {new Date(msg.createdAt).toLocaleString()}
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                  <div className="text-[#F4B448] text-sm sm:text-base leading-relaxed whitespace-pre-wrap">
                    {msg.content}
                  </div>

                  {msg.url && (
                    <div className="relative w-full">
                      <Image
                        src={msg.url}
                        alt="Discord Attachment"
                        className="rounded-lg w-full h-auto border border-gray-600 object-contain"
                        width={600}
                        height={400}
                        sizes="(max-width: 768px) 95vw, (max-width: 1024px) 80vw, 600px"
                        priority={false}
                      />
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>

        {messages.length === 0 && !error && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#F4B448] mx-auto mb-4"></div>
            <p className="text-gray-400">Loading announcements...</p>
          </div>
        )}
      </div>
    </div>
  );
}
