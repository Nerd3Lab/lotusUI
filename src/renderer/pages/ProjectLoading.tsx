import { NodeRunLogInterface } from '@/main/types/index';
import LoadingDots from '@/renderer/components/utility/LoadingDots';
import { useAppDispatch } from '@/renderer/states/hooks';
import {
  ProjectSlide,
  useProjectState,
} from '@/renderer/states/project/reducer';
import LoadingImg from '@asset/img/loadingImg.png';
import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function ProjectLoading() {
  const project = useProjectState();

  const [logs, setLogs] = useState<string[]>([
    'Checking for existing project...',
  ]);
  const [isError, setisError] = useState(false);
  const [isSuiNotInstalled, setIsSuiNotInstalled] = useState(false);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const addLogs = (log: string) => {
    setLogs((prevLogs) => [...prevLogs, log]);
  };

  const checkingProject = async () => {
    if (!project?.configJson.name) {
      addLogs(`Not found project`);
      setisError(true);
      navigate('/');
      return;
    }
    const projectGet = await window.electron.project.getProject(
      project.configJson.name,
    );

    if (!projectGet) {
      addLogs(`Project : ${project.configJson.name} not found`);
      setisError(true);
      return;
    }

    const result = await window.electron.node.runProject(
      project.configJson.name,
    );

    if (result && result.isSuiNotInstalled) {
      addLogs(result.error);
      setisError(true);
      setIsSuiNotInstalled(true);
      return;
    }

    if (result && result.error) {
      addLogs(result.error);
      setisError(true);
      return;
    }

    addLogs('Project found, loading Sui local development...');
  };

  useEffect(() => {
    checkingProject();

    window.electron.ipcRenderer.on('node-run-log', (message) => {
      const {
        message: messageLog,
        loading,
        running,
        error,
      } = message as NodeRunLogInterface;

      dispatch(ProjectSlide.actions.setStatus({ loading, running, error }));

      addLogs(messageLog);
    });
  }, []);

  // useEffect(() => {
  //   if (project.status.running) {
  //     navigate(`/dashboard/account`);
  //   }
  // }, [project.status.running]);

  useEffect(() => {
    navigate(`/dashboard/account`);
  }, []);

  return (
    <div className="h-full flex justify-center items-center">
      <div className="flex flex-col items-center">
        <div className="rounded-full relative w-30 h-30 overflow-hidden flex items-center justify-center">
          <div className="absolute w-full h-full bg-gradient animate-rotate"></div>
          <img src={LoadingImg} alt="loading" className="relative" />
        </div>
        <div className="text-2xl font-semibold text-black flex gap-2">
          Just a moment <LoadingDots />
        </div>
        {!isError && (
          <p className="text-[#535862] my-2">We are building for you </p>
        )}

        <p className="text-cyan-500"> {logs[logs.length - 1] || ''}</p>

        {isSuiNotInstalled && (
          <div className="flex flex-col items-center my-2">
            <p className="text-pink-300 text-lg">
              Sui is not installed on your system
            </p>
            <a
              href="https://docs.sui.io/guides/developer/getting-started/sui-install"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-500 hover:text-pink-600 text-lg flex items-center gap-1"
            >
              <Icon icon="mdi:open-in-new" className="text-lg" />
              Please install sui see this
            </a>
          </div>
        )}

        {isError && (
          <Link
            to="/"
            className="text-black hover:text-gray-500 text-lg flex items-center gap-2"
          >
            <Icon icon="mdi:home" className="text-lg" /> Home
          </Link>
        )}
      </div>
    </div>
  );
}

export default ProjectLoading;
