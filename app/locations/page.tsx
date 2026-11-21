"use client";

import { useState } from "react";
import { ChevronLeft, Search, Check } from "lucide-react";
import Link from "next/link";
import { mockCountries } from "@/lib/mock-data";
import { useVpn } from "@/lib/vpn-context";

export default function LocationsPage() {
  const [search, setSearch] = useState("");
  const { selectedCountry, setSelectedCountry } = useVpn();

  const filtered = mockCountries.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page-transition px-5 pt-6">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/" className="p-2 -ml-2 bg-white/5 rounded-full active:scale-90 transition-transform">
          <ChevronLeft size={20} />
        </Link>
        <h1 className="text-xl font-semibold">Выбор локации</h1>
      </div>

      <div className="relative mb-5">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Поиск страны..."
          className="w-full bg-card border border-white/10 rounded-2xl py-3 pl-11 pr-4 text-sm placeholder:text-text-secondary focus:outline-none focus:border-accent/50 transition-colors"
        />
      </div>

      <div className="space-y-2.5">
        {filtered.map((country) => {
          const isSelected = selectedCountry.code === country.code;
          return (
            <button
              key={country.code}
              onClick={() => setSelectedCountry(country)}
              className={`w-full flex items-center justify-between bg-card rounded-2xl p-4 border transition-all duration-200 ${
                isSelected
                  ? "border-accent/60 bg-accent/5 shadow-[0_0_15px_rgba(0,214,160,0.1)]"
                  : "border-white/5 active:scale-[0.98] hover:bg-white/5"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl bg-white/5 w-10 h-10 flex items-center justify-center rounded-full">{country.flag}</span>
                <div className="text-left">
                  <p className={`font-medium ${isSelected ? "text-accent" : "text-white"}`}>{country.name}</p>
                  <p className="text-text-secondary text-xs">
                    {country.servers} серверов · {country.ping} мс
                  </p>
                </div>
              </div>
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                  isSelected ? "border-accent bg-accent" : "border-white/10"
                }`}
              >
                {isSelected && <Check size={14} className="text-bg" strokeWidth={3} />}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}