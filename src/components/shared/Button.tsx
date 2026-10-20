import { ReactNode } from "react";
import Icon, { IconName } from "./Icon";
import SmartLink from "./SmartLink";

export default function Button({ children, href = "#contacto", variant = "primary", icon }: { children: ReactNode; href?: string; variant?: "primary" | "secondary" | "outline" | "light"; icon?: IconName }) {
  return <SmartLink className={`button button-${variant}`} href={href}>{children}{icon && <Icon name={icon} size={18} />}</SmartLink>;
}
