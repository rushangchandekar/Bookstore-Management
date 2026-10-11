import { useEffect, useRef } from "react";

/**
 * Animated floating particles background.
 * Renders subtle geometric shapes (circles, rings, squares, diamonds)
 * that drift and fade across the container.
 */
function ParticleField({ count = 30, className = "" }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const particles = [];
    const shapes = ["dot", "ring", "square", "diamond"];
    const colors = [
      "rgba(96, 165, 250, 0.4)",
      "rgba(167, 139, 250, 0.35)",
      "rgba(52, 211, 153, 0.3)",
      "rgba(34, 211, 238, 0.3)",
      "rgba(244, 114, 182, 0.25)",
      "rgba(251, 191, 36, 0.2)",
    ];

    for (let i = 0; i < count; i++) {
      const el = document.createElement("div");
      const shape = shapes[Math.floor(Math.random() * shapes.length)];
      const color = colors[Math.floor(Math.random() * colors.length)];
      const size = Math.random() * 6 + 2;
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const duration = Math.random() * 20 + 15;
      const delay = Math.random() * -20;

      el.style.cssText = `
        position: absolute;
        left: ${x}%;
        top: ${y}%;
        width: ${size}px;
        height: ${size}px;
        pointer-events: none;
        opacity: 0;
        animation: particleAnim${i % 3} ${duration}s ${delay}s linear infinite;
      `;

      if (shape === "dot") {
        el.style.borderRadius = "50%";
        el.style.background = color;
      } else if (shape === "ring") {
        el.style.borderRadius = "50%";
        el.style.border = `1px solid ${color}`;
        el.style.background = "transparent";
      } else if (shape === "square") {
        el.style.borderRadius = "2px";
        el.style.background = color;
      } else {
        el.style.borderRadius = "2px";
        el.style.background = color;
        el.style.transform = "rotate(45deg)";
      }

      container.appendChild(el);
      particles.push(el);
    }

    // Inject dynamic keyframes for unique movement paths
    const styleEl = document.createElement("style");
    styleEl.textContent = `
      @keyframes particleAnim0 {
        0% { opacity: 0; transform: translate(0, 0) scale(1); }
        10% { opacity: 0.6; }
        50% { opacity: 0.3; transform: translate(${rand(-80, 80)}px, ${rand(-120, -40)}px) scale(${rand(0.5, 1.5)}); }
        90% { opacity: 0.5; }
        100% { opacity: 0; transform: translate(${rand(-60, 60)}px, ${rand(-200, -60)}px) scale(1); }
      }
      @keyframes particleAnim1 {
        0% { opacity: 0; transform: translate(0, 0) scale(0.8); }
        15% { opacity: 0.5; }
        45% { opacity: 0.2; transform: translate(${rand(-100, 100)}px, ${rand(-80, -30)}px) scale(1.2); }
        85% { opacity: 0.4; }
        100% { opacity: 0; transform: translate(${rand(-40, 40)}px, ${rand(-160, -40)}px) scale(0.6); }
      }
      @keyframes particleAnim2 {
        0% { opacity: 0; transform: translate(0, 0) scale(1.2); }
        20% { opacity: 0.4; }
        60% { opacity: 0.6; transform: translate(${rand(-70, 70)}px, ${rand(-100, -20)}px) scale(0.9); }
        80% { opacity: 0.3; }
        100% { opacity: 0; transform: translate(${rand(-90, 90)}px, ${rand(-180, -50)}px) scale(1.1); }
      }
    `;
    container.appendChild(styleEl);

    return () => {
      particles.forEach((p) => p.remove());
      styleEl.remove();
    };
  }, [count]);

  return (
    <div
      ref={containerRef}
      className={`particle-field ${className}`}
      aria-hidden="true"
    />
  );
}

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default ParticleField;
