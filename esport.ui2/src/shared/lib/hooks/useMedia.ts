import { useCallback, useEffect, useState } from "react";

import {
  DESKTOP_MEDIA_QUERY,
  LAPTOP_MEDIA_QUERY,
  LARGE_DESKTOP_MEDIA_QUERY,
  MOBILE_L_MEDIA_QUERY,
  MOBILE_M_MEDIA_QUERY,
  MOBILE_S_MEDIA_QUERY,
  TABLET_MEDIA_QUERY,
} from "../../constants/media-query";

interface MediaQueryResult {
  isMobileS: boolean;
  isMobileM: boolean;
  isMobileL: boolean;
  isTablet: boolean;
  isLaptop: boolean;
  isDesktop: boolean;
  isLargeDesktop: boolean;
}

const mediaQueries = [
  MOBILE_S_MEDIA_QUERY,
  MOBILE_M_MEDIA_QUERY,
  MOBILE_L_MEDIA_QUERY,
  TABLET_MEDIA_QUERY,
  LAPTOP_MEDIA_QUERY,
  DESKTOP_MEDIA_QUERY,
  LARGE_DESKTOP_MEDIA_QUERY,
];

const defaultResult: MediaQueryResult = {
  isMobileS: false,
  isMobileM: false,
  isMobileL: false,
  isTablet: false,
  isLaptop: false,
  isDesktop: false,
  isLargeDesktop: false,
};

function useMediaQuery() {
  const getResult = (): MediaQueryResult => {
    // Prevents SSR issues
    if (typeof window !== "undefined") {
      if (window.matchMedia(MOBILE_S_MEDIA_QUERY).matches) {
        return { ...defaultResult, isMobileS: true };
      } else if (window.matchMedia(MOBILE_M_MEDIA_QUERY).matches) {
        return { ...defaultResult, isMobileM: true };
      } else if (window.matchMedia(MOBILE_L_MEDIA_QUERY).matches) {
        return { ...defaultResult, isMobileL: true };
      } else if (window.matchMedia(TABLET_MEDIA_QUERY).matches) {
        return { ...defaultResult, isTablet: true };
      } else if (window.matchMedia(LAPTOP_MEDIA_QUERY).matches) {
        return { ...defaultResult, isTablet: true };
      } else if (window.matchMedia(DESKTOP_MEDIA_QUERY).matches) {
        return { ...defaultResult, isDesktop: true };
      } else if (window.matchMedia(LARGE_DESKTOP_MEDIA_QUERY).matches) {
        return { ...defaultResult, isLargeDesktop: true };
      }
    }
    return defaultResult;
  };

  const [media, setMedia] = useState<MediaQueryResult>(getResult());

  const handleChange = useCallback(() => {
    setMedia(getResult());
  }, []);

  useEffect(() => {
    const matchMedias: MediaQueryList[] = [];
    for (const query of mediaQueries) {
      const matchMedia = window.matchMedia(query);
      handleChange();

      // Listen matchMedia
      if (matchMedia.addListener) {
        matchMedia.addListener(handleChange);
      } else {
        matchMedia.addEventListener("change", handleChange);
      }

      matchMedias.push(matchMedia);
    }

    return () => {
      for (const matchMedia of matchMedias) {
        if (matchMedia.removeListener) {
          matchMedia.removeListener(handleChange);
        } else {
          matchMedia.removeEventListener("change", handleChange);
        }
      }
    };
  }, [handleChange]);

  return media;
}

export const useMedia = () => {
  const {
    isMobileS,
    isMobileM,
    isMobileL,
    isTablet,
    isLaptop,
    isDesktop,
    isLargeDesktop,
  } = useMediaQuery();

  const result = {
    isMobileS: () => isMobileS,
    isMobileM: () => isMobileS || isMobileM,
    isMobileL: () => result.isMobileM() || isMobileL,
    isMobile: () => result.isMobileL() || isMobileL,
    isTablet: () => result.isMobile() || isTablet,
    isLaptop: () => result.isTablet() || isLaptop,
    isDesktop: () => result.isLaptop() || isDesktop,
    isLargeDesktop: () => result.isDesktop() || isLargeDesktop,
  };
  return result;
};
