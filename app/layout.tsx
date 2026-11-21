import type { Viewport } from "next";
import { TelegramProvider } from "@/components/TelegramProvider";
import { VpnProvider } from "@/lib/vpn-context";
import BottomNav from "@/components/BottomNav";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className="bg-bg text-text-primary antialiased">
        <TelegramProvider>
          <VpnProvider>
            <main className="pb-[calc(80px+env(safe-area-inset-bottom))] h-[100dvh] overflow-y-auto relative">
              {children}
            </main>
            <BottomNav />
          </VpnProvider>
        </TelegramProvider>
      </body>
    </html>
  );
}