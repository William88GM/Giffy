import { useState, useEffect } from "react";
export default function useObserver({ elRef }) {
    const [show, setShow] = useState(false);

    useEffect(() => {
        function onView(entries, observer) {
            const element = entries[0];
            if (element.isIntersecting) {
                setShow((prev) => true);
            } else {
                setShow((prev) => false);
            }
        }
        const observer = new IntersectionObserver(onView, {
            rootMargin: "100px",
        });

        observer.observe(elRef.current);

        return () => observer.disconnect();
    });

    return { show };
}
