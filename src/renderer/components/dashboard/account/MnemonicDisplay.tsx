import { Icon } from '@iconify/react';
import { useState } from 'react';

const MnemonicDisplay = () => {
  const mnemonic =
    'sustain culture alert awake relax attitude acid local farm butter coffee glad';
  const hdPath = "m44'60'0'0account_index";
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(mnemonic);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white border rounded-xl px-6 py-4 flex justify-between items-start gap-6 mt-4 mb-5 border-gray-200 shadow-xs">
      <div className="flex-1">
        <div className=" text-gray-600 mb-1">MNEMONIC</div>
        <div className="flex items-center gap-2">
          <span className="text-gray-800 text-sm leading-relaxed break-all">
            {mnemonic}
          </span>
          <button
            onClick={handleCopy}
            className="p-1 hover:bg-gray-100 rounded transition flex gap-1 items-center cursor-pointer"
            title="Copy mnemonic"
          >
            <Icon icon="mdi:content-copy" className="text-gray-500 text-lg" />
            {copied && <div className="text-xs text-green-500">Copied!</div>}
          </button>
        </div>
      </div>

      <div className="text-right">
        <div className="font-medium text-gray-700 mb-1">HD PATH</div>
        <div className="text-gray-600 text-sm">{hdPath}</div>
      </div>
    </div>
  );
};

export default MnemonicDisplay;
