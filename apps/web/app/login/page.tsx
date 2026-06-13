import { LoginForm } from "@/components/login-form"

export default function Page() {
    return (
        <div
            className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-cover bg-center relative"
            style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1557683316-973673baf926')",
            }}
        >

            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
            <div className="relative w-full max-w-lg bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-white/20">
                <LoginForm />
            </div>
        </div>

    )
}
