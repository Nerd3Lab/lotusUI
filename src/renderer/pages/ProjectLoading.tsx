import { NodeRunLogInterface } from '@/main/types/index';
import LoadingDots from '@/renderer/components/utility/LoadingDots';
import { useAppDispatch, useAppSelector } from '@/renderer/states/hooks';
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

  const [isError, setisError] = useState(false);
  const [isSuiNotInstalled, setIsSuiNotInstalled] = useState(false);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const logs = useAppSelector((state) => state.project.logs);

  const checkingProject = async () => {
    if (!project?.configJson.name) {
      dispatch(ProjectSlide.actions.addLog(`Not found project`));
      setisError(true);
      navigate('/');
      return;
    }
    const isAutoReset = project?.configJson.isAutoReset;
    console.log({ isAutoReset });
    if (!isAutoReset) {
      const projectGet = await window.electron.project.getProject(
        project.configJson.name,
      );

      if (!projectGet) {
        dispatch(
          ProjectSlide.actions.addLog(
            `Project : ${project.configJson.name} not found`,
          ),
        );
        setisError(true);
        return;
      }
    }

    const result = await window.electron.node.runProject(
      project.configJson.name,
      isAutoReset,
    );

    if (result && result.isSuiNotInstalled) {
      dispatch(ProjectSlide.actions.addLog(result.error));
      setisError(true);
      setIsSuiNotInstalled(true);
      return;
    }

    if (result && result.error) {
      dispatch(ProjectSlide.actions.addLog(result.error));
      setisError(true);
      return;
    }

    dispatch(
      ProjectSlide.actions.addLog(
        'Project found, loading Sui local development...',
      ),
    );
  };

  useEffect(() => {
    checkingProject();
  }, []);

  const syncPercentage =
    project.transactionBlocks && project.configJson.transactionBlocks
      ? Math.min(
          100,
          Math.round(
            (project.transactionBlocks / project.configJson.transactionBlocks) *
              100,
          ),
        )
      : 0;

  const running = project.status.running;
  const checkpointDone = project.checkpointDone;


  useEffect(() => {
    // if (running && checkpointDone) {
    //   navigate(`/dashboard/account`);
    // }

    if (running) {
      navigate(`/dashboard/account`);
    }
  }, [running, checkpointDone]);

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

        {running ? (
          <p className="text-cyan-500">Sync tx block {syncPercentage}%</p>
        ) : (
          <p className="text-cyan-500"> {logs[logs.length - 1] || ''}</p>
        )}

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
