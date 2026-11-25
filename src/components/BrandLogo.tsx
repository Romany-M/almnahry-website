import React from 'react';

export const COMPANY_LOGO_SRC = '/assets/aistudio/logo_no_background_384b513b.png';

interface BrandLogoMarkProps {
  className?: string;
  ariaLabel?: string;
  priority?: boolean;
}

export const BrandLogoMark: React.FC<BrandLogoMarkProps> = ({
  className = 'w-8 h-8',
  ariaLabel = 'شعار شركة المناهري للمقاولات العمومية',
  priority = false,
}) => {
  return (
    <img
      src={COMPANY_LOGO_SRC}
      alt={ariaLabel}
      width={186}
      height={227}
      decoding="async"
      fetchPriority={priority ? 'high' : undefined}
      draggable={false}
      className={`object-contain select-none ${className}`}
    />
  );
};
