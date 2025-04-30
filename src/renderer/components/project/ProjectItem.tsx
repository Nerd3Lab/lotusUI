import { Icon } from '@iconify/react';
import ChainIcon from '../utility/ChainIcon';
import { StatusBadge } from '../utility/StatusBadge';
import { ProjectInterface } from '@/main/types/index';
import { formatTimestamp } from '@/renderer/utils/index';

interface ProjectItemProps {
  status: 'active' | 'inactive';
  project: ProjectInterface;
}

const ProjectItem = ({ status, project }: ProjectItemProps) => {
  return (
    <div
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
        <StatusBadge status={status} />
      </div>
      <div className="flex w-full items-center justify-between">
        <p className="text-cyan-800 text-sm">
          Version : {project.configJson.suiVersion}
        </p>

        <p className="text-gray-600 text-sm">
          Last use: {formatTimestamp(project.configJson.lastedActive)}
        </p>
      </div>
    </div>
  );
};

export default ProjectItem;
