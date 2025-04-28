import { Icon } from '@iconify/react';
import ChainIcon, { ChainListIcon } from '../utility/ChainIcon';
import { StatusBadge } from '../utility/StatusBadge';

interface ProjectItemProps {
  name: string;
  description: string;
  status: 'active' | 'inactive';
  l2ChainList: ChainListIcon[];
  l1ChainList: ChainListIcon[];
  lastUsedDate?: string;
}

const ProjectItem = ({
  name,
  description,
  status,
  l2ChainList,
  l1ChainList,
  lastUsedDate = '22/01/2025',
}: ProjectItemProps) => {
  const renderChainList = (chainList: ChainListIcon[]) =>
    chainList.map((chain, index) => (
      <div
        key={`${chain.toString()}-${index}`}
        className="relative"
        style={{ transform: `translateX(${index * -5}px)` }}
      >
        <ChainIcon chain={chain as any} size="md" />
      </div>
    ));

  return (
    <div
      className="w-full cursor-pointer rounded-xl flex flex-col gap-2 border border-gray-200 p-4
    transition-transform duration-300 hover:translate-x-2 hover:opacity-80 bg-white will-change-transform"
    >
      <div className="flex items-start justify-between gap-3">
        <ChainIcon chain="local" size="lg" />
        <div className="flex-1">
          <h3 className="text-gray-900 font-semibold text-lg">{name}</h3>
          <p className="text-cyan-700 font-semibold text-sm mt-1">
            {description}
          </p>
        </div>
        <StatusBadge status={status} />
      </div>
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex">{renderChainList(l2ChainList)}</div>
          <Icon
            icon="ic:baseline-plus"
            className="text-gray-600 text-md"
            style={{ transform: `translateX(${l2ChainList.length * -5}px)` }}
          />
          <div
            className="flex"
            style={{ transform: `translateX(${l2ChainList.length * -5}px)` }}
          >
            {renderChainList(l1ChainList)}
          </div>
        </div>
        <p className="text-gray-600 text-sm">Last use: {lastUsedDate}</p>
      </div>
    </div>
  );
};

export default ProjectItem;
