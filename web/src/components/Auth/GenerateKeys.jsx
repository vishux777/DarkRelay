import { Key, Copy, Download } from "lucide-react";

export function GenerateKeys({ generatedKeys, onContinue, onBack }) {
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const downloadKeys = () => {
    if (!generatedKeys) return;
    const dataStr = JSON.stringify(generatedKeys, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `darkrelay-keys-${generatedKeys.userId.slice(0, 8)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50">
      <div className="bg-gradient-to-br from-[#1A1B25] to-[#121218] rounded-lg border border-[#262630] p-8 max-w-lg w-full">
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-[#35D57F] to-[#2BC76A] rounded-full flex items-center justify-center mx-auto mb-4">
            <Key size={24} className="text-white" />
          </div>
          <h2 className="font-bold text-white text-xl mb-2">
            Your Anonymous ID Generated
          </h2>
          <p className="text-white text-opacity-70 text-sm">
            Save these keys securely. You'll need them to access your account.
          </p>
        </div>

        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-white text-sm mb-2">Anonymous ID</label>
            <div className="bg-[#1F1F26] border border-[#353538] rounded-lg p-3 flex items-center justify-between">
              <span className="text-white text-sm font-mono truncate">
                {generatedKeys?.userId}
              </span>
              <button
                onClick={() => copyToClipboard(generatedKeys?.userId)}
                className="text-white text-opacity-60 hover:text-opacity-100"
              >
                <Copy size={16} />
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={downloadKeys}
            className="flex-1 bg-[#1F1F26] border border-[#353538] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#2E2E31] transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Download size={16} />
            Download Keys
          </button>
          <button
            onClick={onContinue}
            className="flex-1 bg-gradient-to-r from-[#614BFF] to-[#8360FF] text-white py-3 px-4 rounded-lg font-medium hover:from-[#553DE8] hover:to-[#7352E8] transition-all duration-200"
          >
            Continue
          </button>
        </div>

        <div className="mt-4">
          <button
            onClick={onBack}
            className="w-full text-white text-opacity-60 hover:text-opacity-100 text-sm transition-colors"
          >
            ← Back
          </button>
        </div>
      </div>
    </div>
  );
}
