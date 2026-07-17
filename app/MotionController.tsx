"use client";

import { useEffect } from "react";

export function MotionController() {
  useEffect(() => {
    const root = document.documentElement;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const navigation = document.querySelector<HTMLElement>(".nav-shell");
    const updateNavigation = () => {
      navigation?.classList.toggle("nav-scrolled", window.scrollY > 32);
    };
    updateNavigation();
    window.addEventListener("scroll", updateNavigation, { passive: true });

    if (reduceMotion) {
      root.classList.add("reduce-motion");
      return () => window.removeEventListener("scroll", updateNavigation);
    }

    root.classList.add("motion-ready");

    const groups = [
      {
        selector:
          ".section-heading > *, .tech-copy > *, .service-copy > *, .community > *, .contact > *",
        type: "motion-up",
      },
      { selector: ".model-card", type: "motion-card" },
      { selector: ".service-visual, .tech-orbit", type: "motion-visual" },
    ];

    const items: HTMLElement[] = [];
    groups.forEach(({ selector, type }) => {
      document.querySelectorAll<HTMLElement>(selector).forEach((element, index) => {
        element.classList.add("motion-item", type);
        element.style.setProperty("--motion-delay", `${(index % 3) * 120}ms`);
        items.push(element);
      });
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" },
    );

    items.forEach((item) => observer.observe(item));
    requestAnimationFrame(() => document.body.classList.add("page-loaded"));

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateNavigation);
      root.classList.remove("motion-ready");
      document.body.classList.remove("page-loaded");
    };
  }, []);

  return null;
}
