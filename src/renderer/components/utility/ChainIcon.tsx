import AccountIMG from '../../../../assets/img/crypto/account.svg';
import BaseIMG from '../../../../assets/img/crypto/base.svg';
import CYBERIMG from '../../../../assets/img/crypto/cyber.png';
import ETHIMG from '../../../../assets/img/crypto/eth.svg';
import LOCALIMG from '../../../../assets/img/crypto/local.svg';
import LyraIMG from '../../../../assets/img/crypto/lyra.jpg';
import MetalIMG from '../../../../assets/img/crypto/metal.png';
import MINTIMG from '../../../../assets/img/crypto/mint.png';
import MODEIMG from '../../../../assets/img/crypto/mode.svg';
import OPIMG from '../../../../assets/img/crypto/op.svg';
import OrderlyIMG from '../../../../assets/img/crypto/orderly.jpg';
import RaceIMG from '../../../../assets/img/crypto/race.jpg';
import TBNIMG from '../../../../assets/img/crypto/tbn.png';
import UNICHAIN from '../../../../assets/img/crypto/unichain.png';
import ZoraIMG from '../../../../assets/img/crypto/zora.svg';

const IconsDict = {
  base: BaseIMG,
  eth: ETHIMG,
  local: LOCALIMG,
  mode: MODEIMG,
  op: OPIMG,
  zora: ZoraIMG,
  account: AccountIMG,
  lyra: LyraIMG,
  metal: MetalIMG,
  orderly: OrderlyIMG,
  race: RaceIMG,
  tbn: TBNIMG,
  OPChainA: OPIMG,
  OPChainB: OPIMG,
  mainnet: ETHIMG,
  unichain: UNICHAIN,
  cyber: CYBERIMG,
  mint: MINTIMG,
} as const;

export type ChainListIcon = keyof typeof IconsDict;

interface ChainIconProps {
  chain: ChainListIcon;
  size?: 'md' | 'lg' | 'xl';
}

const sizeClass = {
  md: 'w-7 h-7',
  lg: 'w-10 h-10',
  xl: 'w-32 h-32',
};

const ChainIcon = ({ chain, size = 'md' }: ChainIconProps) => {
  const imageSrc = IconsDict[chain];

  if (!imageSrc) {
    return null;
  }

  const classes = `
    ${sizeClass[size]} 
    rounded-full flex items-center justify-center
    ${chain === 'tbn' ? 'bg-black' : 'bg-white'}
  `;

  return (
    <div className={classes}>
      <img
        src={imageSrc}
        alt={chain}
        className="w-full h-full object-contain rounded-full"
      />
    </div>
  );
};

export default ChainIcon;
