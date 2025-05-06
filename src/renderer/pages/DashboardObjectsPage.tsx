import Breadcrumb from '@/renderer/components/dashboard/Breadcrumb';
import { ObjectDataResultItem } from '@/main/types/index';
import { useEffect, useRef, useState } from 'react';
import CopyText from '@/renderer/components/utility/CopyText';
import { formatAddress } from '@/renderer/utils/format';
import Pagination from '@/renderer/components/utility/Pagination';
import { useRefresh } from '@/renderer/hooks/useRefresh';
import { Icon } from '@iconify/react';

function DashboardObjectsPage() {
  const [objectsList, setObjectsList] = useState<ObjectDataResultItem[]>([]);
  const refresh = useRefresh();
  const fetching = async () => {
    const addresses = await window.electron.account.getAccounts();

    if (addresses) {
      const result: ObjectDataResultItem[] = [];
      for (const address of addresses) {
        const objects = await window.electron.account.getObjects(
          address.address,
        );

        if (objects && objects.length > 0) {
          for (const obj of objects) {
            result.push(obj);
          }
          setObjectsList(result);
        }
      }
    }
  };

  useEffect(() => {
    fetching();
  }, [refresh]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(objectsList.length / itemsPerPage);

  const paginatedObjects = objectsList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const isCoin = (obj: ObjectDataResultItem) =>
    obj.type?.includes('0x2::coin::Coin');
  const getBalance = (obj: ObjectDataResultItem) => {
    if (!isCoin(obj)) return -1;
    return (obj.content as any)?.fields?.balance || -1;
  };

  const [objLink, setObjLink] = useState('');

  const ref = useRef(null);

  const onClickObj = (e: React.MouseEvent, obj: ObjectDataResultItem) => {
    e.preventDefault();

    setObjLink(
      `https://custom.suiscan.xyz/custom/object/${obj.objectId}?network=http%3A%2F%2F127.0.0.1%3A9000`,
    );

    console.log(objLink);

    const link = ref.current as HTMLAnchorElement | null;
    if (link) {
      link.click();
    }
  };

  return (
    <div className="w-full px-8">
      <Breadcrumb label="Objects" />

      <a
        ref={ref}
        href={objLink}
        target="_blank"
        rel="noopener noreferrer"
        className="hidden"
      ></a>

      <div className="h-[65vh] overflow-y-auto">
        <table className="w-full mt-4 bg-white px-2">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 font-semibold text-gray-500 text-xs">
                Object ID
              </th>
              <th className="text-left py-3 font-semibold text-gray-500 text-xs">
                Owner
              </th>
              <th className="text-left py-3 font-semibold text-gray-500 text-xs">
                Type
              </th>
              <th className="text-left py-3 font-semibold text-gray-500 text-xs">
                BALANCE
              </th>
            </tr>
          </thead>

          <tbody className="">
            {paginatedObjects.map((obj) => {
              return (
                <tr
                  className={`border-b border-gray-200 py-4 hover:bg-cyan-50 cursor-pointer`}
                  key={obj.objectId}
                  onClick={(e) => onClickObj(e, obj)}
                >
                  <td className="text-left py-2">
                    <div className="flex items-center gap-2">
                      <div className="bg-cyan-100 rounded-full p-1">
                        <Icon
                          icon="simple-icons:sui"
                          className="w-4 h-4 text-cyan-600"
                        />
                      </div>
                      <CopyText value={obj.objectId} />
                      <span>{formatAddress(obj.objectId)}</span>
                    </div>
                  </td>
                  <td className="text-left py-2">
                    <div className="flex items-center gap-2">
                      <CopyText value={obj.objectId} />
                      <span>{formatAddress(obj.objectId)}</span>
                    </div>
                  </td>

                  <td className="">
                    <div className="flex items-center gap-2">
                      <CopyText value={obj.type} />
                      <span className="font-bold text-cyan-500">
                        {formatAddress(obj.type, 9)}
                      </span>
                    </div>
                  </td>

                  <td className="">
                    {isCoin(obj) && (
                      <div className="flex items-center gap-2">
                        <CopyText value={getBalance(obj)} />
                        <span className="font-bold text-purple-500">
                          {getBalance(obj)}
                        </span>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

export default DashboardObjectsPage;
