import React, { useEffect, useState } from "react";
import Head from "next/head";

interface ChatbotProps {
  clientId?: string;
  disabled?: boolean;
  composerPlaceholder?: string;
  botName?: string;
  botDescription?: string;
}

declare global {
  interface Window {
    botpressWebChat?: {
      init: (config: any) => void;
    };
    __BOTPRESS_INITIALIZED__?: boolean;
  }
}

const Chatbot: React.FC<ChatbotProps> = ({
  clientId = "6fd615ce-6d26-47a2-8030-349d4b92422f",
  disabled = false,
  composerPlaceholder = "Ask me about ArealChain...",
  botName = "ArealChain AI Assistant",
  botDescription = "Your personal ArealChain assistant",
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    if (disabled || window.__BOTPRESS_INITIALIZED__) return;

    const initializeBotpress = () => {
      if (window.botpressWebChat && !window.__BOTPRESS_INITIALIZED__) {
        try {
          window.botpressWebChat.init({
            clientId: clientId,
            hostUrl: "https://cdn.botpress.cloud/webchat/v1",
            messagingUrl: "https://messaging.botpress.cloud",
            composerPlaceholder: composerPlaceholder,
            botName: botName,
            botConversationDescription: botDescription,
          });
          window.__BOTPRESS_INITIALIZED__ = true;
          console.log("Botpress initialized successfully");
        } catch (error) {
          console.error("Failed to initialize Botpress:", error);
        }
      }
    };

    // Poll for botpressWebChat availability
    const checkInterval = setInterval(() => {
      if (window.botpressWebChat) {
        initializeBotpress();
        clearInterval(checkInterval);
      }
    }, 100);

    // Cleanup after 10 seconds
    const timeout = setTimeout(() => {
      clearInterval(checkInterval);
    }, 10000);

    return () => {
      clearInterval(checkInterval);
      clearTimeout(timeout);
    };
  }, [disabled, clientId, composerPlaceholder, botName, botDescription]);

  if (!mounted || disabled) {
    return null;
  }

  return (
    <Head>
      <script src="https://cdn.botpress.cloud/webchat/v1/inject.js" async />
    </Head>
  );
};

export default Chatbot;
