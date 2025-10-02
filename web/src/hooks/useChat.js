import { useState } from "react";

export function useChat(currentUserKeys) {
  const [messages, setMessages] = useState({});
  const [messageText, setMessageText] = useState("");

  const sendMessage = (content, recipientId) => {
    if (!content.trim() || !currentUserKeys) return;

    const newMessage = {
      id: Date.now(),
      content,
      timestamp: new Date().toLocaleTimeString(),
      senderId: currentUserKeys.userId,
      encrypted: true,
    };

    setMessages((prev) => ({
      ...prev,
      [recipientId]: [...(prev[recipientId] || []), newMessage],
    }));

    setMessageText("");
  };

  const resetMessages = () => {
    setMessages({});
  }

  return { messages, messageText, setMessageText, sendMessage, resetMessages };
}
