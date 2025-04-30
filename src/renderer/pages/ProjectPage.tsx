import { Icon } from '@iconify/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProjectItem from '../components/project/ProjectItem';
import Button from '../components/utility/Button';
import SearchBox from '../components/utility/SearchBox';
import { useProjectList } from '@/renderer/hooks/useProjectList';
import { formatTimestamp } from '@/renderer/utils/index';

function ProjectPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const {
    data: projectLists,
    loading: projectListsLoading,
    error: projectListsError,
  } = useProjectList();

  const projects = projectLists.filter((pro) =>
    pro.configJson.name.toLocaleLowerCase().includes(search.toLowerCase()),
  );

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
          />
        ))}
      </div>
    </div>
  );
}

export default ProjectPage;
