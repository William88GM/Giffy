import { useState, useEffect, useContext } from "react";
import { Context } from "../Servicios/Context";
export default function useObserver({ elRef }) {
  const [show, setShow] = useState(false);
  const { gifs } = useContext(Context);

  useEffect(() => {
    if (!elRef.current) return;
    function onView(entries, observer) {
      const element = entries[0];
      if (element.isIntersecting) {
        setShow((prev) => true);
        setTimeout(() => {
          setShow((prev) => false);
          return observer.disconnect();
        }, 3500);
      } else {
        setShow((prev) => false);
      }
    }
    const observer = new IntersectionObserver(onView, {
      rootMargin: "200px",
    });
    observer.observe(elRef.current);

    return () => observer.disconnect();
  }, [gifs]);

  return { show, setShow };
}
