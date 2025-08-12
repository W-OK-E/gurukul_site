"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function HoverPrefetchLink({
  href,
  children,
  className = "",
  ...props
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLAnchorElement>) {
  const [active, setActive] = useState(false);
  const pathname = usePathname();

  const isActive = pathname === href;

  return (
    <Link
      href={href}
      prefetch={active ? undefined : false}
      onMouseEnter={() => setActive(true)}
      className={`
        relative transition-colors duration-300
        ${isActive ? "text-[#EDA35A]" : "text-white"}
        ${className}
        after:content-[''] after:absolute after:w-0 after:h-[2px]
        after:left-0 after:-bottom-1 after:bg-[#EDA35A]
        hover:after:w-full after:transition-all after:duration-300
      `}
      {...props}
    >
      {children}
    </Link>
  );
}
