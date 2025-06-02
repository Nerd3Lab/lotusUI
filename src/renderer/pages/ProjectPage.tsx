import { useProjectList } from '@/renderer/hooks/useProjectList';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProjectItem from '../components/project/ProjectItem';
import Button from '../components/utility/Button';
import SearchBox from '../components/utility/SearchBox';
import { ProjectSlide } from '@/renderer/states/project/reducer';
import { useAppDispatch } from '@/renderer/states/hooks';

function ProjectPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const [reload, setReload] = useState(false);

  const {
    data: projectLists,
    loading: projectListsLoading,
    error: projectListsError,
  } = useProjectList(reload);

  const projects = projectLists.filter((pro) =>
    pro.configJson.name.toLocaleLowerCase().includes(search.toLowerCase()),
  );

  const handleReload = () => {
    setReload(!reload);
  };

  const onClickQuick = async () => {
    dispatch(ProjectSlide.actions.selectProject({
      path: '',
      configJson: {
        name: 'Localnet',
        fullnode: false,
        epochDuration: 60000,
        isAutoReset: true,
        createdAt: +(new Date()),
        lastedActive: +(new Date()),
        description: 'Run local sui node without persisting data',
        transactionBlocks: 0,
      },
    }));

    navigate('/loading');
  };

  return (
    <div className="w-full flex flex-col gap-3 relative">
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-black font-semibold text-2xl">
            All Project ({projectLists.length})
          </h2>
          <Button onClick={() => navigate('/create')}>
            <div className="flex items-center gap-2">
              <Icon icon="ei:plus" className="text-2xl" />
              Create Project
            </div>
          </Button>
        </div>
        <p className="text-gray-600">
          Manage and monitor your local SUI development
        </p>
      </div>
      <SearchBox value={search} onChange={handleChange} />
      <div className="flex flex-col gap-2 w-full min-h-[40vh] max-h-[40vh] overflow-y-scroll overflow-x-hidden pr-4">
        {projects.map((proj) => (
          <ProjectItem
            project={proj}
            key={`project-${proj.configJson.name}`}
            status="active"
            handleReload={handleReload}
          />
        ))}
      </div>

      <div className='flex justify-end pt-8'>
        <div
          onClick={onClickQuick}
          className={`border-2 px-4 py-4 text-white rounded-2xl flex gap-4 items-center transition-all cursor-pointer  bg-cyan-500 hover:border-cyan-500 hover:bg-cyan-600 border-cyan-500`}
        >
          <div className={`p-2 rounded-full  bg-black text-cyan-500`}>
            <Icon icon="token-branded:suip" className="text-4xl" />
          </div>
          <div>
            <b className="font-semibold text-gray-800 mt-2 text-xl">Quick Start</b>
            <p className='text-lg'>Run local sui node without persisting data</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectPage;
