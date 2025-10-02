import { Shield, Key, Upload } from "lucide-react";

export function WelcomeAuth({ onGenerate, onSwitchToImport, isGenerating, error }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50">
      <div className="bg-gradient-to-br from-[#1A1B25] to-[#121218] rounded-lg border border-[#262630] p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-[#614BFF] to-[#8360FF] rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield size={32} className="text-white" />
          </div>
          <h1 className="font-bold text-white text-2xl mb-2">
            Welcome to DarkRelay
          </h1>
          <p className="text-white text-opacity-70 text-sm">
            Anonymous, encrypted messaging with blockchain integrity
          </p>
        </div>

        {error && (
          <div className="bg-red-500 bg-opacity-20 border border-red-500 rounded-lg p-3 mb-6">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        <div className="space-y-4">
          <button
            onClick={onGenerate}
            disabled={isGenerating}
            className="w-full bg-gradient-to-r from-[#614BFF] to-[#8360FF] text-white py-3 px-4 rounded-lg font-medium hover:from-[#553DE8] hover:to-[#7352E8] transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isGenerating ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Generating...
              </>
            ) : (
              <>
                <Key size={16} />
                Generate New Anonymous ID
              </>
            )}
          </button>

          <button
            onClick={onSwitchToImport}
            className="w-full bg-[#1F1F26] border border-[#353538] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#2E2E31] transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Upload size={16} />
            Import Existing Keys
          </button>
        </div>
      </div>
    </div>
  );
}
