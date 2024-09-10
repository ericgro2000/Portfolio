import { useMemo } from 'react';

export const useCalculateSizes = (isSmall: boolean, isMobile: boolean, isTablet: boolean) => {
  return useMemo(() => {
    return {
      deskScale: isSmall ? 1.75 : isMobile ? 1.76 : 1.765,
      deskPosition: isMobile ? [0.5, -4.5, 0] : [0.25, -5.5, 0],
      cubePosition: isSmall ? [6, -5, 0] : isMobile ? [6, -5, 0] : isTablet ? [7, -5, 0] : [9, -5.5, 0],
      reactLogoPosition: isSmall ? [3, 4, 0] : isMobile ? [5, 4, 0] : isTablet ? [5, 4, 0] : [12, 3, 0],
      ringPosition: isSmall ? [-5, 7, 0] : isMobile ? [-10, 10, 0] : isTablet ? [-12, 10, 0] : [-24, 10, 0],
      targetPosition: isSmall ? [-5, -10, -10] : isMobile ? [-9, -10, -10] : isTablet ? [-11, -7, -10] : [-13, -13, -10],
      python: isSmall ? [-5, -10, -10] : isMobile ? [-13, 5, -39] : isTablet ? [-11, -7, -10] : [-13, -13, -10],
    };
  }, [isSmall, isMobile, isTablet]); 
};

export default useCalculateSizes;
