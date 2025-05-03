import { revertAllRedux } from '@/renderer/states/action';
import { useAppDispatch } from '@/renderer/states/hooks';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
const Breadcrumb = ({ label }: { label: string }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onClick = async () => {
    await window.electron.node.stopProject();
    dispatch(revertAllRedux());
    navigate('/');
  };
  return (
    <div className="flex gap-1 items-center">
      <div onClick={onClick} className="p-1 cursor-pointer">
        <Icon icon="lsicon:home-outline" className="w-5 h-5 text-gray-500" />
      </div>
      <div className="p-1">
        <Icon icon="line-md:chevron-right" className="w-4 h-4 text-gray-300" />
      </div>
      <div className="text-sm font-semibold text-gray-700">{label}</div>
    </div>
  );
};

export default Breadcrumb;
