import { useEffect, useRef } from "react";

export function useOutsideClick(handler?: () => void) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(
    function () {
      function handleClick(e: MouseEvent) {
        if (
          ref.current &&
          e.target instanceof Node &&
          !ref.current.contains(e.target)
        )
          handler?.();
      }

      document.addEventListener("click", handleClick, true);

      return () => document.removeEventListener("click", handleClick, true);
    },
    [handler],
  );

  return { ref };
}
