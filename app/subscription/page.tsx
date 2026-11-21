"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, Check, Star, Shield, Zap, Crown, Sparkles, AlertCircle } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

// Добавляем типизацию для window.Telegram, чтобы TypeScript не ругался
declare global {
  interface Window {
    Telegram?: {
      WebApp: {
        initData: string;
        initDataUnsafe: { user?: { id: number } };
        openInvoice: (url: string, callback: (status: string) => void) => void;
        close: () => void;
      };
    };
  }
}

const plans = [
  { id: "1m", title: "1 месяц", monthlyPrice: 249, oldMonthlyPrice: 399, totalPrice: 249, discount: 38, icon: Shield, gradient: "from-blue-500/10 to-blue-900/20", border: "border-blue-500/20", text: "text-blue-400" },
  { id: "3m", title: "3 месяца", monthlyPrice: 199, oldMonthlyPrice: 399, totalPrice: 597, discount: 50, icon: Zap, gradient: "from-accent/15 to-accent/5", border: "border-accent/40", text: "text-accent", glow: "shadow-[0_0_30px_rgba(0,214,160,0.2)]", isPopular: true },
  { id: "12m", title: "12 месяцев", monthlyPrice: 149, oldMonthlyPrice: 399, totalPrice: 1788, discount: 63, icon: Crown, gradient: "from-purple-500/15 to-purple-900/20", border: "border-purple-500/30", text: "text-purple-400", glow: "shadow-[0_0_30px_rgba(168,85,247,0.15)]" },
];

export default function SubscriptionPage() {
  const [selectedPlanId, setSelectedPlanId] = useState("3m");
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const selectedPlan = plans.find(p => p.id === selectedPlanId)!;

  // Очищаем ошибку при смене тарифа
  useEffect(() => {
    setErrorMsg("");
  }, [selectedPlanId]);

  const handlePay = async () => {
    setIsPurchasing(true);
    setErrorMsg("");

    // 1. Проверяем, что мы внутри Telegram
    if (typeof window === "undefined" || !window.Telegram?.WebApp?.initData) {
      setIsPurchasing(false);
      setErrorMsg("Для оплаты откройте приложение через Telegram.");
      return;
    }

    try {
      // 2. Отправляем запрос на наш сервер для создания счета
      const res = await fetch('/api/create-invoice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          planId: selectedPlanId,
          userTelegramId: window.Telegram.WebApp.initDataUnsafe?.user?.id 
        }),
      });
      
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || "Ошибка сервера");

      // 3. Открываем окно оплаты Telegram
      if (window.Telegram?.WebApp?.openInvoice && data.invoiceLink) {
        window.Telegram.WebApp.openInvoice(data.invoiceLink, (status) => {
          if (status === "paid") {
            setIsSuccess(true);
          } else if (status === "cancelled") {
            setErrorMsg("Оплата была отменена.");
            setIsPurchasing(false);
          } else if (status === "failed") {
            setErrorMsg("Ошибка при проведении платежа.");
            setIsPurchasing(false);
          }
        });
      } else {
        throw new Error("Метод оплаты не поддерживается.");
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Не удалось создать счет.");
      setIsPurchasing(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="page-transition px-5 pt-20 flex flex-col items-center justify-center text-center relative z-10">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", bounce: 0.5 }} className="w-24 h-24 rounded-full bg-accent/20 flex items-center justify-center mb-6">
          <Check size={48} className="text-accent" />
        </motion.div>
        <h2 className="text-2xl font-bold mb-2">Оплата прошла!</h2>
        <p className="text-text-secondary text-sm mb-8">Ваша подписка VERA VPN активирована на {selectedPlan.title}.</p>
        <Link href="/" className="w-full py-4 rounded-2xl bg-accent text-bg font-bold shadow-[0_0_20px_rgba(0,214,160,0.4)] active:scale-95 transition-transform">
          На главную
        </Link>
      </div>
    );
  }

  return (
    <div className="page-transition px-5 pt-6 relative min-h-full pb-10">
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-accent/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="flex items-center gap-3 mb-6 relative z-10">
        <Link href="/" className="p-2 -ml-2 bg-white/5 rounded-full active:scale-90 transition-transform">
          <ChevronLeft size={20} />
        </Link>
        <h1 className="text-xl font-semibold">Подписка</h1>
      </div>

      <div className="text-center mb-8 relative z-10">
        <h2 className="text-2xl font-bold mb-2 flex items-center justify-center gap-2">
          Выберите тариф <Sparkles size={20} className="text-accent" />
        </h2>
        <p className="text-text-secondary text-sm">Чем дольше период, тем выгоднее</p>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-8 relative z-10">
        {plans.map((plan) => {
          const active = selectedPlanId === plan.id;
          return (
            <button
              key={plan.id}
              onClick={() => setSelectedPlanId(plan.id)}
              className={`relative rounded-3xl p-3 flex flex-col items-center justify-between min-h-[240px] border transition-all duration-300 ${
                active 
                  ? `bg-gradient-to-b ${plan.gradient} ${plan.border} ${plan.glow} scale-[1.02]` 
                  : "bg-card border-white/5 hover:border-white/10"
              }`}
            >
              {plan.discount > 0 && (
                <div className="absolute -top-2.5 bg-red-500 text-white text-[9px] font-black px-2 py-0.5 rounded shadow-[0_0_10px_rgba(239,68,68,0.5)] z-20">
                  -{plan.discount}%
                </div>
              )}
              {plan.isPopular && (
                <div className="absolute -top-2.5 -right-1 bg-accent text-bg text-[8px] font-black px-2 py-0.5 rounded-full shadow-[0_0_10px_rgba(0,214,160,0.6)] z-20">
                  ХИТ
                </div>
              )}
              <div className="flex-1 flex items-center justify-center w-full mt-3">
                <plan.icon size={40} className={`${active ? plan.text : "text-text-secondary/40"} transition-colors drop-shadow-[0_0_10px_currentColor]`} strokeWidth={1.5} />
              </div>
              <div className="text-center w-full mt-auto">
                <p className={`text-[11px] font-semibold mb-2 ${active ? "text-white" : "text-text-secondary"}`}>{plan.title}</p>
                <div className="flex flex-col items-center justify-center min-h-[44px]">
                  <div className="flex items-baseline gap-0.5">
                    <span className={`text-xl font-black leading-none ${active ? "text-white" : "text-text-secondary"}`}>{plan.monthlyPrice}</span>
                    <span className="text-[9px] text-text-secondary">⭐/мес</span>
                  </div>
                  <div className="h-4 mt-1">
                    <span className="text-[11px] text-text-secondary/50 line-through font-medium">{plan.oldMonthlyPrice}</span>
                  </div>
                </div>
                <div className={`mt-1 py-1.5 px-1 rounded-lg w-full ${active ? "bg-white/10" : "bg-black/30"}`}>
                  <span className={`text-[10px] font-bold ${active ? "text-white" : "text-text-secondary"}`}>Итого: {plan.totalPrice} ⭐</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="bg-card border border-white/5 rounded-3xl p-5 mb-8 relative z-10">
        <h3 className="font-semibold mb-3">Что входит в подписку:</h3>
        <ul className="space-y-2.5">
          {["Безлимитный трафик", "Серверы в 30+ странах", "До 5 устройств одновременно", "Защита от утечек DNS и WebRTC"].map((feature, i) => (
            <li key={i} className="flex items-center gap-2 text-sm text-text-secondary">
              <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                <Check size={12} className="text-accent" />
              </div>
              {feature}
            </li>
          ))}
        </ul>
      </div>

      {errorMsg && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-2 text-red-400 text-xs relative z-10">
          <AlertCircle size={16} /> {errorMsg}
        </div>
      )}

      <motion.button
        onClick={handlePay}
        disabled={isPurchasing}
        whileTap={{ scale: 0.95 }}
        className={`w-full py-4 rounded-2xl font-bold text-base transition-all duration-300 relative z-10 flex items-center justify-between px-6 ${
          isPurchasing ? "bg-accent/50 text-bg cursor-wait" : "bg-accent text-bg shadow-[0_0_20px_rgba(0,214,160,0.4)]"
        }`}
      >
        {isPurchasing ? (
          <span className="w-full text-center">Создаем счет...</span>
        ) : (
          <>
            <span>Оплатить</span>
            <div className="flex items-center gap-1 bg-black/10 px-3 py-1 rounded-lg">
              <span>{selectedPlan.totalPrice}</span>
              <Star size={14} className="fill-bg" />
            </div>
          </>
        )}
      </motion.button>
      
      <p className="text-center text-[10px] text-text-secondary mt-4">
        Оплата проходит через Telegram Stars
      </p>
    </div>
  );
}