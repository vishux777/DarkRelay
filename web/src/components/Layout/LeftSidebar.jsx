import { Shield, User, Lock, Globe, LogOut } from "lucide-react";

export function LeftSidebar({ userKeys, onLogout }) {
  return (
    <div className="w-64 bg-[#0F0F11] flex flex-col">
      <div className="p-6 border-b border-[#1F1F26]">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-[#614BFF] to-[#8360FF] rounded-lg flex items-center justify-center">
            <Shield size={20} className="text-white" />
          </div>
          <div>
            <h1 className="font-bold text-white text-lg">DarkRelay</h1>
            <p className="text-[#67676D] text-xs">Anonymous Messaging</p>
          </div>
        </div>
      </div>

      <div className="p-4 border-b border-[#1F1F26]">
        <div className="bg-[#1A1B25] border border-[#262630] rounded-lg p-4">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-r from-[#35D57F] to-[#2BC76A] rounded-full flex items-center justify-center">
              <User size={18} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-white text-sm">Anonymous User</h3>
              <p className="text-[#67676D] text-xs truncate">
                ID: {userKeys?.userId?.slice(0, 16)}...
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 p-4">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#1F1F26] rounded-full flex items-center justify-center">
              <Lock size={14} className="text-[#35D57F]" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-white text-sm">End-to-End Encrypted</h4>
              <p className="text-[#67676D] text-xs">Messages secured</p>
            </div>
            <div className="w-2 h-2 bg-[#35D57F] rounded-full animate-pulse"></div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#1F1F26] rounded-full flex items-center justify-center">
              <Globe size={14} className="text-[#35D57F]" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-white text-sm">Blockchain Verified</h4>
              <p className="text-[#67676D] text-xs">Message integrity</p>
            </div>
            <div className="w-2 h-2 bg-[#35D57F] rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-[#1F1F26]">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-red-400 hover:bg-red-500 hover:bg-opacity-10 transition-colors"
        >
          <LogOut size={16} />
          <span className="text-sm">Logout</span>
        </button>
      </div>
    </div>
  );
}
