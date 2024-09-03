import { useMediaQuery } from "react-responsive";

const useResponsiveHeader = () => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1024px)" });
  const isDesktopOrLaptop = useMediaQuery({ query: "(min-width: 1024px)" });

  return {
    isTabletOrMobile,
    isDesktopOrLaptop,
  };
};

export default useResponsiveHeader;
