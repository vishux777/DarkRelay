import { Menu, Users, MessageCircle, Shield, Wifi } from "lucide-react";

export default function TopHeader({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  selectedUser,
  showUsersList,
  setShowUsersList,
}) {
  const handleToggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleToggleUsersList = () => {
    setShowUsersList(!showUsersList);
  };

  return (
    <div className="flex-shrink-0 bg-[#161616] border-b border-[#262630] px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Left Side - Mobile Menu & Title */}
        <div className="flex items-center space-x-3">
          {/* Mobile hamburger menu */}
          <button
            onClick={handleToggleMobileMenu}
            className="lg:hidden w-8 h-8 bg-[#1F1F26] border border-[#353538] rounded-lg flex items-center justify-center text-white hover:bg-[#2E2E31] active:bg-[#1A1A1E] transition-colors duration-200"
            aria-label="Toggle menu"
          >
            <Menu size={16} strokeWidth={2} />
          </button>

          {/* Title area */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-[#614BFF] to-[#8360FF] rounded-lg flex items-center justify-center">
              <Shield size={16} className="text-white" />
            </div>
            <div>
              <h1 className="font-poppins font-semibold text-white text-base">
                {selectedUser ? (
                  <>
                    Chat with {selectedUser.displayName || `User ${selectedUser.userId.slice(0, 8)}`}
                  </>
                ) : (
                  'DarkRelay'
                )}
              </h1>
              {selectedUser && (
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#35D57F] rounded-full animate-pulse"></div>
                  <p className="font-poppins text-[#35D57F] text-xs">
                    End-to-end encrypted
                  </p>
                </div>
              )}
              {!selectedUser && (
                <p className="font-poppins text-[#67676D] text-xs">
                  Anonymous messaging platform
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Right Side - Action Buttons */}
        <div className="flex items-center space-x-2">
          {/* Connection Status */}
          <div className="hidden sm:flex items-center gap-2 bg-[#1F1F26] border border-[#353538] rounded-lg px-3 py-2">
            <Wifi size={14} className="text-[#35D57F]" />
            <span className="font-poppins text-white text-xs">Connected</span>
          </div>

          {/* Users Toggle Button - Only show on mobile when in chat */}
          {selectedUser && (
            <button
              onClick={handleToggleUsersList}
              className="md:hidden w-9 h-9 bg-[#1F1F26] border border-[#353538] rounded-lg flex items-center justify-center text-white hover:bg-[#2E2E31] active:bg-[#1A1A1E] transition-colors duration-200"
              aria-label="Toggle users list"
            >
              <Users size={16} strokeWidth={2} />
            </button>
          )}

          {/* Chat Status Indicator */}
          {selectedUser && (
            <div className="hidden md:flex items-center gap-2 bg-[#1F1F26] border border-[#353538] rounded-lg px-3 py-2">
              <MessageCircle size={14} className="text-[#35D57F]" />
              <span className="font-poppins text-white text-xs">Active Chat</span>
            </div>
          )}

          {/* Security Badge */}
          <div className="hidden lg:flex items-center gap-2 bg-gradient-to-r from-[#35D57F] to-[#2BC76A] rounded-lg px-3 py-2">
            <Shield size={14} className="text-white" />
            <span className="font-poppins text-white text-xs font-medium">Anonymous</span>
          </div>
        </div>
      </div>

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
        
        /* Mobile touch targets */
        @media (max-width: 768px) {
          button {
            min-height: 44px;
            min-width: 44px;
          }
        }
      `}</style>
    </div>
  );
}