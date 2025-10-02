import { useState } from "react";
import { WelcomeAuth } from "@/components/Auth/WelcomeAuth";
import { GenerateKeys } from "@/components/Auth/GenerateKeys";
import { ImportKeys } from "@/components/Auth/ImportKeys";

export function AuthModal({ onLogin }) {
  const [authMode, setAuthMode] = useState("welcome"); // welcome, generate, import
  const [generatedKeys, setGeneratedKeys] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");

  const generateNewId = async () => {
    setIsGenerating(true);
    setError("");
    try {
      const response = await fetch("/api/auth/generate-id", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Failed to generate ID");
      const keys = await response.json();
      setGeneratedKeys(keys);
      setAuthMode("generate");
    } catch (err) {
      setError("Failed to generate anonymous ID. Please try again.");
      setAuthMode("welcome");
    } finally {
      setIsGenerating(false);
    }
  };
  
  const handleImportKeys = (keys) => {
      try {
          const parsedKeys = JSON.parse(keys);
          if (!parsedKeys.publicKey || !parsedKeys.privateKey || !parsedKeys.userId) {
            throw new Error("Invalid key format");
          }
          onLogin(parsedKeys);
        } catch (err) {
          setError("Invalid key format. Please check your keys and try again.");
        }
  };

  if (authMode === "generate") {
    return (
      <GenerateKeys
        generatedKeys={generatedKeys}
        onContinue={() => onLogin(generatedKeys)}
        onBack={() => setAuthMode("welcome")}
      />
    );
  }

  if (authMode === "import") {
    return (
      <ImportKeys
        onImport={handleImportKeys}
        onBack={() => {
            setError("");
            setAuthMode("welcome");
        }}
        error={error}
      />
    );
  }

  return (
    <WelcomeAuth
      onGenerate={generateNewId}
      onSwitchToImport={() => setAuthMode("import")}
      isGenerating={isGenerating}
      error={error}
    />
  );
}
