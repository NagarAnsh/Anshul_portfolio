import { useEffect, useRef } from "react";

const DOTS = 20;
const colors = [
  "bg-pink-800",
  "bg-purple-800",
  "bg-blue-800",
  "bg-cyan-800",
  "bg-green-800",
  "bg-yellow-800",
  "bg-orange-800",
];

export default function MouseFollower() {
  const containerRef = useRef(null);

  useEffect(() => {
    const isTouch = window.matchMedia("(hover: none)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || reducedMotion) return;

    const dots = containerRef.current.children;
    const positions = Array.from({ length: DOTS }, () => ({ x: -50, y: -50 }));
    const mouse = { x: -50, y: -50 };

    const handleMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener("mousemove", handleMove);

    let raf;
    const update = () => {
      positions[0].x = mouse.x;
      positions[0].y = mouse.y;
      for (let i = 1; i < DOTS; i++) {
        positions[i].x += (positions[i - 1].x - positions[i].x) * 0.7;
        positions[i].y += (positions[i - 1].y - positions[i].y) * 0.7;
      }
      for (let i = 0; i < DOTS; i++) {
        dots[i].style.transform = `translate(${positions[i].x - 6}px, ${positions[i].y - 6}px)`;
      }
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-50 overflow-hidden"
    >
      {Array.from({ length: DOTS }, (_, i) => (
        <div
          key={i}
          className={`absolute top-0 left-0 rounded-full mix-blend-screen ${colors[i % colors.length]}`}
          style={{
            width: 12,
            height: 12,
            transform: "translate(-50px, -50px)",
            filter: "blur(1px) brightness(50)",
            opacity: 1 - i * 0.05,
          }}
        />
      ))}
    </div>
  );
}
