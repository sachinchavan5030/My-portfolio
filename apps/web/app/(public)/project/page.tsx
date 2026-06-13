"use client"

import { useGetAboutQuery } from "@/redux/apis/about.api"
import { useGetProjectQuery } from "@/redux/apis/project.api"

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const Project = () => {
    const { data } = useGetProjectQuery()
    const { data: aboutData } = useGetAboutQuery()

    return (
        <div className="bg-background text-foreground">

            {/* Heading */}
            <section className="container py-14 text-center">
                <h1 className="text-4xl font-bold tracking-tight mb-3">
                    My Projects
                </h1>
                <p className="text-muted-foreground">
                    A collection of my recent work and builds 🚀
                </p>
            </section>

            {/* Projects Grid */}
            {data && (
                <div className="container pb-16">
                    <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">

                        {data.result?.map((item: any) => (
                            <Card
                                key={item.id}
                                className="group overflow-hidden border hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                            >

                                {/* Image */}
                                <div className="overflow-hidden">
                                    <img
                                        src={item.projectImage}
                                        className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>

                                {/* Content */}
                                <CardHeader>
                                    <CardTitle className="text-lg">
                                        {item.title}
                                    </CardTitle>
                                </CardHeader>

                                <CardContent>
                                    <p className="text-muted-foreground text-sm line-clamp-3">
                                        {item.desc}
                                    </p>
                                </CardContent>

                                {/* Actions */}
                                <CardFooter className="flex gap-2">
                                    <Button size="sm" className="w-full" asChild>
                                        <a href={item.liveLink} target="_blank">
                                            Live Demo
                                        </a>
                                    </Button>

                                    <Button size="sm" variant="outline" className="w-full" asChild>
                                        <a href={item.githubLink} target="_blank">
                                            Code
                                        </a>
                                    </Button>
                                </CardFooter>

                            </Card>
                        ))}

                    </div>
                </div>
            )}

            {/* Footer */}
            <footer className="border-t bg-muted/40 backdrop-blur py-10">
                <div className="container grid md:grid-cols-3 gap-6">

                    {/* About */}
                    <div>
                        <h4 className="font-semibold text-lg">
                            {aboutData?.result?.[0]?.name}
                        </h4>
                        <p className="text-muted-foreground text-sm mt-2">
                            Full Stack Developer building modern web apps with great UI.
                        </p>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-semibold mb-2">Contact</h4>

                        <p className="text-muted-foreground text-sm">
                            📧 {aboutData?.result?.[0]?.email}
                        </p>
                        <p className="text-muted-foreground text-sm">
                            📞 {aboutData?.result?.[0]?.mobile}
                        </p>
                        <p className="text-muted-foreground text-sm">
                            📍 {aboutData?.result?.[0]?.location}, Maharashtra
                        </p>
                    </div>

                    {/* Social */}
                    <div className="md:text-right">
                        <h4 className="font-semibold mb-2">Social</h4>

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

                <p className="text-center text-sm text-muted-foreground mt-6">
                    © 2026 Sachin — Crafted with ❤️
                </p>
            </footer>
        </div>
    )
}

export default Project