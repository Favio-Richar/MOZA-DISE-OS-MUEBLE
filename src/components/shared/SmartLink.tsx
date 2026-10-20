import { AnchorHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router";

type SmartLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
  children?: ReactNode;
};

/**
 * Enlace único para todo el sitio:
 * - rutas internas ("/servicios") navegan sin recargar la página (react-router)
 * - anclas ("#contacto") y externos (https://...) usan <a> normal
 */
export default function SmartLink({ href, children, ...rest }: SmartLinkProps) {
  if (href.startsWith("/") && !href.startsWith("//")) {
    return <Link to={href} {...rest}>{children}</Link>;
  }
  const external = /^https?:\/\//.test(href);
  return (
    <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...rest}>
      {children}
    </a>
  );
}
