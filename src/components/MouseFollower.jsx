import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function MouseFollower() {
  const [trail, setTrail] = useState(
    Array.from({ length: 20 }, () => ({ x: 0, y: 0 })) // more dots = smoother snake
  );
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  useEffect(() => {
    const update = () => {
      setTrail((prev) => {
        const newTrail = [...prev];
        // Head follows cursor directly
        newTrail[0] = { x: mouse.x, y: mouse.y };
        // Each ball follows the one in front of it
        for (let i = 1; i < newTrail.length; i++) {
          const prevDot = newTrail[i - 1];
          const currDot = newTrail[i];
          const dx = prevDot.x - currDot.x;
          const dy = prevDot.y - currDot.y;
          newTrail[i] = {
            x: currDot.x + dx * 0.7, // higher value = closer together
            y: currDot.y + dy * 0.7,
          };
        }
        return newTrail;
      });
      requestAnimationFrame(update);
    };
    update();
  }, [mouse]);

  const colors = [
    "bg-pink-800",
    "bg-purple-800",
    "bg-blue-800",
    "bg-cyan-800",
    "bg-green-800",
    "bg-yellow-800",
    "bg-orange-800",
  ];

  return (
    <>
      {trail.map((p, i) => (
        <motion.div
          key={i}
          className={`fixed rounded-full pointer-events-none mix-blend-screen ${
            colors[i % colors.length]
          }`}
          style={{
            width: 12,
            height: 12,
            left: p.x - 6,
            top: p.y - 6,
            zIndex: 50,
            filter: "blur(1px) brightness(50)",
            opacity: 1 - i * 0.05, // fade tail slightly
          }}
        />
      ))}
    </>
  );
}
