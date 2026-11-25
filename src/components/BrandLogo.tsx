import React from 'react';

interface BrandLogoMarkProps {
  className?: string;
  accentColor?: string;
  strokeColor?: string;
  ariaLabel?: string;
}

export const BrandLogoMark: React.FC<BrandLogoMarkProps> = ({
  className = 'w-8 h-8',
  accentColor = '#2563EB',
  strokeColor = 'currentColor',
  ariaLabel = 'شعار شركة المناهري للمقاولات العمومية',
}) => {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label={ariaLabel}
    >
      <rect
        x="2.5"
        y="2.5"
        width="35"
        height="35"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeOpacity="0.28"
      />
      <path
        d="M9 31V11L20 20.5L31 11V31"
        stroke={strokeColor}
        strokeWidth="2.4"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
      <path d="M20 20.5V31" stroke={accentColor} strokeWidth="2.4" strokeLinecap="square" />
      <path d="M8 7.5H32" stroke={accentColor} strokeWidth="1.8" strokeLinecap="square" />
    </svg>
  );
};
