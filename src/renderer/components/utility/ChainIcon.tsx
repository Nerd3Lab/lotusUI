import SUI_LOGO from '@asset/img/crypto/sui.svg';

interface ChainIconProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  circle?: boolean;
}

const sizeClass = {
  sm: 'w-5 h-5',
  md: 'w-7 h-7',
  lg: 'w-10 h-10',
  xl: 'w-32 h-32',
};

const ChainIcon = ({ size = 'md', circle }: ChainIconProps) => {
  const classes = `
    ${sizeClass[size]}
    rounded-full flex items-center justify-center rouded-full p-2
    ${circle ? 'bg-black' : 'bg-white'}
  `;

  return (
    <div className={classes}>
      <img
        src={SUI_LOGO}
        alt={'sui icon'}
        className="w-full h-full object-contain rounded-full"
      />
    </div>
  );
};

export default ChainIcon;
