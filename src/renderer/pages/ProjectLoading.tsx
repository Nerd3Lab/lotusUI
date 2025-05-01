import LoadingDots from '@/renderer/components/utility/LoadingDots';
import LoadingImg from '@asset/img/loadingImg.png';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ProjectLoading() {
  const searchParams = new URLSearchParams(window.location.hash.split('?')[1]);
  const name = searchParams.get('name');
  const description = searchParams.get('description');
  const isFullNode = searchParams.get('isFullNode') === 'true';
  const epochDuration = searchParams.get('epochDuration');
  const suiVersion = searchParams.get('suiVersion');
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/dashboard/account');
  });

  console.log(window.location);

  console.log({
    name,
    description,
    isFullNode,
    epochDuration,
    suiVersion,
  });
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
        <p className="text-[#535862] my-2">We are building for you </p>

        <p className="text-cyan-500 my-2">Creating... Layer2 Chain B</p>
      </div>
    </div>
  );
}

export default ProjectLoading;
