import SUI from '@asset/img/crypto/sui-white.svg';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import Input from '../utility/Input';
import { CreateAccountResult } from '@/main/types/index';
import CopyText from '@/renderer/components/utility/CopyText';
import { formatAddress } from '@/renderer/utils/format';

type AddAccountModalProps = {
  isOpen: boolean;
  onClose: () => void;
  result?: CreateAccountResult;
};

export default function AddAccountModal({
  isOpen,
  onClose,
  result,
}: AddAccountModalProps) {
  if (!result) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div
        onClick={onClose}
        className="w-full h-full bg-black/40 absolute top-0 left-0"
      />

      <div className="bg-white rounded-2xl w-full max-w-md p-6 relative shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer"
        >
          <Icon icon="mdi:close" width={20} height={20} />
        </button>

        <div className="flex flex-col items-start mb-6">
          <div className="bg-cyan-100 rounded-full p-2">
            <Icon icon="simple-icons:sui" className="w-8 h-8 text-cyan-600" />
          </div>
          <h2 className="text-lg font-semibold mt-3 text-[#181D27]">Account detail</h2>
          <span className="text-sm text-gray-500">
            Please save your recovery phrase in a safe place.
          </span>

          <span className="text-red-500">
            Don't use this account on production environment!
          </span>
        </div>

        <div className="text-base flex flex-col gap-2">
          <div>
            <b>Address</b>
            <div className="flex items-center gap-2">
              <CopyText value={result.alias} />
              <b className="text-cyan-500">{result.alias}</b>
            </div>
          </div>

          <div>
            <b>Address</b>
            <div className="flex items-center gap-2">
              <CopyText value={result.address} />
              <b className="text-cyan-500">{formatAddress(result.address)}</b>
            </div>
          </div>

          <div>
            <b>Recovery Phrase</b>
            <div className="flex items-center gap-2">
              <CopyText value={result.recoveryPhrase} />
              <b className="text-cyan-500">{result.recoveryPhrase}</b>
            </div>
          </div>

          <div>
            <b>Key scheme</b>
            <div className="flex items-center gap-2">
              <b className="text-cyan-500">{result.keyScheme}</b>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
