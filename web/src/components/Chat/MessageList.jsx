import { Lock, Shield } from "lucide-react";

export function MessageList({ messages }) {
  if (messages.length === 0) {
    return (
      <div className="flex-1 overflow-y-auto p-4 flex flex-col items-center justify-center">
        <div className="w-16 h-16 bg-[#1F1F26] rounded-full flex items-center justify-center mb-4">
          <Shield size={24} className="text-[#35D57F]" />
        </div>
        <h3 className="font-medium text-white text-lg mb-2">
          Start encrypted conversation
        </h3>
        <p className="text-white text-opacity-60 text-sm text-center">
          Send your first message to begin an end-to-end encrypted chat.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4">
      <div className="space-y-4">
        {messages.map((message) => (
          <div key={message.id} className="flex justify-end">
            <div className="max-w-xs lg:max-w-md">
              <div className="flex items-baseline space-x-2 mb-1">
                <span className="font-medium text-white text-sm">You</span>
                <span className="text-white text-opacity-70 text-xs">
                  {message.timestamp}
                </span>
              </div>
              <div className="bg-gradient-to-r from-[#614BFF] to-[#8360FF] text-white rounded-lg p-3">
                <p className="text-sm leading-relaxed">{message.content}</p>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-1">
                    <Lock size={12} className="text-[#35D57F]" />
                    <span className="text-xs text-[#35D57F]">Encrypted</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
