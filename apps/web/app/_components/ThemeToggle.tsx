"use client"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

const ThemeToggle = () => {
    const { theme, setTheme, resolvedTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => setMounted(true), [])

    if (!mounted) return null

    const currentTheme = theme === "system" ? resolvedTheme : theme

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
        >
            {currentTheme === "dark" ? "🌞" : "🌙"}
        </Button>
    )
}

export default ThemeToggle