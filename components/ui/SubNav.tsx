"use client"

import { cn } from "@/lib/utils" // Fixed import path
import Link from "next/link"
import { usePathname } from "next/navigation"

interface SubNavProps {
  links: {
    href: string
    label: string
    requiresAuth?: boolean
    disabled?: boolean
  }[]
  className?: string
}

export function SubNav({ links, className }: SubNavProps) {
  const pathname = usePathname()

  return (
    <div className="flex justify-center gap-4 p-4 border-b border-zinc-800">
      {links.map((link) => {
        if (link.disabled) {
          return (
            <div
              key={link.href}
              className="px-4 py-2 rounded-lg text-zinc-600 cursor-not-allowed"
            >
              {link.label}
            </div>
          )
        }

        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "px-4 py-2 rounded-lg transition-colors",
              pathname === link.href
                ? "bg-zinc-800 text-white"
                : "text-zinc-400 hover:text-white"
            )}
          >
            {link.label}
          </Link>
        )
      })}
    </div>
  )
} 