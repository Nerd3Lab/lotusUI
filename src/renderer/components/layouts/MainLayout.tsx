import { Icon } from '@iconify/react';
import { useState } from 'react';
import LOGO_IMG from '../../../../assets/img/logo.svg';
import { RightSection } from '../project/RightSection';
interface MainLayoutProps {
  children: React.ReactNode;
}

function MainLayout(props: MainLayoutProps) {
  const [version, setVersion] = useState<string>('');
  const [updateInfo, setUpdateInfo] = useState<any>(null);
  const [ready, setReady] = useState<boolean>(false);

  console.log('updateInfo', updateInfo);

  return (
    <div className="w-full h-full grid grid-cols-2">
      <div className="bg-gray-50 w-full h-full relative z-100 p-10 flex flex-col justify-center">
        <div className="absolute left-6 top-6">
          <img src={LOGO_IMG} alt="logo" className="h-8" />
        </div>
        <div className="">{props.children}</div>
        <p className="absolute bottom-6 left-6 text-gray-600 text-sm">
          © Nerd3Lab 2025
        </p>
        <p className="flex items-center absolute bottom-6 right-6 text-gray-600 text-sm">
          <Icon icon="mi:email" className="text-gray-500 text-lg mr-2" />
          nerd3lab@gmail.com
        </p>
      </div>
      <div className="py-4 pr-4 flex bg-white">
        <RightSection />
      </div>
    </div>
  );
}

export default MainLayout;
