"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, MapPin, Crown, User, Gift } from "lucide-react";
import { useVpn } from "@/lib/vpn-context";
import { useEffect, useState } from "react";

const items = [
  { href: "/", label: "Главная", icon: Home },
  { href: "/locations", label: "Локации", icon: MapPin },
  { href: "/case", label: "Кейс", icon: Gift, isCenter: true },
  { href: "/subscription", label: "Подписка", icon: Crown },
  { href: "/profile", label: "Профиль", icon: User },
];

export default function BottomNav() {
  const pathname = usePathname();
  const { caseCooldown } = useVpn();
  const [isAvailable, setIsAvailable] = useState(false);

  // Проверяем доступность кейса каждую секунду
  useEffect(() => {
    const check = () => setIsAvailable(Date.now() > caseCooldown);
    check();
    const interval = setInterval(check, 1000);
    return () => clearInterval(interval);
  }, [caseCooldown]);

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 bg-[#090A0D]/80 backdrop-blur-xl border-t border-white/5 flex justify-around items-end pb-[calc(8px+env(safe-area-inset-bottom))] shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
      {items.map(({ href, label, icon: Icon, isCenter }) => {
        const active = pathname === href;
        
        // Специальный стиль для центральной кнопки (Кейс)
        if (isCenter) {
          return (
            <Link
              key={href}
              href={href}
              className="relative flex flex-col items-center justify-center -mt-4"
            >
              {/* Желтая плашка FREE, если кейс доступен */}
              {isAvailable && (
                <span className="absolute -top-2 bg-yellow-400 text-black text-[9px] font-black px-1.5 py-0.5 rounded shadow-[0_0_10px_rgba(250,204,21,0.8)] animate-pulse z-10">
                  FREE
                </span>
              )}
              <div className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
                active 
                  ? "bg-accent text-bg shadow-[0_0_20px_rgba(0,214,160,0.4)] border-2 border-accent" 
                  : "bg-card text-white border border-white/10"
              }`}>
                <Icon size={26} strokeWidth={active ? 2.5 : 2} />
              </div>
            </Link>
          );
        }

        // Обычные кнопки
        return (
          <Link
            key={href}
            href={href}
            className={`flex flex-col items-center gap-1 text-[10px] font-medium transition-all duration-300 pb-1 ${
              active ? "text-accent -translate-y-1" : "text-text-secondary hover:text-white/70"
            }`}
          >
            <div className={`p-1.5 rounded-xl transition-colors ${active ? "bg-accent/10" : ""}`}>
              <Icon size={22} strokeWidth={active ? 2.5 : 2} />
            </div>
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}