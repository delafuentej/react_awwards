import { useState, useRef } from "react";

const BentoTilt = ({ children, className = "" }) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef();

  const handleMouseMove = (e) => {
    if (!itemRef.current) return;

    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect();
    const relativeX = (e.clientX - left) / width;
    const relativeY = (e.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * 20; // puedes ajustar estos valores
    const tiltY = (relativeX - 0.5) * -20;

    const newTransform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(0.98, 0.98, 0.98)`;

    // Usa requestAnimationFrame para suavidad
    requestAnimationFrame(() => {
      setTransformStyle(newTransform);
    });
  };

  const handleMouseLeave = () => {
    setTransformStyle(
      "perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)"
    );
  };

  return (
    <div
      ref={itemRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`${className} transition-transform duration-300 ease-out will-change-transform`}
      style={{
        transform: transformStyle,
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </div>
  );
};

export default BentoTilt;
