import { useState, useEffect } from "react";
export default function useObserver({ elRef }) {
	const [show, setShow] = useState(false);

	useEffect(() => {
		const observer = new IntersectionObserver(onView, { rootMargin: "100px" });

		function onView(entries, observer) {
			const element = entries[0];
			if (element.isIntersecting) {
				setShow(true);
				observer.disconect();
			}
		}

		observer.observe(elRef.current);

		return () => observer.disconnect();
	});

	return show;
}
