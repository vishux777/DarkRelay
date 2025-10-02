import { useState } from "react";
import { 
  Shield, 
  Settings, 
  LogOut, 
  Key, 
  Copy, 
  Download,
  X,
  User,
  Lock,
  Globe
} from "lucide-react";

export default function LeftSidebar({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  onLogout,
  userKeys
}) {
  const [showUserInfo, setShowUserInfo] = useState(false);

  const handleCloseMobile = () => {
    setIsMobileMenuOpen(false);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      // Could add a toast notification here
    });
  };

  const downloadKeys = () => {
    if (!userKeys) return;
    
    const dataStr = JSON.stringify(userKeys, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `darkrelay-keys-${userKeys.userId.slice(0, 8)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const UserInfoModal = () => {
    if (!showUserInfo) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50">
        <div className="bg-gradient-to-br from-[#1A1B25] to-[#121218] rounded-lg border border-[#262630] p-6 max-w-md w-full">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-poppins font-bold text-white text-lg">
              Your Anonymous Identity
            </h2>
            <button
              onClick={() => setShowUserInfo(false)}
              className="w-8 h-8 bg-[#1F1F26] rounded-full flex items-center justify-center hover:bg-[#262630] transition-colors"
            >
              <X size={16} className="text-white" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-white text-sm font-poppins mb-2">
                Anonymous ID
              </label>
              <div className="bg-[#1F1F26] border border-[#353538] rounded-lg p-3 flex items-center justify-between">
                <span className="text-white text-sm font-mono truncate">
                  {userKeys?.userId}
                </span>
                <button
                  onClick={() => copyToClipboard(userKeys?.userId)}
                  className="text-white text-opacity-60 hover:text-opacity-100 transition-colors"
                >
                  <Copy size={16} />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-white text-sm font-poppins mb-2">
                Public Key
              </label>
              <div className="bg-[#1F1F26] border border-[#353538] rounded-lg p-3 flex items-center justify-between">
                <span className="text-white text-sm font-mono truncate">
                  {userKeys?.publicKey}
                </span>
                <button
                  onClick={() => copyToClipboard(userKeys?.publicKey)}
                  className="text-white text-opacity-60 hover:text-opacity-100 transition-colors"
                >
                  <Copy size={16} />
                </button>
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={downloadKeys}
              className="flex-1 bg-[#1F1F26] border border-[#353538] text-white py-3 px-4 rounded-lg font-poppins font-medium hover:bg-[#2E2E31] transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Download size={16} />
              Download Keys
            </button>
            <button
              onClick={() => setShowUserInfo(false)}
              className="flex-1 bg-gradient-to-r from-[#614BFF] to-[#8360FF] text-white py-3 px-4 rounded-lg font-poppins font-medium hover:from-[#553DE8] hover:to-[#7352E8] transition-all duration-200"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="w-64 bg-[#0F0F11] flex flex-col">
        {/* Logo/Header */}
        <div className="p-6 border-b border-[#1F1F26]">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-[#614BFF] to-[#8360FF] rounded-lg flex items-center justify-center">
                <Shield size={20} className="text-white" />
              </div>
              <div>
                <h1 className="font-poppins font-bold text-white text-lg">
                  DarkRelay
                </h1>
                <p className="font-poppins text-[#67676D] text-xs">
                  Anonymous Messaging
                </p>
              </div>
            </div>
            {/* Mobile close button */}
            <button
              onClick={handleCloseMobile}
              className="lg:hidden w-8 h-8 bg-[#1F1F26] rounded-full flex items-center justify-center hover:bg-[#262630] transition-colors"
            >
              <X size={16} className="text-white" />
            </button>
          </div>
        </div>

        {/* User Info Section */}
        <div className="p-4 border-b border-[#1F1F26]">
          <div className="bg-[#1A1B25] border border-[#262630] rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-r from-[#35D57F] to-[#2BC76A] rounded-full flex items-center justify-center">
                <User size={18} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-poppins font-medium text-white text-sm">
                  Anonymous User
                </h3>
                <p className="font-poppins text-[#67676D] text-xs truncate">
                  ID: {userKeys?.userId?.slice(0, 16)}...
                </p>
              </div>
            </div>
            
            <button
              onClick={() => setShowUserInfo(true)}
              className="w-full bg-[#1F1F26] border border-[#353538] text-white py-2 px-3 rounded-lg font-poppins text-sm hover:bg-[#2E2E31] transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Key size={14} />
              View Keys
            </button>
          </div>
        </div>

        {/* Security Status */}
        <div className="p-4 border-b border-[#1F1F26]">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#1F1F26] rounded-full flex items-center justify-center">
                <Lock size={14} className="text-[#35D57F]" />
              </div>
              <div className="flex-1">
                <h4 className="font-poppins font-medium text-white text-sm">
                  End-to-End Encrypted
                </h4>
                <p className="font-poppins text-[#67676D] text-xs">
                  Messages secured with TweetNaCl
                </p>
              </div>
              <div className="w-2 h-2 bg-[#35D57F] rounded-full animate-pulse"></div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#1F1F26] rounded-full flex items-center justify-center">
                <Globe size={14} className="text-[#35D57F]" />
              </div>
              <div className="flex-1">
                <h4 className="font-poppins font-medium text-white text-sm">
                  Blockchain Verified
                </h4>
                <p className="font-poppins text-[#67676D] text-xs">
                  Message integrity on Ethereum
                </p>
              </div>
              <div className="w-2 h-2 bg-[#35D57F] rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 p-4">
          <nav className="space-y-2">
            <div className="mb-4">
              <h3 className="font-poppins text-xs font-medium text-[#67676D] tracking-wide mb-3">
                FEATURES
              </h3>
              
              <div className="space-y-1">
                <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-[#1A1B25] border border-[#262630]">
                  <Shield size={16} className="text-[#35D57F]" />
                  <span className="font-poppins text-white text-sm">Anonymous Chat</span>
                </div>
                
                <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-[#67676D] hover:bg-[#1A1B25] hover:text-white transition-colors cursor-pointer">
                  <Lock size={16} />
                  <span className="font-poppins text-sm">Message Encryption</span>
                </div>
                
                <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-[#67676D] hover:bg-[#1A1B25] hover:text-white transition-colors cursor-pointer">
                  <Globe size={16} />
                  <span className="font-poppins text-sm">Blockchain Integrity</span>
                </div>
              </div>
            </div>
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-[#1F1F26] space-y-3">
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-[#67676D] hover:bg-[#1A1B25] hover:text-white transition-colors">
            <Settings size={16} />
            <span className="font-poppins text-sm">Settings</span>
          </button>
          
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-red-400 hover:bg-red-500 hover:bg-opacity-10 transition-colors"
          >
            <LogOut size={16} />
            <span className="font-poppins text-sm">Logout</span>
          </button>
        </div>
      </div>

      <UserInfoModal />

      <style jsx>{`
        .font-poppins {
          font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </>
  );
}