import { ReactNode } from "react";

export type IconName =
  | "arrow"
  | "check"
  | "chevron"
  | "clock"
  | "close"
  | "facebook"
  | "gmail"
  | "instagram"
  | "link"
  | "mail"
  | "map"
  | "menu"
  | "phone"
  | "ruler"
  | "whatsapp";

export default function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, ReactNode> = {
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    chevron: <path d="m6 9 6 6 6-6" />,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    close: <><path d="m6 6 12 12" /><path d="M18 6 6 18" /></>,
    facebook: <path fill="currentColor" stroke="none" d="M14 8h3V4h-3c-3 0-5 2-5 5v3H6v4h3v6h4v-6h3l1-4h-4V9c0-.6.4-1 1-1Z" />,
    gmail: <><path d="M3.8 7.2 12 13l8.2-5.8" stroke="#EA4335" strokeWidth="2.8" /><path d="M4 7.5V18" stroke="#4285F4" strokeWidth="2.8" /><path d="M20 7.5V18" stroke="#34A853" strokeWidth="2.8" /><path d="M4 7.3 5.8 6" stroke="#FBBC04" strokeWidth="2.8" /><path d="m18.2 6 1.8 1.3" stroke="#EA4335" strokeWidth="2.8" /><path d="M4 18h3" stroke="#4285F4" strokeWidth="2.8" /><path d="M17 18h3" stroke="#34A853" strokeWidth="2.8" /></>,
    instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17.5 6.5h.01" /></>,
    link: <><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" /><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" /></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
    map: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    menu: <><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></>,
    phone: <path d="M7 3H4a1 1 0 0 0-1 1c0 9.4 7.6 17 17 17a1 1 0 0 0 1-1v-3l-4-2-2 2c-3.5-1.5-6.5-4.5-8-8l2-2-2-4Z" />,
    ruler: <><path d="m4 16 12-12 4 4L8 20H4v-4Z" /><path d="m13 7 4 4" /><path d="m10 10 2 2" /></>,
    whatsapp: <><path d="M21 12a9 9 0 0 1-13.3 7.9L3 21l1.2-4.5A9 9 0 1 1 21 12Z" /><path d="M8.2 7.8c.5 4 3 6.5 7 7" /></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}
