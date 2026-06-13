"use client"

import { useGetAboutQuery } from "@/redux/apis/about.api"

import {
    Card,
    CardContent,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useGetSkillQuery } from "@/redux/apis/skill.api"

const Skill = () => {
    const { data } = useGetSkillQuery()
    const { data: aboutData } = useGetAboutQuery()

    return (
        <div className="bg-background text-foreground">

            {/* Heading */}
            <section className="container py-16 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-3">
                    My Skills 🚀
                </h1>
                <p className="text-muted-foreground max-w-xl mx-auto">
                    Technologies and tools I use to build modern web applications.
                </p>
            </section>

            {/* Skills Grid */}
            {data && (
                <div className="container pb-20">

                    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

                        {data.result?.map((item: any) => (
                            <Card
                                key={item.id}
                                className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-muted/40"
                            >
                                <CardContent className="flex flex-col items-center justify-center py-10">

                                    {/* Skill Name */}
                                    <h3 className="text-lg font-semibold mb-3 group-hover:text-primary transition">
                                        {item.skills}
                                    </h3>

                                    {/* Badge */}
                                    <Badge variant="secondary">
                                        Technology
                                    </Badge>

                                </CardContent>
                            </Card>
                        ))}

                    </div>

                </div>
            )}

            {/* Footer */}
            <footer className="border-t bg-muted/30 backdrop-blur-xl py-12">
                <div className="container grid md:grid-cols-3 gap-8">

                    {/* About */}
                    <div>
                        <h4 className="font-semibold text-lg">
                            {aboutData?.result?.[0]?.name}
                        </h4>
                        <p className="text-muted-foreground text-sm mt-2">
                            Full Stack Developer passionate about building scalable
                            and modern web applications.
                        </p>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-semibold mb-3">Contact</h4>
                        <div className="text-muted-foreground text-sm space-y-1">
                            <p>📧 {aboutData?.result?.[0]?.email}</p>
                            <p>📞 {aboutData?.result?.[0]?.mobile}</p>
                            <p>📍 {aboutData?.result?.[0]?.location}, Maharashtra</p>
                        </div>
                    </div>

                    {/* Social */}
                    <div className="md:text-right">
                        <h4 className="font-semibold mb-3">Social</h4>
                        <div className="flex gap-4 md:justify-end">
                            <a href="#" className="hover:text-primary transition">
                                GitHub
                            </a>
                            <a href="#" className="hover:text-primary transition">
                                LinkedIn
                            </a>
                            <a href="#" className="hover:text-primary transition">
                                Email
                            </a>
                        </div>
                    </div>

                </div>

                <p className="text-center text-sm text-muted-foreground mt-8">
                    © 2026 Sachin — Built with ❤️ using shadcn UI
                </p>
            </footer>

        </div>
    )
}

export default Skill