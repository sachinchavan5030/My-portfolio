"use client"

import { useGetAboutQuery } from "@/redux/apis/about.api"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useGetExprienceQuery } from "@/redux/apis/exprience.api"

const Experience = () => {
    const { data } = useGetExprienceQuery()
    const { data: aboutData } = useGetAboutQuery()

    return (
        <div className="bg-background text-foreground">

            {/* Heading */}
            <section className="container py-16 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    Experience 💼
                </h1>
                <p className="text-muted-foreground max-w-xl mx-auto">
                    My professional journey and the roles I’ve worked in so far.
                </p>
            </section>

            {/* Timeline */}
            {data && (
                <div className="container pb-20">
                    <div className="relative border-l pl-6 space-y-10">

                        {data.result?.map((item: any, index: number) => (
                            <div key={item.id} className="relative">

                                {/* Timeline Dot */}
                                {/* <span className="absolute -left-[10px] top-2 h-4 w-4 rounded-full bg-primary"></span> */}

                                <Card className="hover:shadow-xl transition-all duration-300">

                                    <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                                        <div>
                                            <CardTitle className="text-lg">
                                                {item.role}
                                            </CardTitle>
                                            <p className="text-muted-foreground text-sm">
                                                {item.companyName}
                                            </p>
                                        </div>

                                        <Badge variant="secondary">
                                            {item.workingDate}
                                        </Badge>
                                    </CardHeader>

                                    <CardContent>
                                        <p className="text-muted-foreground text-sm leading-relaxed">
                                            {item.desc}
                                        </p>
                                    </CardContent>

                                </Card>
                            </div>
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
                    © 2026 Sachin — Designed with ❤️ using shadcn UI
                </p>
            </footer>

        </div>
    )
}

export default Experience