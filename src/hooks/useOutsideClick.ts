import { useEffect, useRef } from "react";

export function useOutsideClick<T extends HTMLElement = HTMLDivElement>(
  handler?: () => void,
) {
  const ref = useRef<T>(null);

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
