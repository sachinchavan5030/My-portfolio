"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import ThemeToggle from "./ThemeToggle"
import { useGetAboutQuery } from "@/redux/apis/about.api"

const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Skills", href: "/skills" },
    { name: "Experience", href: "/exprience" },
    { name: "Projects", href: "/project" },
    { name: "Contact", href: "/contact" },
]

export const PublicNavbar = () => {
    const { data } = useGetAboutQuery()
    const pathname = usePathname()

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur">
            <div className="container flex h-16 items-center justify-between">

                {/* Logo + Theme */}
                <div className="flex items-center gap-3">


                    <Link
                        href="/"
                        className="text-lg font-bold uppercase tracking-wide"
                    >
                        {data?.result?.[0]?.name || "My Portfolio"}
                    </Link>
                </div>

                {/* Desktop Menu */}
                <nav className="hidden md:flex items-center gap-6">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`text-sm font-medium transition-colors relative
                ${pathname === item.href
                                    ? "text-primary"
                                    : "text-muted-foreground hover:text-primary"
                                }
              `}
                        >
                            {item.name}

                            {/* Active underline */}
                            {pathname === item.href && (
                                <span className="absolute left-0 -bottom-1 h-[2px] w-full bg-primary rounded-full" />
                            )}
                        </Link>
                    ))}
                    <ThemeToggle />
                </nav>

                {/* Mobile Menu */}
                <div className="flex items-center gap-2 md:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Menu className="h-5 w-5" />
                            </Button>
                        </SheetTrigger>

                        <SheetContent side="right" className="w-[250px]">
                            <div className="flex flex-col gap-6 mt-6">

                                {navItems.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={`text-base font-medium transition-colors
                      ${pathname === item.href
                                                ? "text-primary"
                                                : "text-muted-foreground hover:text-primary"
                                            }
                    `}
                                    >
                                        {item.name}
                                    </Link>
                                ))}

                            </div>
                        </SheetContent>
                    </Sheet>
                </div>

            </div>
        </header>
    )
}

export default PublicNavbar