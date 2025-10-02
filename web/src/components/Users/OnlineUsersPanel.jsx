import { Users, Shield } from "lucide-react";

export function OnlineUsersPanel({ onlineUsers, userStats, selectedUser, onSelectUser }) {
  return (
    <div className="w-80 bg-[#161616] flex flex-col">
      <div className="p-4 border-b border-[#262630]">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-white text-lg">Online Users</h2>
          <div className="flex items-center gap-2 bg-[#1F1F26] border border-[#353538] rounded-lg px-2 py-1">
            <div className="w-2 h-2 bg-[#35D57F] rounded-full animate-pulse"></div>
            <span className="text-white text-xs">{userStats.totalOnline || 0}</span>
          </div>
        </div>

        {userStats.totalOnline > 0 && (
          <div className="mb-4 p-3 bg-[#1A1B25] border border-[#262630] rounded-lg">
            <h4 className="text-white text-sm font-medium mb-2">Global Network</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-[#67676D]">Users Online:</span>
                <span className="text-[#35D57F] font-medium">{userStats.totalOnline}</span>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-2">
          {onlineUsers.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-[#1E1E1F] rounded-full flex items-center justify-center mx-auto mb-4">
                <Users size={24} className="text-[#67676D]" />
              </div>
              <p className="text-[#67676D] text-sm">
                {userStats.totalOnline > 0 ? "Loading users..." : "No users online yet"}
              </p>
              {userStats.totalOnline > 0 && (
                <p className="text-[#8B8B90] text-xs mt-2">
                  {userStats.totalOnline} users online globally
                </p>
              )}
            </div>
          ) : (
            <>
              {onlineUsers.map((user) => (
                <div
                  key={user.userId}
                  onClick={() => onSelectUser(user)}
                  className={`flex items-center px-3 py-3 cursor-pointer rounded-lg transition-colors ${
                    selectedUser?.userId === user.userId ? "bg-[#202021]" : "hover:bg-[#272728]"
                  }`}
                >
                  <div className="relative flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#614BFF] to-[#8360FF] flex items-center justify-center">
                      <Shield size={16} className="text-white" />
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 border-2 border-[#161616] rounded-full bg-[#35D57F]"></div>
                  </div>
                  <div className="flex-1 min-w-0 ml-3">
                    <h3 className="font-semibold text-sm text-white truncate">
                      User {user.userId.slice(0, 8)}
                    </h3>
                    <p className="text-xs text-[#8B8B90] truncate font-mono">
                      ID: {user.userId.slice(0, 16)}...
                    </p>
                  </div>
                </div>
              ))}
              {userStats.totalOnline > onlineUsers.length && (
                <div className="text-center py-3 text-xs text-[#67676D]">
                  Showing {onlineUsers.length} of {userStats.totalOnline} users
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
