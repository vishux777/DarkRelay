import { ChatWelcome } from "@/components/Chat/ChatWelcome";
import { MessageList } from "@/components/Chat/MessageList";
import { MessageComposer } from "@/components/Chat/MessageComposer";
import { Shield } from "lucide-react";

function ChatHeader({ selectedUser }) {
  return (
    <div className="p-4 border-b border-[#262630] bg-[#1A1B25]">
      <div className="flex items-center space-x-3">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#614BFF] to-[#8360FF] flex items-center justify-center">
          <Shield size={18} className="text-white" />
        </div>
        <div>
          <h3 className="font-medium text-white text-base">
            User {selectedUser.userId.slice(0, 8)}
          </h3>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[#35D57F] rounded-full"></div>
            <p className="text-[#35D57F] text-sm">End-to-end encrypted</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ChatWindow({ selectedUser, messages, messageText, setMessageText, sendMessage }) {
  if (!selectedUser) {
    return <ChatWelcome />;
  }

  const userMessages = messages[selectedUser.userId] || [];

  return (
    <div className="flex-1 bg-gradient-to-br from-[#121218] to-[#1A1B25] flex flex-col">
      <ChatHeader selectedUser={selectedUser} />
      <MessageList messages={userMessages} />
      <MessageComposer
        messageText={messageText}
        onMessageChange={setMessageText}
        onSendMessage={() => sendMessage(messageText, selectedUser.userId)}
      />
    </div>
  );
}
