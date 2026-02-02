import { motion, useMotionValue, useTransform } from "framer-motion";

export default function InteractiveCard() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [15, -15]);
  const rotateY = useTransform(x, [-100, 100], [-15, 15]);

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;
    x.set(offsetX);
    y.set(offsetY);
  }

  return (
    <motion.div
      className="w-80 h-80 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-2xl shadow-xl flex items-center justify-center text-white text-xl font-semibold"
      style={{ rotateX, rotateY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      Hover Me ✨
    </motion.div>
  );
}


