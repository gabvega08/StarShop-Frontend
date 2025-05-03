import { useEffect, RefObject } from "react";

export function useInfiniteScroll(
  ref: RefObject<HTMLElement>,
  callbackFn: () => void
) {
  useEffect(() => {
    const target = ref.current;
    if (!target) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        callbackFn();
      }
    });

    observer.observe(target);

    return () => {
      observer.unobserve(target);
      observer.disconnect();
    };
  }, [ref, callbackFn]);
}
