import { Icon } from '@iconify/react';

interface StatusBadgeProps {
  status?:
    | 'active'
    | 'inactive'
    | 'transfer'
    | 'contractCall'
    | 'contractCreated'
    | 'unknown'
    | 'success'
    | 'reverted'
    | 'failed';
  noIcon?: boolean;
}

const statusConfig = {
  active: {
    text: 'Active',
    icon: 'icon-park-outline:dot',
    iconColor: 'text-blue-500',
    textColor: 'text-blue-700',
    borderColor: 'border-blue-200',
    bgColor: 'bg-blue-50',
  },
  inactive: {
    text: 'Inactive',
    icon: 'icon-park-outline:dot',
    iconColor: 'text-gray-500',
    textColor: 'text-gray-700',
    borderColor: 'border-gray-200',
    bgColor: 'bg-gray-50',
  },
  transfer: {
    text: 'VALUE TRANSFER',
    icon: 'icon-park-outline:switch',
    iconColor: 'text-[#0BA5EC]',
    textColor: 'text-[#026AA2]',
    borderColor: 'border-[#B9E6FE]',
    bgColor: 'bg-[#F0F9FF]',
  },
  contractCall: {
    text: 'Contract Call',
    icon: 'icon-park-outline:switch',
    iconColor: 'text-purple-900',
    textColor: 'text-purple-900',
    borderColor: 'border-purple-200',
    bgColor: 'bg-purple-50',
  },
  contractCreated: {
    text: 'Contract Created',
    icon: 'icon-park-outline:switch',
    iconColor: 'text-[#F59E0B]',
    textColor: 'text-[#78350F]',
    borderColor: 'border-[#FEF3C7]',
    bgColor: 'bg-[#FFFBEB]',
  },
  success: {
    text: 'Success',
    icon: 'icon-park-outline:check',
    iconColor: 'text-[#10B981]',
    textColor: 'text-[#065F46]',
    borderColor: 'border-[#D1FAE5]',
    bgColor: 'bg-[#F0FFF4]',
  },
  reverted: {
    text: 'Reverted',
    icon: 'icon-park-outline:close',
    iconColor: 'text-[#EF4444]',
    textColor: 'text-[#991B1B]',
    borderColor: 'border-[#FED7D7]',
    bgColor: 'bg-[#FEF2F2]',
  },
  failed: {
    text: 'Failed',
    icon: 'icon-park-outline:close',
    iconColor: 'text-[#EF4444]',
    textColor: 'text-[#991B1B]',
    borderColor: 'border-[#FED7D7]',
    bgColor: 'bg-[#FEF2F2]',
  },
  unknown: {
    text: 'Unknown',
    icon: 'icon-park-outline:switch',
    iconColor: 'text-[#EF4444]',
    textColor: 'text-[#991B1B]',
    borderColor: 'border-[#FED7D7]',
    bgColor: 'bg-[#FEF2F2]',
  },
};

export const StatusBadge = ({ status, noIcon }: StatusBadgeProps) => {
  const config = status ? statusConfig[status] : undefined;

  const text = config?.text || status || 'Unknown';
  const icon = config?.icon || 'icon-park-outline:dot';
  const iconColor = config?.iconColor || 'text-gray-500';
  const textColor = config?.textColor || 'text-gray-700';
  const borderColor = config?.borderColor || 'border-gray-200';
  const bgColor = config?.bgColor || 'bg-gray-50';

  return (
    <div
      className={`flex gap-2 rounded-full border ${borderColor} ${bgColor} pr-2.5 pl-2 py-0.5 font-medium items-center`}
    >
      {!noIcon && <Icon icon={icon} className={`text-sm ${iconColor}`} />}
      <div className={`text-sm min-w-[3rem] text-center ${textColor}`}>
        {text}
      </div>
    </div>
  );
};
