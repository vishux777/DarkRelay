import { useState } from "react";
import { Upload } from "lucide-react";

export function ImportKeys({ onImport, onBack, error }) {
  const [importedKeys, setImportedKeys] = useState("");

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50">
      <div className="bg-gradient-to-br from-[#1A1B25] to-[#121218] rounded-lg border border-[#262630] p-8 max-w-md w-full">
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-[#614BFF] to-[#8360FF] rounded-full flex items-center justify-center mx-auto mb-4">
            <Upload size={24} className="text-white" />
          </div>
          <h2 className="font-bold text-white text-xl mb-2">Import Your Keys</h2>
          <p className="text-white text-opacity-70 text-sm">
            Paste your previously generated keys to access your account.
          </p>
        </div>

        {error && (
          <div className="bg-red-500 bg-opacity-20 border border-red-500 rounded-lg p-3 mb-4">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        <div className="mb-6">
          <label className="block text-white text-sm mb-2">Keys (JSON format)</label>
          <textarea
            value={importedKeys}
            onChange={(e) => setImportedKeys(e.target.value)}
            placeholder='{"userId": "...", "publicKey": "...", "privateKey": "..."}'
            className="w-full bg-[#1F1F26] border border-[#353538] rounded-lg p-3 text-white placeholder-gray-400 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#614BFF] focus:ring-opacity-30 focus:border-[#614BFF] transition-all duration-200"
            rows="6"
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={onBack}
            className="flex-1 bg-[#1F1F26] border border-[#353538] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#2E2E31] transition-all duration-200"
          >
            Back
          </button>
          <button
            onClick={() => onImport(importedKeys)}
            disabled={!importedKeys.trim()}
            className="flex-1 bg-gradient-to-r from-[#614BFF] to-[#8360FF] text-white py-3 px-4 rounded-lg font-medium hover:from-[#553DE8] hover:to-[#7352E8] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Import & Login
          </button>
        </div>
      </div>
    </div>
  );
}
