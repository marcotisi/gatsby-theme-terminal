import { useLocation } from "@reach/router";

export const useCommandFromLocation = () => {
  const { pathname } = useLocation();

  return pathname
    .split("/")
    .join(" ")
    .trim();
};
