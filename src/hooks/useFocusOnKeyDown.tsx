import { RefObject, useEffect } from "react";

export const useFocusOnKeyDown = (ref?: RefObject<HTMLInputElement>) => {
  useEffect(() => {
    if (!ref) {
      return;
    }
    const focusInput = () => {
      if (document.activeElement !== ref.current) {
        ref.current?.focus();
      }
    };
    document.addEventListener("keydown", focusInput);
    return () => {
      document.removeEventListener("keydown", focusInput);
    };
  }, [ref]);
};
