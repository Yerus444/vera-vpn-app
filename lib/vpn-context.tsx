"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { mockCountries } from "./mock-data";

type Country = typeof mockCountries[0];

interface VpnContextType {
  isConnected: boolean;
  toggleConnection: (val: boolean) => void; // Заменили setIsConnected на toggleConnection для учета сессий
  selectedCountry: Country;
  setSelectedCountry: (val: Country) => void;
  caseCooldown: number;
  setCaseCooldown: (val: number) => void;
  threatsBlocked: number; // Оставляем, если вдруг понадобится в будущем
  addThreat: () => void;
  invitedFriends: number;
  addFriend: () => void;
  // Новые метрики
  vpnSessions: number;
  totalVisitors: number;
}

const VpnContext = createContext<VpnContextType | undefined>(undefined);

export function VpnProvider({ children }: { children: ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country>(mockCountries[0]);
  const [caseCooldown, setCaseCooldown] = useState(0);
  
  const [threatsBlocked, setThreatsBlocked] = useState(0);
  const [invitedFriends, setInvitedFriends] = useState(0);
  
  // Новые состояния
  const [vpnSessions, setVpnSessions] = useState(0);
  const [totalVisitors, setTotalVisitors] = useState(0);

  // Загрузка данных и подсчет уникальных посетителей
  useEffect(() => {
    // Загружаем сохраненные данные
    const savedSessions = localStorage.getItem("vera_sessions");
    const savedFriends = localStorage.getItem("vera_friends");
    const savedVisitors = localStorage.getItem("vera_total_visitors");
    const hasVisited = localStorage.getItem("vera_has_visited");

    if (savedSessions) setVpnSessions(parseInt(savedSessions));
    if (savedFriends) setInvitedFriends(parseInt(savedFriends));

    // ЛОГИКА УНИКАЛЬНЫХ ПОСЕТИТЕЛЕЙ
    // Начинаем с фейковой базы (например, 1240 человек), чтобы не было пусто
    let currentVisitors = savedVisitors ? parseInt(savedVisitors) : 1240; 
    
    if (!hasVisited) {
      // Если пользователь зашел впервые, добавляем +1 и ставим флаг
      currentVisitors += 1;
      localStorage.setItem("vera_has_visited", "true");
      localStorage.setItem("vera_total_visitors", currentVisitors.toString());
    }
    
    setTotalVisitors(currentVisitors);
  }, []);

  // Обертка для включения/выключения VPN
  const toggleConnection = (val: boolean) => {
    setIsConnected(val);
    if (val) {
      // Если включаем, добавляем сессию
      setVpnSessions(prev => {
        const next = prev + 1;
        localStorage.setItem("vera_sessions", next.toString());
        return next;
      });
    }
  };

  const addThreat = () => {
    setThreatsBlocked(prev => {
      const next = prev + 1;
      localStorage.setItem("vera_threats", next.toString());
      return next;
    });
  };

  const addFriend = () => {
    setInvitedFriends(prev => {
      const next = prev + 1;
      localStorage.setItem("vera_friends", next.toString());
      return next;
    });
  };

  return (
    <VpnContext.Provider value={{ 
      isConnected, toggleConnection, 
      selectedCountry, setSelectedCountry,
      caseCooldown, setCaseCooldown,
      threatsBlocked, addThreat,
      invitedFriends, addFriend,
      vpnSessions, totalVisitors
    }}>
      {children}
    </VpnContext.Provider>
  );
}

export function useVpn() {
  const context = useContext(VpnContext);
  if (!context) throw new Error("useVpn must be used within VpnProvider");
  return context;
}