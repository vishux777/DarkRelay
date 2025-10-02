import { useState, useEffect } from "react";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userKeys, setUserKeys] = useState(null);
  const [sessionToken, setSessionToken] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Check for existing keys in localStorage
  useEffect(() => {
    const savedKeys = localStorage.getItem("darkrelay_keys");
    if (savedKeys) {
      try {
        const keys = JSON.parse(savedKeys);
        setUserKeys(keys);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Failed to parse saved keys:", error);
        localStorage.removeItem("darkrelay_keys");
        setShowAuthModal(true);
      }
    } else {
      setShowAuthModal(true);
    }
  }, []);

  const registerUserOnline = async (keys) => {
    if (!keys) return;
    try {
      const response = await fetch("/api/users/online", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: keys.userId,
          publicKey: keys.publicKey,
          action: "join",
          countryCode: null,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setSessionToken(data.sessionToken);
        console.log("User registered online:", data);
      }
    } catch (error) {
      console.error("Error registering user online:", error);
    }
  };

  // Set up session pings and online registration
  useEffect(() => {
    if (isAuthenticated && userKeys) {
      registerUserOnline(userKeys);

      const pingInterval = setInterval(async () => {
        if (sessionToken) {
          try {
            await fetch("/api/users/session", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                userId: userKeys.userId,
                action: "ping",
                sessionToken: sessionToken,
              }),
            });
          } catch (error) {
            console.error("Error pinging session:", error);
          }
        }
      }, 30000); // Ping every 30 seconds

      return () => {
        clearInterval(pingInterval);
        if (userKeys?.userId) {
          fetch("/api/users/online", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userId: userKeys.userId,
              publicKey: userKeys.publicKey,
              action: "leave",
            }),
          }).catch((error) => console.error("Error marking user offline:", error));
        }
      };
    }
  }, [isAuthenticated, userKeys, sessionToken]);

  const handleLogin = async (keys) => {
    setUserKeys(keys);
    setIsAuthenticated(true);
    setShowAuthModal(false);
    localStorage.setItem("darkrelay_keys", JSON.stringify(keys));
    await registerUserOnline(keys);
  };

  const handleLogout = async () => {
    if (userKeys?.userId) {
      try {
        await fetch("/api/users/online", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: userKeys.userId,
            publicKey: userKeys.publicKey,
            action: "leave",
          }),
        });
      } catch (error) {
        console.error("Error during logout:", error);
      }
    }

    setIsAuthenticated(false);
    setUserKeys(null);
    setSessionToken(null);
    localStorage.removeItem("darkrelay_keys");
    setShowAuthModal(true);
  };

  return { isAuthenticated, userKeys, showAuthModal, handleLogin, handleLogout };
}
