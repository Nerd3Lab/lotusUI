import SUI from '@asset/img/crypto/sui-white.svg';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import Input from '../utility/Input';
import Select, { Option } from '../utility/SelectOption';
import { swalFire } from '@/renderer/utils/swalfire';
import Swal from 'sweetalert2';
import { CreateAccountResult } from '@/main/types/index';
import Button from '@/renderer/components/utility/Button';

type AddAccountModalProps = {
  isOpen: boolean;
  onClose: () => void;
  openResultAccount: (result: CreateAccountResult) => void;
};

const keySchemeOptions: Option[] = [
  { value: 'ed25519', label: 'ed25519' },
  { value: 'secp256k1', label: 'secp256k1' },
];

const wordLengthOptions: Option[] = [
  { value: 'word12', label: 'word12' },
  { value: 'word15', label: 'word15' },
  { value: 'word18', label: 'word18' },
  { value: 'word21', label: 'word21' },
  { value: 'word24', label: 'word24' },
];

export default function AddAccountModal({
  isOpen,
  onClose,
  openResultAccount,
}: AddAccountModalProps) {
  const [alias, setAlias] = useState('');
  const [keyScheme, setKeyScheme] = useState('ed25519');
  const [wordLength, setWordLength] = useState('word12');
  const [faucetAmount, setFaucetAmount] = useState('1,000');

  const handleConfirm = async () => {
    swalFire().loading('Creating account...');
    const result = await window.electron.account.generateNewAccount({
      alias,
      keyScheme: keyScheme as any,
      wordLength: wordLength as any,
    });
    // console.log({ result });
    if (result) {
      Swal.close();
      swalFire().success(`Account created successfully!`);
      openResultAccount(result);
      setAlias('');
      setKeyScheme('ed25519');
      setWordLength('word12');
    } else {
      Swal.close();
      swalFire().error('Failed to create account!');
    }
  };

  if (!isOpen) return null;

  const handleAliasChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow letters for first character, and letters/numbers/hyphens/underscores after
    if (
      value === '' ||
      (/^[a-zA-Z]/.test(value) && /^[a-zA-Z][a-zA-Z0-9_-]*$/.test(value))
    ) {
      setAlias(value);
    }
  };

  const isDisabled = alias === '' || keyScheme === '' || wordLength === '';

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
            <Icon icon="ei:plus" className="w-8 h-8 text-cyan-600" />
          </div>
          <h2 className="text-lg font-semibold mt-3 text-[#181D27]">
            Add Account
          </h2>
        </div>

        <div className="space-y-4">
          <Input
            label="Alias"
            value={alias}
            required
            onChange={handleAliasChange}
            placeholder="Type your alias of account"
            error={''}
          />
          <hr className="border border-[#E9EAEB]" />
          <Select
            label="Key Scheme"
            required
            options={keySchemeOptions}
            value={keySchemeOptions.find((opt) => opt.value === keyScheme)}
            onSelect={(opt) => setKeyScheme(opt.value)}
            placeholder="Select key scheme"
          />

          <Select
            label="Word length"
            required
            options={wordLengthOptions}
            value={wordLengthOptions.find((opt) => opt.value === wordLength)}
            onSelect={(opt) => setWordLength(opt.value)}
            placeholder="Select word length"
          />
          {/* <div className="relative">
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Faucet
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={''}
                  onChange={(e) => {}}
                  className="w-full px-4 py-2 pr-16 border border-[#D1D5DB] rounded-lg focus:outline-none"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  <img src={SUI} alt="" className="w-5 h-5" />

                  <span className="text-sm font-medium text-gray-700">SUI</span>
                </div>
              </div>
            </div>
          </div> */}
        </div>

        <div className="flex justify-end">
          <Button
            onClick={handleConfirm}
            disabled={isDisabled}
            className="mt-6 w-[100px] bg-cyan-400 hover:bg-cyan-500 text-white py-2 rounded-full font-medium cursor-pointer"
          >
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
}
