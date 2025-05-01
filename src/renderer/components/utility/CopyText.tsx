import { Icon } from '@iconify/react';
import Swal from 'sweetalert2';

interface CopyTextProps {
  value: string;
  size?: string;
}

function CopyText(props: CopyTextProps) {
  const classNameString = props.size ? props.size : 'text-xl';

  const copyText = async (e: any) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(props.value);
      Swal.fire({
        icon: 'success',
        title: 'Copied!',
        showConfirmButton: false,
        timer: 1000,
      });
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div onClick={copyText} className="hover:text-rose-500">
      <Icon
        icon="ph:copy-duotone"
        className={`cursor-pointer text-gray-400 icon-hover ${classNameString}`}
      />
    </div>
  );
}

export default CopyText;
