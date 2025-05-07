import { useProjectList } from '@/renderer/hooks/useProjectList';
import { useSuiVersion } from '@/renderer/hooks/useSuiversion';
import { useAppDispatch } from '@/renderer/states/hooks';
import { ProjectSlide } from '@/renderer/states/project/reducer';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/utility/Button';
import Input from '../components/utility/Input';

function ProjectCreate() {
  const navigate = useNavigate();
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [error, setError] = useState({ name: '' });
  const [isFullNode, setIsFullNode] = useState<boolean>(true);
  const [isAutoReset, setIsAutoReset] = useState<boolean>(false);
  const [epochDuration, setEpochDuration] = useState<string>('60000');
  // const [suiVersion, setSuiVersion] = useState<string>('Testnet-v1.47.0');

  const {
    data: projectLists,
    loading: projectListsLoading,
    error: projectListsError,
  } = useProjectList();

  const dispatch = useAppDispatch();

  const onSubmit = async () => {
    if (disabled) {
      return;
    }

    if (!name.trim()) {
      setError({ name: 'Project name is required' });
      return;
    }

    const result = await window.electron.project.createProject({
      name: name.trim(),
      fullnode: isFullNode,
      epochDuration: parseInt(epochDuration, 10),
      isAutoReset: isAutoReset,
      description: description.trim(),
    });

    console.log({ result });

    if (!result) {
      return;
    }

    // dispatch(ProjectSlide.actions.selectProject(result));

    navigate('/');
  };

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value.trim().replace(/ /g, ''));

    // check name
    const existingProject = projectLists.find(
      (project) => project.configJson.name === e.target.value.trim(),
    );

    if (existingProject) {
      setError({ name: 'Project name already exists' });
    } else {
      setError({ name: '' });
    }
  };

  const disabled = Boolean(error.name || !name);

  return (
    <div className="w-full flex flex-col gap-6 max-w-xl mx-auto">
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
        <span className="text-sm text-gray-600">
          Create your local sui node development
        </span>
      </div>
      <Input
        label="Project name"
        required
        value={name}
        onChange={onChangeName}
        placeholder="Type your project name"
        error={error.name}
      />

      <Input
        label="Description"
        required
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
        placeholder="Type your description of project"
      />
      {/*
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
      </div> */}

      {/* Epoch Duration */}
      <div>
        <label className="text-gray-800 font-medium mb-1 block">
          Epoch duration
        </label>
        <div className="flex items-center">
          <span className="bg-gray-100 px-4 py-2 rounded-l-xl text-gray-700 text-sm">
            Milli Seconds
          </span>
          <Input
            value={epochDuration}
            onChange={(e) => setEpochDuration(e.target.value)}
            type="number"
            className="rounded-r-xl"
          />
        </div>
      </div>
      {/* <Input
        label="Sui version"
        required
        value={suiVersion}
        onChange={(e) => setSuiVersion(e.target.value)}
      /> */}

      {/* <div className="grid grid-cols-2 gap-4">
        <div
          className={`border-2 px-4 py-4 rounded-2xl flex gap-4 items-center transition-all cursor-pointer hover:border-cyan-500 ${
            isFullNode ? 'border-cyan-500 border' : 'border-gray-200'
          }`}
          onClick={() => setIsFullNode(true)}
        >
          <div className={`p-2 rounded-full  ${isFullNode ? 'bg-black text-cyan-500' : 'bg-gray-100 text-cyan-500'}`}>
            <Icon icon="token:suip" className="text-4xl" />
          </div>
          <div>
            <b className="font-semibold text-gray-800 mt-2">Fullnode</b>
            <p>Running local sui fullnode</p>
          </div>
        </div>

        <div
          className={`border-2 px-4 py-4 rounded-2xl flex gap-4 items-center transition-all cursor-pointer hover:border-cyan-500 ${
            !isFullNode ? 'border-cyan-500' : 'border-gray-200'
          }`}
          onClick={() => setIsFullNode(false)}
        >
          <div
            className={`p-2 rounded-full  ${!isFullNode ? 'bg-black text-cyan-500' : 'bg-gray-100 text-cyan-500'}`}
          >
            <Icon icon="simple-icons:sui" className="text-4xl" />
          </div>
          <div>
            <b className="font-semibold text-gray-800 mt-2">Lightnode</b>
            <p>Running local sui lighnode</p>
          </div>
        </div>
      </div> */}

      {/* <div className="grid grid-cols-2 gap-4">
        <div
          className={`border-2 px-4 py-4 rounded-2xl flex gap-4 items-center transition-all cursor-pointer hover:border-cyan-500 ${
            isAutoReset ? 'border-cyan-500 border' : 'border-gray-200'
          }`}
          onClick={() => setIsAutoReset(true)}
        >
          <div
            className={`p-2 rounded-full  ${isFullNode ? 'bg-black text-cyan-500' : 'bg-gray-100 text-cyan-500'}`}
          >
            <Icon icon="token:suip" className="text-4xl" />
          </div>
          <div>
            <b className="font-semibold text-gray-800 mt-2">Auto Reset</b>
            <p>Auto reset all data when rerun local node</p>
          </div>
        </div>

        <div
          className={`border-2 px-4 py-4 rounded-2xl flex gap-4 items-center transition-all cursor-pointer hover:border-cyan-500 ${
            !isAutoReset ? 'border-cyan-500' : 'border-gray-200'
          }`}
          onClick={() => setIsAutoReset(false)}
        >
          <div
            className={`p-2 rounded-full  ${!isFullNode ? 'bg-black text-cyan-500' : 'bg-gray-100 text-cyan-500'}`}
          >
            <Icon icon="simple-icons:sui" className="text-4xl" />
          </div>
          <div>
            <b className="font-semibold text-gray-800 mt-2">Persist</b>
            <p>Keep all data when rerun local node</p>
          </div>
        </div>
      </div> */}

      {/* Submit Button */}
      <div className="flex justify-end">
        <Button onClick={onSubmit} disabled={disabled}>
          Create project →
        </Button>
      </div>
    </div>
  );
}

export default ProjectCreate;
