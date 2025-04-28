import { Icon } from '@iconify/react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/utility/Button';
import Input from '../components/utility/Input';

function ProjectCreate() {
  const navigate = useNavigate();
  const [name, setName] = useState<string>('');
  const [error, setError] = useState({ projectName: '' });
  const [isFullNode, setIsFullNode] = useState<boolean>(false);
  const [epochDuration, setEpochDuration] = useState<string>('60');
  const [suiVersion, setSuiVersion] = useState<string>('Testnet-v1.47.0');

  const onSubmit = () => {
    if (!name.trim()) {
      setError({ projectName: 'Project name is required' });
      return;
    }
    console.log('submit', { name, isFullNode, epochDuration, suiVersion });
  };

  return (
    <div className="w-full flex flex-col gap-6 max-w-xl">
      <Link to="/">
        <div className="text-cyan-700 cursor-pointer flex items-center gap-2">
          <Icon icon="grommet-icons:form-previous-link" className="text-2xl" />
          <p className="text-sm font-semibold">Go back</p>
        </div>
      </Link>
      <div>
        <h1 className="text-gray-900 font-semibold text-2xl">
          Create New Project
        </h1>
        <span className="text-sm text-gray-600">input information</span>
      </div>
      <Input
        label="Project name"
        required
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          setError({ projectName: '' });
        }}
        placeholder="Type your project name"
        error={error.projectName}
      />
      <div className="flex items-center justify-between">
        <label className="text-gray-800 font-medium">Node config</label>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-700">Full node</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={isFullNode}
              onChange={() => setIsFullNode(!isFullNode)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-cyan-500"></div>
            <div
              className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full 
              peer-checked:translate-x-5 transition-transform"
            ></div>
          </label>
        </div>
      </div>

      {/* Epoch Duration */}
      <div>
        <label className="text-gray-800 font-medium mb-1 block">
          Epoch duration
        </label>
        <div className="flex items-center">
          <span className="bg-gray-100 px-4 py-2 rounded-l-xl text-gray-700 text-sm">
            Seconds
          </span>
          <Input
            value={epochDuration}
            onChange={(e) => setEpochDuration(e.target.value)}
            type="number"
            className="rounded-r-xl"
          />
        </div>
      </div>
      <Input
        label="Sui version"
        required
        value={suiVersion}
        onChange={(e) => setSuiVersion(e.target.value)}
      />
      <div className="flex gap-4">
        <div className="flex flex-col border rounded-2xl px-6 py-5 cursor-pointer hover:border-cyan-500 transition-all">
          <Icon
            icon="iconamoon:file-add-duotone"
            className="text-3xl text-cyan-500 mb-2"
          />
          <b className="font-semibold text-gray-800">Quick start</b>
          <p className="text-gray-600 text-sm">
            Spin up a demo chain in seconds
          </p>
        </div>
        <div className="flex flex-col border rounded-2xl px-6 py-5 cursor-pointer hover:border-cyan-500 transition-all">
          <Icon
            icon="iconamoon:file-add-duotone"
            className="text-3xl text-cyan-500 mb-2"
          />
          <b className="font-semibold text-gray-800">Quick start</b>
          <p className="text-gray-600 text-sm">
            Spin up a demo chain in seconds
          </p>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <Button onClick={onSubmit}>Create project →</Button>
      </div>
    </div>
  );
}

export default ProjectCreate;
