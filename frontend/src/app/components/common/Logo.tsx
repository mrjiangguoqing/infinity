// components/common/Logo.tsx
import Link from 'next/link';
import Image from 'next/image';

interface LogoProps {
  className?: string;
}

export function Logo({ className = '' }: LogoProps) {
  return (
    <Link href="/" className={`flex items-center ${className}`}>
      {/* 方案1: 使用 SVG */}
      <svg
        className="h-8 w-auto"
        viewBox="0 0 124 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 1.5c0 3.314-2.686 6-6 6S0 4.814 0 1.5C0 .672.672 0 1.5 0h9c.828 0 1.5.672 1.5 1.5z"
          fill="currentColor"
        />
        <text
          x="24"
          y="20"
          className="text-xl font-bold"
          fill="currentColor"
        >
          YourStore
        </text>
      </svg>

      {/* 方案2: 使用 Image 组件 
      <Image
        src="/logo.png"
        alt="YourStore Logo"
        width={124}
        height={24}
        priority
      />
      */}

      {/* 方案3: 纯文字版本 
      <span className="text-xl font-bold text-gray-900">
        Your<span className="text-primary-600">Store</span>
      </span>
      */}
    </Link>
  );
}

// 带有额外功能的版本
interface EnhancedLogoProps {
  className?: string;
  variant?: 'default' | 'white' | 'colored';
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function EnhancedLogo({
  className = '',
  variant = 'default',
  showTagline = false,
  size = 'md',
}: EnhancedLogoProps) {
  const sizeClasses = {
    sm: 'h-6',
    md: 'h-8',
    lg: 'h-10',
  };

  const variantClasses = {
    default: 'text-gray-900',
    white: 'text-white',
    colored: 'text-primary-600',
  };

  return (
    <Link
      href="/"
      className={`flex flex-col items-start ${className}`}
    >
      <div className={`flex items-center ${variantClasses[variant]}`}>
        <svg
          className={`w-auto ${sizeClasses[size]}`}
          viewBox="0 0 124 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 1.5c0 3.314-2.686 6-6 6S0 4.814 0 1.5C0 .672.672 0 1.5 0h9c.828 0 1.5.672 1.5 1.5z"
            fill="currentColor"
          />
          <text
            x="24"
            y="20"
            className="text-xl font-bold"
            fill="currentColor"
          >
            YourStore
          </text>
        </svg>
      </div>
      
      {showTagline && (
        <span className="text-sm text-gray-500 mt-1">
          Your trusted shopping destination
        </span>
      )}
    </Link>
  );
}