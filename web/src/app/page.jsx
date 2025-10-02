"use client";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useUsers } from "@/hooks/useUsers";
import { useChat } from "@/hooks/useChat";
import { AuthModal } from "@/components/Auth/AuthModal";
import { LeftSidebar } from "@/components/Layout/LeftSidebar";
import { TopHeader } from "@/components/Layout/TopHeader";
import { OnlineUsersPanel } from "@/components/Users/OnlineUsersPanel";
import { ChatWindow } from "@/components/Chat/ChatWindow";

export default function DarkRelayApp() {
  const [selectedUser, setSelectedUser] = useState(null);

  const { isAuthenticated, userKeys, showAuthModal, handleLogin, handleLogout: authLogout } = useAuth();
  const { onlineUsers, userStats } = useUsers(isAuthenticated, userKeys);
  const { messages, messageText, setMessageText, sendMessage, resetMessages } = useChat(userKeys);

  const handleLogout = () => {
    authLogout();
    setSelectedUser(null);
    resetMessages();
  };

  if (showAuthModal || !isAuthenticated) {
    return <AuthModal onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen bg-gray-900 overflow-hidden">
      <LeftSidebar userKeys={userKeys} onLogout={handleLogout} />

      <div className="flex-1 flex flex-col">
        <TopHeader selectedUser={selectedUser} />
        <div className="flex-1 flex">
          <OnlineUsersPanel
            onlineUsers={onlineUsers}
            userStats={userStats}
            selectedUser={selectedUser}
            onSelectUser={setSelectedUser}
          />
          <ChatWindow
            selectedUser={selectedUser}
            messages={messages}
            messageText={messageText}
            setMessageText={setMessageText}
            sendMessage={sendMessage}
          />
        </div>
      </div>

      <style jsx>{`
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}
