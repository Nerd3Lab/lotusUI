import SUI from '@asset/img/crypto/sui-white.svg';
import LOGO from '@asset/img/logo-white.svg';
import NavLinkItem from './NavLinkItem';
import { useProjectState } from '@/renderer/states/project/reducer';
import { Icon } from '@iconify/react';
import CopyText from '@/renderer/components/utility/CopyText';
import { formatAddress } from '@/renderer/utils/format';

const NavBar = () => {
  const project = useProjectState();

  const syncPercentage =
    project.transactionBlocks && project.configJson.transactionBlocks
      ? Math.min(
          100,
          Math.round(
            (project.transactionBlocks / project.configJson.transactionBlocks) *
              100,
          ),
        )
      : 0;

  return (
    <nav className="p-4 mb-5">
      <div className="bg-[#0F0F10] text-white px-10 py-3 rounded-xl flex justify-between items-center">
        <div className="flex items-center gap-12">
          <div className="flex items-center gap-2 text-xl font-semibold text-cyan-300">
            <img src={LOGO} alt="Lotus Logo" className="h-6" />
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <NavLinkItem to="/dashboard/account" label="Accounts" exact />
              <NavLinkItem
                to="/dashboard/explorer"
                label="Explorer"
                exact
                isExternal={
                  'https://custom.suiscan.xyz/custom/home/?network=http%3A%2F%2F127.0.0.1%3A9000'
                }
              />
              <NavLinkItem to="/dashboard/logging" label="Logging" exact />
              <NavLinkItem to="/dashboard/objects" label="Objects" exact />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6 text-sm">
          <StatusItem
            label="Project"
            value={
              <div className="flex items-center gap-1">
                {!project.configJson.fullnode ? (
                  <Icon icon="token:suip" className="text-base text-cyan-500" />
                ) : (
                  <Icon
                    icon="simple-icons:sui"
                    className="text-base text-cyan-500"
                  />
                )}
                {formatAddress(project.configJson.name)}
              </div>
            }
          />

          <StatusItem
            label="Node"
            value={
              <div className="flex items-center gap-1">
                {project.configJson.fullnode ? 'Fullnode' : 'LightNode'}
              </div>
            }
          />
          <StatusItem
            label="Total TX Block"
            value={project.transactionBlocks}
          />
          <StatusItem
            label="Status"
            value={
              project.checkpointDone ? (
                <span className="flex items-center gap-1 text-cyan-600">
                  Sync done
                </span>
              ) : (
                <span className="flex items-center gap-1 text-yellow-600">
                  <Icon icon={'codex:loader'} className="text-xl" />
                  Sync {syncPercentage}%
                </span>
              )
            }
          />
          {/* <StatusItem label="Network ID" value="22222" /> */}
          <StatusItem
            label="RPC Server"
            value={
              <div className="flex items-center gap-2">
                <CopyText value={'http://127.0.0.1:9000'} />
                http://127.0.0.1:9000
              </div>
            }
          />
        </div>
      </div>
    </nav>
  );
};

const StatusItem = ({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) => (
  <div className="text-gray-400 text-sm">
    <div>{label}</div>
    <div className="text-gray-100 font-medium">{value}</div>
  </div>
);

export default NavBar;
