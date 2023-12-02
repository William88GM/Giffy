import { useState, useEffect } from "react";
export default function useObserver({ elRef }) {
  const [show, setShow] = useState(false);
  const [observerState, setObserverState] = useState();

  useEffect(() => {
    if (!elRef.current) return;
    function onView(entries, observer) {
      const element = entries[0];
      if (element.isIntersecting) {
        setShow((prev) => true);
      } else {
        setShow((prev) => false);
      }
    }
    const observer = new IntersectionObserver(onView, {
      rootMargin: "200px",
    });
    setObserverState(observer);
    observer.observe(elRef.current);

    return () => observer.disconnect();
  });

  return { show, setShow };
}
