'use client';

import Image from 'next/image';
import { IconName, getIconPath } from '@/lib/icons';

interface IconProps {
  name: IconName;
  size?: number;
  alt?: string;
  className?: string;
}

/**
 * Icon component for displaying OrcaSlicer UI icons
 * Uses Next.js Image component for optimization
 */
export function Icon({ name, size = 24, alt = name, className = '' }: IconProps) {
  const iconPath = getIconPath(name);

  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <Image
        src={iconPath}
        alt={alt}
        width={size}
        height={size}
        className="inline-block"
        priority={false}
      />
    </div>
  );
}

interface TabPageIconProps {
  name: IconName;
  label: string;
  active?: boolean;
  onClick?: () => void;
  size?: number;
}

/**
 * Tab page icon with label
 * Used for rendering Tab navigation items
 */
export function TabPageIcon({ 
  name, 
  label, 
  active = false, 
  onClick,
  size = 32
}: TabPageIconProps) {
  return (
    <button
      onClick={onClick}
      className={`
        flex flex-col items-center gap-2 px-3 py-2 rounded
        transition-colors duration-200
        ${active 
          ? 'bg-blue-100 text-blue-700' 
          : 'hover:bg-gray-100 text-gray-600'
        }
      `}
      title={label}
    >
      <Icon name={name} size={size} alt={label} />
      <span className="text-xs text-center whitespace-nowrap">{label}</span>
    </button>
  );
}

interface GroupHeaderProps {
  iconName?: IconName;
  title: string;
  size?: number;
}

/**
 * Group header with optional icon
 * Used for rendering OptionGroup headers
 */
export function GroupHeader({ iconName, title, size = 20 }: GroupHeaderProps) {
  return (
    <div className="flex items-center gap-3 mb-4">
      {iconName && <Icon name={iconName} size={size} alt={title} />}
      <h3 className="text-sm font-semibold text-gray-700">{title}</h3>
    </div>
  );
}
