// useScrolled.jsx
import { useEffect, useState, useRef } from "react";

const useScrolled = (threshold = 50) => {
    const [scrolled, setScrolled] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) {
            const handleScroll = () => {
                const currentScrollPos = window.scrollY;
                setScrolled(currentScrollPos > 50);
            };
            window.addEventListener("scroll", handleScroll);
            return () => window.removeEventListener("scroll", handleScroll);
        }

        const handleScroll = () => {
            setScrolled(el.scrollTop > threshold);
        };

        el.addEventListener("scroll", handleScroll, { passive: true });
        return () => el.removeEventListener("scroll", handleScroll);
    }, [threshold]);

    return { scrolled, ref };
};

export default useScrolled;