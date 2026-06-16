// "use client"

// import Link from "next/link"
// import { usePathname } from "next/navigation"
// import { Menu } from "lucide-react"

// import { Button } from "@/components/ui/button"
// import {
//     Sheet,
//     SheetContent,
//     SheetTrigger,
// } from "@/components/ui/sheet"
// import ThemeToggle from "./ThemeToggle"
// import { useGetAboutQuery } from "@/redux/apis/about.api"

// const navItems = [
//     { name: "Home", href: "/" },
//     { name: "About", href: "/about" },
//     { name: "Skills", href: "/skills" },
//     { name: "Experience", href: "/exprience" },
//     { name: "Projects", href: "/project" },
//     { name: "Contact", href: "/contact" },
// ]

// export const PublicNavbar = () => {
//     const { data } = useGetAboutQuery()
//     const pathname = usePathname()

//     return (
//         <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur">
//             <div className="container flex h-16 items-center justify-between">

//                 {/* Logo + Theme */}
//                 <div className="flex items-center gap-3">


//                     <Link
//                         href="/"
//                         className="text-lg font-bold uppercase tracking-wide"
//                     >
//                         {data?.result?.[0]?.name || "My Portfolio"}
//                     </Link>
//                 </div>

//                 {/* Desktop Menu */}
//                 <nav className="hidden md:flex items-center gap-6">
//                     {navItems.map((item) => (
//                         <Link
//                             key={item.href}
//                             href={item.href}
//                             className={`text-sm font-medium transition-colors relative
//                 ${pathname === item.href
//                                     ? "text-primary"
//                                     : "text-muted-foreground hover:text-primary"
//                                 }
//               `}
//                         >
//                             {item.name}

//                             {/* Active underline */}
//                             {pathname === item.href && (
//                                 <span className="absolute left-0 -bottom-1 h-[2px] w-full bg-primary rounded-full" />
//                             )}
//                         </Link>
//                     ))}
//                     <ThemeToggle />
//                 </nav>

//                 {/* Mobile Menu */}
//                 <div className="flex items-center gap-2 md:hidden">
//                     <Sheet>
//                         <SheetTrigger asChild>
//                             <Button variant="ghost" size="icon">
//                                 <Menu className="h-5 w-5" />
//                             </Button>
//                         </SheetTrigger>

//                         <SheetContent side="right" className="w-[250px]">
//                             <div className="flex flex-col gap-6 mt-6">

//                                 {navItems.map((item) => (
//                                     <Link
//                                         key={item.href}
//                                         href={item.href}
//                                         className={`text-base font-medium transition-colors
//                       ${pathname === item.href
//                                                 ? "text-primary"
//                                                 : "text-muted-foreground hover:text-primary"
//                                             }
//                     `}
//                                     >
//                                         {item.name}
//                                     </Link>
//                                 ))}

//                             </div>
//                         </SheetContent>
//                     </Sheet>
//                 </div>

//             </div>
//         </header>
//     )
// }

// export default PublicNavbar

"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"

import { useGetAboutQuery } from "@/redux/apis/about.api"

const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Skills", href: "/skills" },
    { name: "Experience", href: "/exprience" },
    { name: "Projects", href: "/project" },
    { name: "Contact", href: "/contact" },
]

export default function PublicNavbar() {
    const pathname = usePathname()
    const { data } = useGetAboutQuery()
    const { theme, setTheme } = useTheme()

    const user = data?.result?.[0]

    return (
        <header className="fixed top-5 left-0 right-0 z-50 px-4">
            <div
                className="
                max-w-7xl
                mx-auto
                h-20
                rounded-[30px]
                bg-[#ECF0F3]/95
                dark:bg-zinc-900/95
                backdrop-blur-xl
                shadow-[-8px_-8px_16px_#ffffff,8px_8px_16px_#d1d9e6]
                dark:shadow-none
                "
            >
                <div className="h-full flex items-center justify-between px-8">

                    {/* Logo */}
                    <Link
                        href="/"
                        className="flex items-center gap-3"
                    >
                        <div
                            className="
                            h-12
                            w-12
                            rounded-full
                            overflow-hidden
                            border-2
                            "
                        >
                            <img
                                src={user?.profilePic as string}
                                alt={user?.name}
                                className="h-full w-full object-cover"
                            />
                        </div>

                        <h2
                            className="
                            text-2xl
                            font-extrabold
                            text-[#FF014F]
                            "
                        >
                            {user?.name?.split(" ")[0]}
                        </h2>
                    </Link>

                    {/* Desktop Menu */}
                    <nav className="hidden md:flex items-center gap-8">

                        {navItems.map((item) => {

                            const active =
                                pathname === item.href

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`
                                    relative
                                    text-base
                                    font-semibold
                                    transition-all
                                    duration-300

                                    ${active
                                            ? "text-[#FF014F]"
                                            : "text-gray-500 hover:text-[#FF014F]"
                                        }
                                    `}
                                >
                                    {item.name}

                                    {active && (
                                        <span
                                            className="
                                            absolute
                                            left-0
                                            -bottom-2
                                            h-[2px]
                                            w-full
                                            bg-[#FF014F]
                                            rounded-full
                                            "
                                        />
                                    )}
                                </Link>
                            )
                        })}

                        {/* Theme Toggle */}

                        <button
                            onClick={() =>
                                setTheme(
                                    theme === "dark"
                                        ? "light"
                                        : "dark"
                                )
                            }
                            className="
                            h-11
                            w-11
                            rounded-full
                            flex
                            items-center
                            justify-center
                            bg-[#ECF0F3]
                            dark:bg-zinc-800
                            shadow-[-4px_-4px_8px_#fff,4px_4px_8px_#d1d9e6]
                            transition-all
                            duration-300
                            hover:scale-110
                            "
                        >
                            {theme === "dark" ? (
                                <Sun
                                    size={20}
                                    className="text-yellow-500"
                                />
                            ) : (
                                <Moon
                                    size={18}
                                    className="text-[#FF014F]"
                                />
                            )}
                        </button>

                    </nav>

                    {/* Mobile Menu */}
                    <div className="md:hidden flex items-center gap-3">

                        <button
                            onClick={() =>
                                setTheme(
                                    theme === "dark"
                                        ? "light"
                                        : "dark"
                                )
                            }
                            className="
                            h-10
                            w-10
                            rounded-full
                            flex
                            items-center
                            justify-center
                            "
                        >
                            {theme === "dark" ? (
                                <Sun
                                    size={20}
                                    className="text-yellow-500"
                                />
                            ) : (
                                <Moon
                                    size={18}
                                    className="text-[#FF014F]"
                                />
                            )}
                        </button>

                        <Sheet>
                            <SheetTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                >
                                    <Menu className="h-6 w-6" />
                                </Button>
                            </SheetTrigger>

                            <SheetContent side="right">

                                <div className="mt-10 flex flex-col gap-5">

                                    {navItems.map((item) => {

                                        const active =
                                            pathname === item.href

                                        return (
                                            <Link
                                                key={item.href}
                                                href={item.href}
                                                className={`
                                                text-lg
                                                font-medium

                                                ${active
                                                        ? "text-[#FF014F]"
                                                        : ""
                                                    }
                                                `}
                                            >
                                                {item.name}
                                            </Link>
                                        )
                                    })}

                                </div>

                            </SheetContent>
                        </Sheet>

                    </div>

                </div>
            </div>
        </header>
    )
}