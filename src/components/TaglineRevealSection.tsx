import React from 'react';
import { BrandLogoMark } from './BrandLogo';
import { DarkChapterAtmosphere, RevealBlock, TaglineRevealQuote } from './MotionPrimitives';

export const TaglineRevealSection: React.FC = () => {
  return (
    <section
      id="manifesto"
      aria-label="التزام شركة المناهري"
      className="relative bg-[#101C2C] text-white py-24 sm:py-32 overflow-hidden"
    >
      <DarkChapterAtmosphere variant="navy" />
      <div aria-hidden="true" className="absolute inset-0 arch-grid-dark pointer-events-none" />

      <div className="relative z-10 max-w-[1360px] mx-auto px-5 sm:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <RevealBlock className="lg:col-span-4 flex flex-col gap-5">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-white/95 border border-white/25 p-2 shadow-[0_10px_28px_-10px_rgba(0,0,0,0.45)] shrink-0">
              <BrandLogoMark
                className="w-full h-full"
                ariaLabel="شعار شركة المناهري للمقاولات العمومية"
              />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs font-medium text-[#E5A52B]">
                شعار شركة المناهري للمقاولات العمومية
              </span>
              <span className="font-[Cairo] text-lg font-bold text-white">
                شركة المناهري للمقاولات العمومية
              </span>
            </div>
            <div className="h-[2px] w-24 arch-gold-rule" aria-hidden="true" />
          </RevealBlock>

          <div className="lg:col-span-8">
            <TaglineRevealQuote
              lines={[
                'كل مشروع يبدأ بخطة واضحة،',
                'وينتهي بتسليم نفخر به،',
                'وبين البداية والنهاية التزام لا يتغير.',
              ]}
              className="font-[Cairo] text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.45] max-w-[820px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
