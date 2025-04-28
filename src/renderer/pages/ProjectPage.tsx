import { Icon } from '@iconify/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProjectItem from '../components/project/ProjectItem';
import Button from '../components/utility/Button';
import SearchBox from '../components/utility/SearchBox';

function ProjectPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className="w-full flex flex-col gap-3 relative">
      <div>
        <div className="flex justify-between items-center">
          <h2 className="text-black font-semibold text-2xl">All Project (2)</h2>
          <Button onClick={() => navigate('/create')}>
            <div className="flex items-center gap-2">
              <Icon icon="ei:plus" className="text-2xl" />
              Create Project
            </div>
          </Button>
        </div>
        <p className="text-gray-600">Manage and monitor your Superchain</p>
      </div>
      <SearchBox value={search} onChange={handleChange} />
      <div className="flex flex-col gap-2 w-full max-h-[50vh] overflow-y-scroll overflow-x-hidden pr-4">
        <ProjectItem
          name="Project A test Forta chain"
          description="Simple mode"
          l2ChainList={['eth', 'op', 'zora']}
          l1ChainList={['eth']}
          status="active"
        />
      </div>
    </div>
  );
}

export default ProjectPage;
