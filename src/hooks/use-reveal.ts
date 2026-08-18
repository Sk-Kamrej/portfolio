import { useEffect, useRef, useState } from "react";

export function useReveal<T extends HTMLElement = HTMLDivElement>(threshold = 0.15) {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            io.unobserve(e.target);
          }
        });
      },
      { threshold, rootMargin: "0px 0px -60px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return { ref, visible };
}

export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0] ?? "");

  useEffect(() => {
    const updateActive = () => {
      const scrollPosition = window.scrollY + 150;

      // If we are at the bottom of the page,
      // activate the last section.
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 20;

      if (atBottom) {
        const lastId = ids[ids.length - 1];

        if (lastId) {
          setActive(lastId);
        }

        return;
      }

      let current = ids[0] ?? "";

      for (const id of ids) {
        const section = document.getElementById(id);

        if (!section) continue;

        const sectionTop = section.getBoundingClientRect().top + window.scrollY;

        if (sectionTop <= scrollPosition) {
          current = id;
        }
      }

      setActive(current);
    };

    updateActive();

    window.addEventListener("scroll", updateActive, {
      passive: true,
    });

    window.addEventListener("resize", updateActive);

    return () => {
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
    };
  }, [ids]);

  return active;
}
