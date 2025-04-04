import { useEffect, useRef, useState } from "react";

export default function UseFirstView(ref, observerOptions) {
    const [entered, setEntered] = useState(false);
    const observer = useRef(
        new IntersectionObserver(
            ([entry]) => setEntered(entry.isIntersecting),
            observerOptions
        )
    );

    useEffect(() => {
        const el = ref.current;
        const ob = observer.current;

        if (entered) return ob.disconnect();

        if (el && !entered) ob.observe(el);

        return () => ob.disconnect();
    }, [ref, entered]);

    return entered;
};