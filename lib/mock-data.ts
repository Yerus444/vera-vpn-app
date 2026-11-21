export const mockUser = {
  firstName: "Александр",
  lastName: "И.",
  username: "@alex_vpn",
  photoUrl: "",
  subscription: {
    plan: "12 месяцев",
    expires: "2026-12-31",
    devices: 3,
    maxDevices: 5,
  },
  // Новые данные для реферальной системы
  referralCode: "alex_777",
  invitedFriends: 2,
  earnedDays: 6,
};

export const mockCountries = [
  { code: "NL", name: "Нидерланды", flag: "🇳🇱", ping: 12, servers: 8 },
  { code: "DE", name: "Германия", flag: "🇩🇪", ping: 18, servers: 12 },
  { code: "US", name: "США", flag: "🇺🇸", ping: 24, servers: 20 },
  { code: "JP", name: "Япония", flag: "🇯🇵", ping: 32, servers: 6 },
  { code: "SG", name: "Сингапур", flag: "🇸🇬", ping: 28, servers: 5 },
  { code: "GB", name: "Великобритания", flag: "🇬🇧", ping: 20, servers: 10 },
  { code: "FR", name: "Франция", flag: "🇫🇷", ping: 16, servers: 7 },
  { code: "CA", name: "Канада", flag: "🇨🇦", ping: 22, servers: 9 },
];

export const mockPlans = [
  { id: "1m", title: "1 месяц", price: 299, stars: 150, popular: false },
  { id: "3m", title: "3 месяца", price: 699, stars: 350, popular: true },
  { id: "12m", title: "12 месяцев", price: 1990, stars: 1000, popular: false },
];