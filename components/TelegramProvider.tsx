"use client";

import { useEffect, useState } from "react";
import { init, miniApp, themeParams, viewport, backButton, mainButton } from "@telegram-apps/sdk-react";

export function TelegramProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        // Проверяем, есть ли объект Telegram в window (т.е. открыто ли внутри Telegram)
        const isTelegramEnv = typeof window !== "undefined" && !!(window as any).Telegram?.WebApp?.initData;

        if (isTelegramEnv) {
          init(); 
          if (miniApp.mount.isAvailable()) await miniApp.mount();
          if (themeParams.mount.isAvailable()) {
            themeParams.mount();
            themeParams.bindCssVars.ifAvailable();
          }
          if (viewport.mount.isAvailable()) {
            await viewport.mount();
            viewport.bindCssVars.ifAvailable();
            viewport.expand.ifAvailable();
          }
          if (backButton.mount.isAvailable()) backButton.mount();
          if (mainButton.mount.isAvailable()) mainButton.mount();
          miniApp.ready.ifAvailable();
        } else {
          console.log("Приложение запущено вне Telegram. SDK пропущен.");
        }
      } catch (e) {
        console.error("Ошибка инициализации Telegram SDK", e);
      } finally {
        setReady(true); // В любом случае показываем интерфейс
      }
    })();
  }, []);

  if (!ready) {
    return <div className="flex items-center justify-center h-[100dvh]">Загрузка…</div>;
  }
  return <>{children}</>;
}