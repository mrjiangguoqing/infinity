import { LockIcon, ShieldIcon, CheckIcon } from '../icon';

interface SecurityBadgeProps {
  icon: React.ReactNode;
  text: string;
}

const SecurityBadge = ({ icon, text }: SecurityBadgeProps) => {
  return (
    <div className="flex items-center gap-2">
      {icon}
      <span className="text-gray-600 text-sm">{text}</span>
    </div>
  );
};

const badges = [
  {
    id: 'security',
    icon: <LockIcon className="w-4 h-4 text-gray-600" />,
    text: '安全支付保障'
  },
  {
    id: 'privacy',
    icon: <ShieldIcon className="w-4 h-4 text-gray-600" />,
    text: '隐私信息加密'
  },
  {
    id: 'authentic',
    icon: <CheckIcon className="w-4 h-4 text-gray-600" />,
    text: '正品保证'
  }
];

export function SecurityBadges() {
  return (
    <div className="flex items-center gap-6 justify-center py-4">
      {badges.map((badge) => (
        <SecurityBadge
          key={badge.id}
          icon={badge.icon}
          text={badge.text}
        />
      ))}
    </div>
  );
}