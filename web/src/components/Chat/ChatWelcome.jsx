import { MessageCircle } from "lucide-react";

export function ChatWelcome() {
  return (
    <div className="flex items-center justify-center h-full flex-1 bg-gradient-to-br from-[#121218] to-[#1A1B25]">
      <div className="text-center">
        <div className="w-20 h-20 bg-[#1F1F26] rounded-full flex items-center justify-center mx-auto mb-6">
          <MessageCircle size={32} className="text-white text-opacity-40" />
        </div>
        <h3 className="font-medium text-white text-xl mb-3">
          Select a user to start messaging
        </h3>
        <p className="text-white text-opacity-60 max-w-md">
          Choose someone from the online users list to begin an encrypted conversation.
        </p>
      </div>
    </div>
  );
}
