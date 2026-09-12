import { useEffect, useRef } from "react";

type ConstellationFieldProps = {
  /** Opacity canvas (default 1). */
  opacity?: number;
  className?: string;
};

const LINK = 160;
const STROKE = "#8B6914"; // varian light dari #E6C879 agar terbaca di tema terang
const MIN_NODES = 30;
const MAX_NODES = 90;

// ponytail: cek link O(n²), aman untuk <100 node; pakai spatial hash kalau density dibesarkan jauh
export default function ConstellationField({
  opacity = 1,
  className = "",
}: ConstellationFieldProps) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let raf = 0;
    let nodes: { x: number; y: number; vx: number; vy: number; r: number }[] =
      [];
    const pointer = { x: -9999, y: -9999 };

    const seed = () => {
      const count = Math.max(
        MIN_NODES,
        Math.min(MAX_NODES, Math.round((w * h) / 22000)),
      );
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 2.4 + 1.8,
      }));
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    const draw = (now: number) => {
      ctx.clearRect(0, 0, w, h);

      ctx.strokeStyle = STROKE;
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.hypot(dx, dy);
          if (d < LINK) {
            ctx.globalAlpha = 0.22 + (1 - d / LINK) * 0.55;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      ctx.fillStyle = STROKE;
      for (const n of nodes) {
        const pulse = 0.78 + Math.sin(now * 0.001 + n.x) * 0.22;
        ctx.globalAlpha = pulse * 0.28;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * 2.4, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = pulse;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const step = (now: number) => {
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
        if (Math.hypot(n.x - pointer.x, n.y - pointer.y) < 220) {
          n.x -= (n.x - pointer.x) * 0.005;
          n.y -= (n.y - pointer.y) * 0.005;
        }
      }
      draw(now);
      raf = requestAnimationFrame(step);
    };

    const onMove = (e: PointerEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
    };
    const onLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove);
    document.documentElement.addEventListener("mouseleave", onLeave);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      draw(0); // satu frame statis, tanpa loop
    } else {
      raf = requestAnimationFrame(step);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={`pointer-events-none fixed inset-0 -z-10 h-full w-full ${className}`}
      style={{ opacity }}
    />
  );
}
