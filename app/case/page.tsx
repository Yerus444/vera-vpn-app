"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, Star, Crown, Zap, ShieldCheck, Clock, Percent } from "lucide-react";
import Link from "next/link";
import { motion, useMotionValue, useTransform, animate, AnimatePresence, MotionValue } from "framer-motion";
import { useVpn } from "@/lib/vpn-context";

const prizes = [
  { id: 1, name: "1 день", icon: Clock, bg: "from-blue-500/20 to-blue-900/40", border: "border-blue-500/30", text: "text-blue-400" },
  { id: 2, name: "3 дня", icon: Zap, bg: "from-emerald-500/20 to-emerald-900/40", border: "border-emerald-500/30", text: "text-emerald-400" },
  { id: 3, name: "7 дней", icon: Star, bg: "from-purple-500/20 to-purple-900/40", border: "border-purple-500/30", text: "text-purple-400" },
  { id: 4, name: "Скидка 10%", icon: Percent, bg: "from-yellow-500/20 to-yellow-900/40", border: "border-yellow-500/30", text: "text-yellow-400" },
  { id: 5, name: "1 месяц", icon: Crown, bg: "from-orange-500/20 to-orange-900/40", border: "border-orange-500/30", text: "text-orange-400" },
  { id: 6, name: "Премиум", icon: ShieldCheck, bg: "from-accent/20 to-accent/5", border: "border-accent/40", text: "text-accent" },
];

const rouletteItems = Array.from({ length: 200 }).map((_, i) => ({
  ...prizes[i % prizes.length],
  uniqueId: i
}));

const ITEM_WIDTH = 80; 

interface RouletteItemProps {
  index: number;
  x: MotionValue<number>;
  prize: typeof prizes[0];
  containerWidth: number;
}

const RouletteItem = ({ index, x, prize, containerWidth }: RouletteItemProps) => {
  // Центр карточки
  const itemCenter = useTransform(x, (latestX: number) => latestX + (index * ITEM_WIDTH) + 36);

  // ПЛАВНАЯ ИНТЕРПОЛЯЦИЯ: 
  // Указываем точки [слева от центра, центр, справа от центра] -> [маленький, большой, маленький]
  // containerWidth / 2 - это центр экрана.
  const scale = useTransform(
    itemCenter,
    [containerWidth / 2 - 100, containerWidth / 2, containerWidth / 2 + 100],
    [0.8, 1.15, 0.8] // Плавно от 0.8 до 1.15 и обратно
  );

  const opacity = useTransform(
    itemCenter,
    [containerWidth / 2 - 100, containerWidth / 2, containerWidth / 2 + 100],
    [0.3, 1, 0.3]
  );

  return (
    <motion.div
      style={{ scale, opacity }}
      className={`flex-shrink-0 w-[72px] h-[72px] rounded-xl flex flex-col items-center justify-center gap-1 border ${prize.bg} ${prize.border}`}
    >
      <prize.icon size={20} className={`${prize.text} drop-shadow-[0_0_5px_currentColor]`} />
      <span className={`text-[10px] font-bold ${prize.text} text-center px-1 leading-tight`}>
        {prize.name}
      </span>
    </motion.div>
  );
};

export default function CasePage() {
  const { caseCooldown, setCaseCooldown } = useVpn();
  const [result, setResult] = useState<typeof prizes[0] | null>(null);
  const [state, setState] = useState<"idle" | "spinning" | "cooldown">("idle");
  const [timeLeftStr, setTimeLeftStr] = useState("");
  
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const x = useMotionValue(0);

  useEffect(() => {
    if (containerRef.current) {
      const width = containerRef.current.offsetWidth;
      if (width > 0) {
        setContainerWidth(width);
        const initialX = width / 2 - 36 - (100 * ITEM_WIDTH);
        x.set(initialX);
        if (Date.now() < caseCooldown) {
          setState("cooldown");
        }
      }
    }
  }, [caseCooldown]);

  useEffect(() => {
    if (state !== "cooldown") return;
    const interval = setInterval(() => {
      const diff = caseCooldown - Date.now();
      if (diff <= 0) {
        setState("idle");
        clearInterval(interval);
      } else {
        const h = Math.floor(diff / 3600000).toString().padStart(2, "0");
        const m = Math.floor((diff % 3600000) / 60000).toString().padStart(2, "0");
        const s = Math.floor((diff % 60000) / 1000).toString().padStart(2, "0");
        setTimeLeftStr(`${h}:${m}:${s}`);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [state, caseCooldown]);

  const handleOpen = async () => {
    if (state !== "idle") return;
    setState("spinning");
    setResult(null);

    const currentX = x.get();
    await animate(x, currentX + 40, { duration: 0.4, ease: "easeOut" });
    const winningIndex = Math.floor(Math.random() * 20) + 140; 
    const targetX = containerWidth / 2 - 36 - (winningIndex * ITEM_WIDTH);

    animate(x, targetX, {
      duration: 6, 
      ease: [0.1, 0.8, 0.2, 1],
      onComplete: () => {
        setState("cooldown");
        setResult(prizes[winningIndex % prizes.length]);
        setCaseCooldown(Date.now() + 24 * 60 * 60 * 1000); 
      }
    });
  };

  return (
    <div className="page-transition px-5 pt-6 relative min-h-full pb-10 overflow-hidden">
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[250px] h-[250px] bg-accent/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="flex items-center gap-3 mb-6 relative z-10">
        <Link href="/" className="p-2 -ml-2 bg-white/5 rounded-full active:scale-90 transition-transform">
          <ChevronLeft size={20} />
        </Link>
        <h1 className="text-xl font-semibold">VERA Box</h1>
      </div>

      <div className="flex flex-col items-center justify-center mb-6 relative z-10">
        <div className="relative w-24 h-20 bg-gradient-to-b from-gray-600 to-gray-900 rounded-xl border-2 border-gray-500 shadow-[0_0_40px_rgba(0,214,160,0.2)] flex items-center justify-center mb-3">
           <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-xl" />
           <span className="text-accent text-4xl font-black italic drop-shadow-[0_0_20px_rgba(0,214,160,0.8)] z-10">V</span>
        </div>
        <h2 className="text-xl font-bold mb-1">VERA Box</h2>
        <p className="text-text-secondary text-[10px] uppercase tracking-wider">Ежедневный бесплатный кейс</p>
      </div>

      <div className="relative z-10 bg-[#0F1115] border border-accent/20 rounded-2xl py-4 mb-6 overflow-hidden shadow-[0_0_30px_rgba(0,214,160,0.1)]" ref={containerRef}>
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2px] bg-accent z-20 shadow-[0_0_15px_#00D6A0] pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 border-l-[5px] border-r-[5px] border-t-[8px] border-l-transparent border-r-transparent border-t-accent z-20 pointer-events-none" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 border-l-[5px] border-r-[5px] border-b-[8px] border-l-transparent border-r-transparent border-b-accent z-20 pointer-events-none" />

        <div className="relative h-24 flex items-center overflow-hidden">
          <motion.div className="flex gap-2" style={{ x }}>
            {rouletteItems.map((item, index) => (
              <RouletteItem key={item.uniqueId} index={index} x={x} prize={item} containerWidth={containerWidth} />
            ))}
          </motion.div>
        </div>
      </div>

      <motion.button
        onClick={handleOpen}
        disabled={state !== "idle"}
        whileTap={state === "idle" ? { scale: 0.95 } : {}}
        className={`relative flex items-center justify-center w-full h-[56px] rounded-2xl font-bold text-base transition-colors duration-300 mb-8 z-10 overflow-hidden ${
          state === "cooldown" 
            ? "bg-white/5 text-text-secondary border border-white/10" 
            : state === "spinning" 
              ? "bg-accent/80 text-bg cursor-wait" 
              : "bg-accent text-bg shadow-[0_0_20px_rgba(0,214,160,0.4)]"
        }`}
      >
        <AnimatePresence mode="wait">
          {state === "idle" && <motion.span key="idle" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} className="absolute">Открыть кейс</motion.span>}
          {state === "spinning" && <motion.span key="spinning" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} className="absolute">Крутим...</motion.span>}
          {state === "cooldown" && <motion.span key="cooldown" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} className="absolute flex items-center gap-2"><Clock size={18} /> {timeLeftStr || "00:00:00"}</motion.span>}
        </AnimatePresence>
      </motion.button>

      {result && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-50 flex items-center justify-center p-5 bg-black/80 backdrop-blur-sm">
          <motion.div initial={{ scale: 0.8, y: 20 }} animate={{ scale: 1, y: 0 }} transition={{ type: "spring", bounce: 0.5 }} className="bg-card w-full max-w-sm rounded-[32px] p-6 border border-accent/30 text-center relative overflow-hidden shadow-[0_0_50px_rgba(0,214,160,0.2)]">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-accent/10 to-transparent pointer-events-none" />
            <h3 className="text-2xl font-black mb-6 relative z-10 text-white">Ваш выигрыш!</h3>
            <div className={`w-32 h-32 mx-auto rounded-2xl bg-gradient-to-br ${result.bg} border ${result.border} flex flex-col items-center justify-center mb-6 shadow-lg relative z-10`}>
               <result.icon size={48} className={`${result.text} drop-shadow-[0_0_10px_currentColor] mb-2`} />
               <span className={`text-sm font-bold ${result.text}`}>{result.name}</span>
            </div>
            <button onClick={() => setResult(null)} className="w-full py-3 rounded-xl bg-white/10 text-white font-semibold active:scale-95 transition-transform relative z-10 hover:bg-white/15">Забрать</button>
          </motion.div>
        </motion.div>
      )}

      <div className="relative z-10">
        <div className="text-center mb-4">
          <h3 className="text-lg font-bold">Что может выпасть</h3>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {prizes.map((prize) => (
            <div key={prize.id} className={`bg-gradient-to-br ${prize.bg} border ${prize.border} rounded-2xl p-3 flex flex-col items-center justify-center relative overflow-hidden group`}>
              <prize.icon size={36} className={`${prize.text} mb-2 drop-shadow-[0_0_8px_currentColor]`} strokeWidth={1.5} />
              <p className="text-xs font-semibold text-white/90 text-center">{prize.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}