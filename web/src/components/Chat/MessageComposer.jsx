import { Lock, Send } from "lucide-react";

export function MessageComposer({ messageText, onMessageChange, onSendMessage }) {
  return (
    <div className="p-4 bg-[#1D1D25]">
      <div className="bg-[#1D1D25] border border-[#282835] rounded-lg p-3">
        <textarea
          value={messageText}
          onChange={(e) => onMessageChange(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              onSendMessage();
            }
          }}
          placeholder="Type an encrypted message..."
          className="w-full bg-transparent text-white placeholder-gray-400 resize-none focus:outline-none text-sm leading-relaxed min-h-[40px]"
          rows="1"
        />
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-1 text-xs text-[#35D57F]">
            <Lock size={12} />
            <span>Encrypted</span>
          </div>
          <button
            onClick={onSendMessage}
            disabled={!messageText.trim()}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full font-semibold text-sm transition-all duration-200 ${
              messageText.trim()
                ? "bg-gradient-to-r from-[#614BFF] to-[#8360FF] text-white hover:from-[#553DE8] hover:to-[#7352E8]"
                : "bg-gray-600 text-gray-400 cursor-not-allowed opacity-40"
            }`}
          >
            <Send size={14} />
            <span>Send</span>
          </button>
        </div>
      </div>
    </div>
  );
}
