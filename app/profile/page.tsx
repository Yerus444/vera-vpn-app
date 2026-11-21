"use client";

import { useState } from "react";
import { ChevronLeft, Calendar, MonitorSmartphone, Headphones, Crown, Users, Copy, Check, Send } from "lucide-react";
import Link from "next/link";
import { mockUser } from "@/lib/mock-data";
import { useSignal, initData } from "@telegram-apps/sdk-react";
import { motion, AnimatePresence } from "framer-motion";
import { useVpn } from "@/lib/vpn-context";

export default function ProfilePage() {
  const tgUser = useSignal(initData.user);
  const displayName = tgUser?.first_name ?? mockUser.firstName;
  const [copied, setCopied] = useState(false);
  
  // Теперь берем только invitedFriends
  const { invitedFriends } = useVpn();

  const referralLink = `https://t.me/vera_vpn_bot?start=ref_${mockUser.referralCode}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    const text = "Попробуй премиальный VERA VPN! Быстро, безопасно и без рекламы.";
    const shareUrl = `https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent(text)}`;
    window.open(shareUrl, "_blank");
  };

  return (
    <div className="page-transition px-5 pt-6 relative min-h-full pb-10">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/" className="p-2 -ml-2 bg-white/5 rounded-full active:scale-90 transition-transform">
          <ChevronLeft size={20} />
        </Link>
        <h1 className="text-xl font-semibold">Профиль</h1>
      </div>

      {/* Карточка пользователя */}
      <div className="bg-gradient-to-r from-card to-card/50 rounded-[32px] p-6 border border-white/10 flex items-center gap-4 mb-6 relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl -mr-10 -mt-10" />
        <div className="w-16 h-16 rounded-full bg-accent/20 border-2 border-accent/30 flex items-center justify-center text-2xl font-bold text-accent shadow-[0_0_15px_rgba(0,214,160,0.2)]">
          {displayName.charAt(0)}
        </div>
        <div className="relative z-10">
          <p className="font-semibold text-xl">{displayName}</p>
          <p className="text-text-secondary text-sm">
            {tgUser?.username ? `@${tgUser.username}` : mockUser.username}
          </p>
          <div className="flex items-center gap-1 mt-1 text-accent text-xs font-medium bg-accent/10 w-max px-2 py-0.5 rounded-full">
            <Crown size={12} />
            <span>Premium</span>
          </div>
        </div>
      </div>

      {/* БЛОК ДРУЗЕЙ */}
      <div className="bg-gradient-to-br from-[#1A1D24] to-[#0F1115] rounded-[28px] p-5 border border-accent/20 mb-6 relative overflow-hidden shadow-[0_0_20px_rgba(0,214,160,0.1)]">
        <div className="absolute -right-6 -top-6 w-32 h-32 bg-accent/10 blur-2xl rounded-full pointer-events-none" />
        
        <div className="flex items-center gap-3 mb-3 relative z-10">
          <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center border border-accent/30">
            <Users size={20} className="text-accent" />
          </div>
          <div>
            <h3 className="font-semibold text-white">Друзья</h3>
            <p className="text-text-secondary text-xs">Получай +3 дня за каждого друга</p>
          </div>
        </div>

        <div className="flex gap-2 mb-4 relative z-10">
          <div className="flex-1 bg-black/40 rounded-xl p-3 border border-white/5 flex flex-col items-center justify-center">
            <span className="text-2xl font-black text-white">{invitedFriends}</span>
            <span className="text-[10px] text-text-secondary uppercase tracking-wider mt-0.5">Приглашено</span>
          </div>
          <div className="flex-1 bg-black/40 rounded-xl p-3 border border-white/5 flex flex-col items-center justify-center">
            <span className="text-2xl font-black text-accent">+{invitedFriends * 3}</span>
            <span className="text-[10px] text-text-secondary uppercase tracking-wider mt-0.5">Дней получено</span>
          </div>
        </div>

        <div className="relative z-10 space-y-2">
          <div className="flex items-center bg-black/50 border border-white/10 rounded-xl overflow-hidden p-1">
            <input 
              type="text" 
              readOnly 
              value={referralLink} 
              className="bg-transparent text-text-secondary text-xs px-3 py-2 flex-1 outline-none overflow-hidden text-ellipsis whitespace-nowrap"
            />
            <button onClick={handleCopy} className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors relative">
              <AnimatePresence mode="wait">
                {copied ? (
                  <motion.div key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}><Check size={16} className="text-accent" /></motion.div>
                ) : (
                  <motion.div key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}><Copy size={16} className="text-white" /></motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
          
          <button onClick={handleShare} className="w-full py-3 bg-accent text-bg font-bold rounded-xl active:scale-95 transition-transform flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(0,214,160,0.3)]">
            <Send size={16} /> Пригласить друга
          </button>
        </div>
      </div>

      {/* Информационные карточки */}
      <div className="space-y-3">
        <div className="bg-card rounded-2xl p-4 border border-white/5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
            <Calendar size={18} className="text-accent" />
          </div>
          <div>
            <p className="text-text-secondary text-xs">Подписка</p>
            <p className="font-medium text-sm">{mockUser.subscription.plan} · до {mockUser.subscription.expires}</p>
          </div>
        </div>

        <div className="bg-card rounded-2xl p-4 border border-white/5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
            <MonitorSmartphone size={18} className="text-accent" />
          </div>
          <div className="w-full">
            <div className="flex justify-between items-center mb-1">
              <p className="text-text-secondary text-xs">Подключенные устройства</p>
              <span className="text-[10px] font-medium text-white/50">Лимит: {mockUser.subscription.maxDevices}</span>
            </div>
            <div className="flex gap-1">
               {[1, 2, 3].map(i => <div key={i} className="h-1.5 flex-1 bg-accent rounded-full shadow-[0_0_5px_rgba(0,214,160,0.5)]" />)}
               {[4, 5].map(i => <div key={i} className="h-1.5 flex-1 bg-white/10 rounded-full" />)}
            </div>
            <p className="font-medium text-xs mt-1">Активно {mockUser.subscription.devices} устройства</p>
          </div>
        </div>

        <button className="w-full bg-card rounded-2xl p-4 border border-white/5 flex items-center gap-4 active:scale-[0.98] transition-transform mt-2">
          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
            <Headphones size={18} className="text-accent" />
          </div>
          <div className="text-left">
            <p className="text-text-secondary text-xs">Поддержка</p>
            <p className="font-medium text-sm">Написать в Telegram</p>
          </div>
        </button>
      </div>

      <p className="text-text-secondary/50 text-xs text-center mt-10 pb-4">
        VERA VPN · Luxury Dark · v0.1.0
      </p>
    </div>
  );
}