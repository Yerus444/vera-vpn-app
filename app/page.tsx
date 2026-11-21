"use client";

import { useState, useEffect } from "react";
import { Shield, ChevronRight, Globe2, Zap, Activity, Sparkles, Clock, Users, Power } from "lucide-react";
import Link from "next/link";
import { mockUser } from "@/lib/mock-data";
import { useVpn } from "@/lib/vpn-context";

export default function HomePage() {
  // Используем toggleConnection вместо setIsConnected
  const { isConnected, toggleConnection, selectedCountry, caseCooldown, vpnSessions, totalVisitors } = useVpn();
  
  const [isCaseAvailable, setIsCaseAvailable] = useState(false);
  const [timeLeftStr, setTimeLeftStr] = useState("");

  // Проверка доступности кейса
  useEffect(() => {
    const check = () => {
      const now = Date.now();
      const available = now > caseCooldown;
      setIsCaseAvailable(available);
      
      if (!available) {
        const diff = caseCooldown - now;
        const h = Math.floor(diff / 3600000).toString().padStart(2, "0");
        const m = Math.floor((diff % 3600000) / 60000).toString().padStart(2, "0");
        setTimeLeftStr(`${h}:${m}`);
      }
    };
    check();
    const interval = setInterval(check, 1000);
    return () => clearInterval(interval);
  }, [caseCooldown]);
  
  return (
    <div className="page-transition px-5 pt-6 relative overflow-hidden min-h-full pb-10">
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-accent/20 rounded-full blur-[100px] pointer-events-none" />
      <Globe2 size={300} className="absolute top-10 left-1/2 -translate-x-1/2 text-white/[0.03] pointer-events-none" strokeWidth={0.5} />

      <div className="relative z-10 flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">VERA VPN</h1>
          <p className="text-accent text-xs font-medium tracking-widest uppercase">Premium</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-card/80 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-lg">
          <Shield size={20} className="text-accent" />
        </div>
      </div>

      <div className="relative z-10 bg-card/80 backdrop-blur-xl rounded-[32px] p-6 border border-white/10 flex flex-col items-center gap-5 mb-6 shadow-2xl shadow-black/50">
        <button
          onClick={() => toggleConnection(!isConnected)} // Используем toggleConnection
          className={`relative w-32 h-32 rounded-full flex items-center justify-center transition-all duration-500 ${
            isConnected 
              ? "bg-accent/10 border-accent shadow-[0_0_40px_rgba(0,214,160,0.3)]" 
              : "bg-white/5 border-white/10 hover:border-white/20"
          } border-2`}
        >
          {isConnected && <div className="absolute inset-0 rounded-full border-2 border-accent animate-ping opacity-20" />}
          <Shield size={48} className={`transition-colors duration-300 ${isConnected ? "text-accent" : "text-text-secondary"}`} strokeWidth={1.5} />
        </button>

        <div className="text-center">
          <p className={`font-semibold text-lg ${isConnected ? "text-accent" : "text-white"}`}>
            {isConnected ? "Защищено" : "Не подключено"}
          </p>
          <p className="text-text-secondary text-xs mt-1">
            {isConnected ? "Ваш трафик зашифрован" : "Нажмите, чтобы включить защиту"}
          </p>
        </div>

        <button
          onClick={() => toggleConnection(!isConnected)} // Используем toggleConnection
          className={`w-full py-4 rounded-2xl font-bold text-base transition-all duration-300 active:scale-95 ${
            isConnected ? "bg-white/10 text-white hover:bg-white/15" : "bg-accent text-bg shadow-[0_0_20px_rgba(0,214,160,0.4)]"
          }`}
        >
          {isConnected ? "Отключить" : "Подключить"}
        </button>
      </div>

      <Link href="/locations" className="relative z-10 bg-card/80 backdrop-blur-md rounded-2xl p-4 border border-white/5 flex items-center justify-between mb-6 active:scale-[0.98] transition-all hover:bg-card">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-xl">{selectedCountry.flag}</div>
          <div>
            <p className="text-text-secondary text-[11px] uppercase tracking-wider font-semibold">Локация</p>
            <p className="font-medium text-sm">{selectedCountry.name}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-accent text-xs font-mono bg-accent/10 px-2 py-1 rounded-md">{selectedCountry.ping} ms</span>
          <ChevronRight size={18} className="text-text-secondary" />
        </div>
      </Link>

      <Link href="/case" className="relative z-10 block bg-gradient-to-br from-[#1A1D24] to-[#0F1115] rounded-[28px] p-4 border border-accent/30 mb-6 overflow-hidden flex items-center justify-between shadow-[0_0_20px_rgba(0,214,160,0.15)] active:scale-[0.98] transition-transform">
        <div className="absolute -left-4 -top-4 w-24 h-24 bg-accent/20 blur-2xl rounded-full" />
        
        <div className="flex items-center gap-4 z-10">
          <div className="relative w-16 h-14 bg-gradient-to-b from-gray-700 to-gray-900 rounded-lg border-2 border-gray-600 flex items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0.8)]">
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg" />
            <span className="text-accent text-2xl font-black italic drop-shadow-[0_0_10px_rgba(0,214,160,0.8)] z-10">V</span>
            
            {isCaseAvailable && (
              <span className="absolute -bottom-2 -right-2 bg-yellow-400 text-black text-[10px] font-black px-1.5 py-0.5 rounded shadow-[0_0_10px_rgba(250,204,21,0.6)] animate-pulse z-20">
                FREE
              </span>
            )}
          </div>
          
          <div>
            <p className="font-semibold text-base flex items-center gap-1">
              VERA Box <Sparkles size={16} className="text-accent" />
            </p>
            <p className="text-text-secondary text-xs mt-0.5">
              {isCaseAvailable ? "Испытай удачу и получи приз" : "Кейс откроется позже"}
            </p>
          </div>
        </div>

        <div className={`z-10 px-3 py-2 rounded-xl text-xs font-bold border flex items-center gap-1.5 ${
          isCaseAvailable 
            ? "bg-white/10 text-white border-white/5" 
            : "bg-black/30 text-text-secondary border-transparent"
        }`}>
          {isCaseAvailable ? "Открыть" : <><Clock size={12}/> {timeLeftStr}</>}
        </div>
      </Link>

      {/* СТАТИСТИКА */}
      <div className="relative z-10 mb-6">
        <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <Activity size={16} className="text-accent" /> Статистика системы
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {/* Защищенные сессии */}
          <div className="bg-card rounded-2xl p-4 border border-white/5 flex flex-col gap-1">
            <Power size={18} className="text-accent mb-1" />
            <p className="text-xl font-bold">{vpnSessions}</p>
            <p className="text-[10px] text-text-secondary">Защищенных сессий</p>
          </div>
          
          {/* Всего пользователей */}
          <div className="bg-card rounded-2xl p-4 border border-white/5 flex flex-col gap-1">
            <Users size={18} className="text-accent mb-1" />
            <p className="text-xl font-bold">{totalVisitors.toLocaleString('ru-RU')}</p>
            <p className="text-[10px] text-text-secondary">Всего пользователей</p>
          </div>
        </div>
      </div>

      <div className="relative z-10 bg-gradient-to-br from-card to-card/50 rounded-2xl p-5 border border-white/5 mt-8">
        <div className="flex justify-between items-start mb-3">
          <div>
            <p className="text-text-secondary text-xs mb-0.5">Ваша подписка</p>
            <p className="font-semibold text-lg">{mockUser.subscription.plan}</p>
          </div>
          <span className="text-[10px] font-bold bg-accent/20 text-accent px-2 py-1 rounded-full">ACTIVE</span>
        </div>
        <div className="h-1.5 bg-black/50 rounded-full overflow-hidden mt-4">
          <div className="h-full bg-accent w-[70%] rounded-full shadow-[0_0_10px_rgba(0,214,160,0.5)]" />
        </div>
      </div>
    </div>
  );
}