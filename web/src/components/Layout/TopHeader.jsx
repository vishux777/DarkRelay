import { Shield, Wifi } from "lucide-react";

export function TopHeader({ selectedUser }) {
  return (
    <div className="flex-shrink-0 bg-[#161616] border-b border-[#262630] px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-[#614BFF] to-[#8360FF] rounded-lg flex items-center justify-center">
            <Shield size={16} className="text-white" />
          </div>
          <div>
            <h1 className="font-semibold text-white text-base">
              {selectedUser ? `Chat with User ${selectedUser.userId.slice(0, 8)}` : "DarkRelay"}
            </h1>
            <p className="text-[#67676D] text-xs">
              Anonymous messaging platform
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-[#1F1F26] border border-[#353538] rounded-lg px-3 py-2">
          <Wifi size={14} className="text-[#35D57F]" />
          <span className="text-white text-xs">Connected</span>
        </div>
      </div>
    </div>
  );
}
