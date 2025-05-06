import { ProjectInterface } from '@/main/types/index';
import { useAppDispatch } from '@/renderer/states/hooks';
import { ProjectSlide } from '@/renderer/states/project/reducer';
import { formatTimestamp } from '@/renderer/utils/index';
import { swalFire } from '@/renderer/utils/swalfire';
import { useNavigate } from 'react-router-dom';
import ChainIcon from '../utility/ChainIcon';
import { StatusBadge } from '../utility/StatusBadge';
import { Icon } from '@iconify/react';

interface ProjectItemProps {
  status: 'active' | 'inactive';
  project: ProjectInterface;
  handleReload: () => void;
}

const ProjectItem = ({ status, project, handleReload }: ProjectItemProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onClick = async () => {
    const result = await window.electron.project.getProject(
      project.configJson.name,
    );

    if (!result) {
      swalFire().error('Project not found', {
        icon: 'error',
      });
      return;
    }

    dispatch(ProjectSlide.actions.selectProject(result));

    navigate('/loading');
  };

  const handleDelete = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    const swal = await swalFire().question(
      `Are you sure you want to delete ${project.configJson.name}?`,
    );

    if (swal.isConfirmed) {
      const result = await window.electron.project.removeProject(
        project.configJson.name,
      );

      if (result) {
        swalFire().success('Project deleted successfully');
      } else {
        swalFire().error('Failed to delete project');
      }

      handleReload();
    }
  };

  return (
    <div
      onClick={onClick}
      className="w-full cursor-pointer rounded-xl flex flex-col gap-2 border border-gray-200 p-4
    transition-transform duration-300 hover:translate-x-2 hover:opacity-80 bg-white will-change-transform"
    >
      <div className="flex items-start justify-between gap-3">
        <ChainIcon size="lg" circle={true} />
        <div className="flex-1">
          <h3 className="text-gray-900 font-semibold text-lg">
            {project.configJson.name}
          </h3>
          <p className="text-cyan-700 font-semibold text-sm mt-1">
            {project.configJson.description}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <StatusBadge status={status} />

          <div onClick={handleDelete}>
            <Icon
              icon={'material-symbols:delete'}
              className="text-red-500 text-2xl cursor-pointer hover:text-red-600"
            />
          </div>
        </div>
      </div>
      <div className="flex w-full items-center justify-between">
        <p className="text-cyan-800 text-sm">
          {/* Version : {project.configJson.suiVersion} */}
          Created at: {formatTimestamp(project.configJson.createdAt)}
        </p>

        <p className="text-gray-600 text-sm">
          Last use: {formatTimestamp(project.configJson.lastedActive)}
        </p>
      </div>
    </div>
  );
};

export default ProjectItem;
