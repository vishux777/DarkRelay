import { useState, useEffect } from "react";

export function useUsers(isAuthenticated, currentUserKeys) {
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [userStats, setUserStats] = useState({ totalOnline: 0, showing: 0 });

  const fetchOnlineUsers = async () => {
    if (!isAuthenticated) return;
    try {
      const response = await fetch("/api/users/online");
      if (response.ok) {
        const data = await response.json();
        const otherUsers = (data.users || []).filter(
          (user) => user.userId !== currentUserKeys?.userId
        );
        setOnlineUsers(otherUsers);
        setUserStats(data.stats || { totalOnline: 0, showing: 0 });
      }
    } catch (error) {
      console.error("Error fetching online users:", error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchOnlineUsers();
      const userListInterval = setInterval(fetchOnlineUsers, 15000);
      return () => clearInterval(userListInterval);
    } else {
      setOnlineUsers([]);
      setUserStats({ totalOnline: 0, showing: 0 });
    }
  }, [isAuthenticated, currentUserKeys]);

  return { onlineUsers, userStats, fetchOnlineUsers };
}
