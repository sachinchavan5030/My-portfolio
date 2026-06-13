"use client"

// import { useGetAboutQuery } from "@/redux/apis/about.api"
// import Link from "next/link"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Avatar, AvatarImage } from "@/components/ui/avatar"
// import { useGetProjectQuery } from "@/redux/apis/project.api"
// import { useGetExprienceQuery } from "@/redux/apis/exprience.api"

// export default function Home() {
//     const { data } = useGetAboutQuery()
//     const { data: projectData } = useGetProjectQuery()
//     const { data: exprienceData } = useGetExprienceQuery()

//     const user = data?.result?.[0]
//     const exprience = exprienceData?.result?.[0]

//     return (
//         <div className="bg-background text-foreground">

//             {/* Hero Section */}
//             <section className="container py-16 grid md:grid-cols-2 gap-10 items-center">
//                 <div>
//                     <h1 className="text-4xl font-bold mb-4">
//                         Hi, I'm {user?.name}
//                     </h1>

//                     <p className="text-muted-foreground mb-6">
//                         Frontend Developer | React | Next.js | MERN Stack
//                     </p>

//                     <div className="flex gap-3">
//                         <Button >
//                             <a href={exprience && exprience.resume as string}>
//                                 Download CV
//                             </a>
//                         </Button>

//                         <Button variant="outline" asChild>
//                             <Link href="/contact">Contact Me</Link>
//                         </Button>
//                     </div>
//                 </div>

//                 <div className="flex justify-center">
//                     <Avatar className="w-64 h-64">
//                         <AvatarImage src={user?.profilePic as string} />
//                     </Avatar>
//                 </div>
//             </section>

//             {/* About */}
//             <section className="container py-16">
//                 <div className="text-center mb-10">
//                     <h2 className="text-3xl font-bold">About Me</h2>
//                     <p className="text-muted-foreground">Get to know me better</p>
//                 </div>

//                 <div className="grid md:grid-cols-2 gap-10 items-center">
//                     <div>
//                         <p className="mb-4">{user?.bio}</p>

//                         <p className="text-muted-foreground">
//                             Currently working on SaaS platforms and modern web apps.
//                         </p>

//                         <Button variant="outline" className="mt-4" asChild>
//                             <Link href="/about">More About Me</Link>
//                         </Button>
//                     </div>

//                     <div className="grid grid-cols-2 gap-4">
//                         {[
//                             { label: "Years Experience", value: exprience?.exprienceYear },
//                             { label: "Projects", value: exprience?.projects },
//                             { label: "Technologies", value: exprience?.technologies },
//                             { label: "Happy Clients", value: exprience?.happyClient },
//                         ].map((item, i) => (
//                             <Card key={i}>
//                                 <CardContent className="p-6 text-center">
//                                     <h3 className="text-2xl font-bold">{item.value}+</h3>
//                                     <p className="text-muted-foreground text-sm">
//                                         {item.label}
//                                     </p>
//                                 </CardContent>
//                             </Card>
//                         ))}
//                     </div>
//                 </div>
//             </section>

//             {/* Skills */}
//             <section className="container py-16">
//                 <div className="text-center mb-10">
//                     <h2 className="text-3xl font-bold">Skills</h2>
//                     <p className="text-muted-foreground">Technologies I work with</p>
//                 </div>

//                 <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-4">
//                     {[
//                         "HTML",
//                         "CSS",
//                         "JavaScript",
//                         "React",
//                         "Next.js",
//                         "Redux",
//                         "Node.js",
//                         "Bootstrap",
//                     ].map((skill, i) => (
//                         <Card key={i}>
//                             <CardContent className="p-4 text-center">
//                                 {skill}
//                             </CardContent>
//                         </Card>
//                     ))}
//                 </div>

//                 <div className="text-center mt-6">
//                     <Button variant="outline" asChild>
//                         <Link href="/skills">More Skills</Link>
//                     </Button>
//                 </div>
//             </section>

//             {/* Projects */}
//             <section className="container py-16">
//                 <div className="text-center mb-10">
//                     <h2 className="text-3xl font-bold">Projects</h2>
//                     <p className="text-muted-foreground">Some of my work</p>
//                 </div>

//                 <div className="grid md:grid-cols-3 gap-6">
//                     {projectData?.result?.map((item: any) => (
//                         <Card key={item.id}>
//                             <img
//                                 src={item.projectImage}
//                                 className="h-48 w-full object-cover rounded-t-lg"
//                             />

//                             <CardHeader>
//                                 <CardTitle>{item.title}</CardTitle>
//                             </CardHeader>

//                             <CardContent>
//                                 <p className="text-muted-foreground mb-4">
//                                     {item.desc}
//                                 </p>

//                                 <div className="flex gap-2">
//                                     <Button size="sm" asChild>
//                                         <a href={item.liveLink} target="_blank">Live</a>
//                                     </Button>

//                                     <Button size="sm" variant="outline" asChild>
//                                         <a href={item.githubLink} target="_blank">GitHub</a>
//                                     </Button>
//                                 </div>
//                             </CardContent>
//                         </Card>
//                     ))}
//                 </div>

//                 <div className="text-center mt-6">
//                     <Button variant="outline" asChild>
//                         <Link href="/project">More Projects</Link>
//                     </Button>
//                 </div>
//             </section>

//             {/* Contact CTA */}
//             <section className="container py-16 text-center">
//                 <h2 className="text-3xl font-bold mb-4">
//                     Ready to Work Together?
//                 </h2>
//                 <p className="text-muted-foreground mb-6">
//                     Let's build something amazing together.
//                 </p>

//                 <Button asChild>
//                     <Link href="/contact">Get In Touch</Link>
//                 </Button>
//             </section>

//             {/* Footer */}
//             <footer className="border-t py-10">
//                 <div className="container grid md:grid-cols-3 gap-6">

//                     <div>
//                         <h4 className="font-bold">{user?.name}</h4>
//                         <p className="text-muted-foreground text-sm">
//                             Full Stack Developer building modern web apps.
//                         </p>
//                     </div>

//                     <div>
//                         <h4 className="font-bold mb-2">Contact</h4>
//                         <p className="text-muted-foreground text-sm">
//                             {user?.email}
//                         </p>
//                         <p className="text-muted-foreground text-sm">
//                             {user?.mobile}
//                         </p>
//                     </div>

//                     <div className="text-left md:text-right">
//                         <h4 className="font-bold mb-2">Social</h4>
//                         <div className="flex gap-3 md:justify-end">
//                             <a href="#">GitHub</a>
//                             <a href="#">LinkedIn</a>
//                         </div>
//                     </div>
//                 </div>

//                 <p className="text-center text-sm text-muted-foreground mt-6">
//                     © 2026 Sachin. All rights reserved.
//                 </p>
//             </footer>

//         </div>
//     )
// }



import { useGetAboutQuery } from "@/redux/apis/about.api"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useGetProjectQuery } from "@/redux/apis/project.api"
import { useGetExprienceQuery } from "@/redux/apis/exprience.api"
import { motion, useScroll, useTransform, Variants } from "framer-motion"
import { useEffect, useState } from "react"

// Simple Icons
import {
    Mail,
    Phone,
    Download,
    ExternalLink,
    Code2,
    Users,
    Trophy,
    Heart,
    ArrowRight,
    CheckCircle2,
    Award,
    // Github,
    // Linkedin,
    Briefcase
} from "lucide-react"

export default function Home() {
    const { data } = useGetAboutQuery()
    const { data: projectData } = useGetProjectQuery()
    const { data: exprienceData } = useGetExprienceQuery()
    const { scrollYProgress } = useScroll()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const user = data?.result?.[0]
    const exprience = exprienceData?.result?.[0]

    const y = useTransform(scrollYProgress, [0, 1], [0, -30])
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

    // Simple animation variants
    const fadeInUp: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
    }

    const fadeInLeft: Variants = {
        hidden: { opacity: 0, x: -40 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
    }

    const fadeInRight: Variants = {
        hidden: { opacity: 0, x: 40 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
    }

    const scaleIn: Variants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" } }
    }

    const staggerContainer: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.1 }
        }
    }

    const skills = [
        "React.js", "Next.js", "TypeScript", "Node.js",
        "Tailwind CSS", "Redux", "MongoDB", "GraphQL"
    ]

    if (!mounted) return null

    return (
        <div className="bg-white text-gray-900">

            {/* Hero Section */}
            <motion.section
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="container mx-auto px-4 py-20 md:py-28 min-h-[85vh] flex items-center"
            >
                <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                    <div className="space-y-6">
                        <motion.div variants={fadeInUp} className="space-y-3">
                            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
                                Hi, I'm{" "}
                                <span className="text-gray-900">
                                    {user?.name?.split(" ")[0]}
                                </span>
                            </h1>
                            <p className="text-xl md:text-2xl text-gray-600">
                                Full Stack Developer
                            </p>
                        </motion.div>

                        <motion.p variants={fadeInUp} className="text-gray-600 leading-relaxed max-w-lg">
                            Building clean, responsive, and user-friendly web applications with modern technologies.
                        </motion.p>

                        <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
                            <Button size="lg" className="bg-gray-900 hover:bg-gray-800 text-white" asChild>
                                <a href={exprience?.resume as string} download>
                                    <Download className="mr-2 h-4 w-4" />
                                    Download CV
                                </a>
                            </Button>
                            <Button size="lg" variant="outline" className="border-gray-300" asChild>
                                <Link href="/contact">
                                    Contact Me
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="flex gap-5 pt-4">
                            <a
                                href="https://github.com/yourusername"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-500 hover:text-gray-900 transition-colors"
                            >
                                {/* <Github className="w-5 h-5" /> */}
                            </a>
                            <a
                                href="https://linkedin.com/in/yourusername"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-500 hover:text-gray-900 transition-colors"
                            >
                                {/* <Linkedin className="w-5 h-5" /> */}
                            </a>
                            <a
                                href={`mailto:${user?.email}`}
                                className="text-gray-500 hover:text-gray-900 transition-colors"
                            >
                                <Mail className="w-5 h-5" />
                            </a>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex justify-center"
                        style={{ y, opacity }}
                    >
                        <Avatar className="w-64 h-64 md:w-80 md:h-80 ring-4 ring-gray-100 shadow-xl">
                            <AvatarImage src={user?.profilePic as string} className="object-cover" />
                        </Avatar>
                    </motion.div>
                </div>
            </motion.section>

            {/* About Section */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={staggerContainer}
                className="bg-gray-50 py-20"
            >
                <div className="container mx-auto px-4 max-w-6xl">
                    <motion.div variants={fadeInUp} className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-3">About Me</h2>
                        <div className="w-16 h-1 bg-gray-300 mx-auto"></div>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-12 items-start">
                        <motion.div variants={fadeInLeft} className="space-y-5">
                            <p className="text-gray-700 leading-relaxed">
                                {user?.bio}
                            </p>
                            <div className="space-y-3">
                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
                                    <p className="text-gray-600">5+ years of professional experience</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
                                    <p className="text-gray-600">20+ projects delivered successfully</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
                                    <p className="text-gray-600">React, Next.js, Node.js expert</p>
                                </div>
                            </div>
                            <Button variant="outline" className="mt-2" asChild>
                                <Link href="/about">
                                    More About Me
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </motion.div>

                        <motion.div
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="grid grid-cols-2 gap-5"
                        >
                            {[
                                { icon: Award, label: "Experience", value: exprience?.exprienceYear },
                                { icon: Code2, label: "Projects", value: exprience?.projects },
                                { icon: Briefcase, label: "Technologies", value: exprience?.technologies },
                                { icon: Users, label: "Clients", value: exprience?.happyClient },
                            ].map((item, i) => (
                                <motion.div key={i} variants={scaleIn}>
                                    <Card className="text-center border shadow-sm">
                                        <CardContent className="p-6">
                                            <item.icon className="w-8 h-8 mx-auto mb-3 text-gray-500" />
                                            <h3 className="text-3xl font-bold mb-1">{item.value}+</h3>
                                            <p className="text-gray-500 text-sm">{item.label}</p>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </motion.section>

            {/* Skills Section */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={staggerContainer}
                className="py-20"
            >
                <div className="container mx-auto px-4 max-w-6xl">
                    <motion.div variants={fadeInUp} className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-3">Skills</h2>
                        <div className="w-16 h-1 bg-gray-300 mx-auto"></div>
                        <p className="text-gray-600 mt-4">Technologies I work with</p>
                    </motion.div>

                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="flex flex-wrap justify-center gap-3"
                    >
                        {skills.map((skill, i) => (
                            <motion.div key={i} variants={scaleIn}>
                                <Badge variant="secondary" className="px-4 py-2 text-base bg-gray-100 text-gray-700 hover:bg-gray-200">
                                    {skill}
                                </Badge>
                            </motion.div>
                        ))}
                    </motion.div>

                    <motion.div variants={fadeInUp} className="text-center mt-8">
                        <Button variant="outline" asChild>
                            <Link href="/skills">
                                View All Skills
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </motion.div>
                </div>
            </motion.section>

            {/* Projects Section */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={staggerContainer}
                className="bg-gray-50 py-20"
            >
                <div className="container mx-auto px-4 max-w-6xl">
                    <motion.div variants={fadeInUp} className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-3">Projects</h2>
                        <div className="w-16 h-1 bg-gray-300 mx-auto"></div>
                        <p className="text-gray-600 mt-4">Some of my recent work</p>
                    </motion.div>

                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {projectData?.result?.map((item: any) => (
                            <motion.div key={item.id} variants={scaleIn}>
                                <Card className="overflow-hidden h-full flex flex-col shadow-sm hover:shadow-md transition-shadow">
                                    <div className="relative overflow-hidden h-48 bg-gray-200">
                                        <img
                                            src={item.projectImage}
                                            alt={item.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <CardHeader>
                                        <CardTitle className="text-xl">{item.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex-1 space-y-3">
                                        <p className="text-gray-600 text-sm leading-relaxed">
                                            {item.desc}
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {item.technologies?.slice(0, 3).map((tech: string, i: number) => (
                                                <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="flex gap-3 pt-2">
                                            <a
                                                href={item.liveLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-sm text-gray-700 hover:text-gray-900 flex items-center gap-1"
                                            >
                                                <ExternalLink className="w-3 h-3" />
                                                Live
                                            </a>
                                            <a
                                                href={item.githubLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-sm text-gray-700 hover:text-gray-900 flex items-center gap-1"
                                            >
                                                {/* <Github className="w-3 h-3" /> */}
                                                Code
                                            </a>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>

                    <motion.div variants={fadeInUp} className="text-center mt-10">
                        <Button variant="outline" asChild>
                            <Link href="/project">
                                View All Projects
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </motion.div>
                </div>
            </motion.section>

            {/* Contact CTA */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={staggerContainer}
                className="py-20"
            >
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <motion.div variants={scaleIn} className="border border-gray-200 rounded-2xl p-10 md:p-16 shadow-sm bg-white">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Let's Work Together
                        </h2>
                        <p className="text-gray-600 mb-8 max-w-lg mx-auto">
                            Have a project in mind? I'd love to hear about it.
                        </p>
                        <Button size="lg" className="bg-gray-900 hover:bg-gray-800 text-white" asChild>
                            <Link href="/contact">
                                Get In Touch
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </motion.div>
                </div>
            </motion.section>

            {/* Footer */}
            <footer className="border-t border-gray-200 py-10 bg-gray-50">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
                        <div>
                            <h4 className="font-semibold text-lg mb-2">{user?.name}</h4>
                            <p className="text-gray-500 text-sm">
                                Full Stack Developer
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-2">Contact</h4>
                            <p className="text-gray-500 text-sm">{user?.email}</p>
                            <p className="text-gray-500 text-sm">{user?.mobile}</p>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-2">Social</h4>
                            <div className="flex justify-center md:justify-end gap-4">
                                <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900">
                                    {/* <Github className="w-5 h-5" /> */}
                                </a>
                                <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900">
                                    {/* <Linkedin className="w-5 h-5" /> */}
                                </a>
                                <a href={`mailto:${user?.email}`} className="text-gray-500 hover:text-gray-900">
                                    <Mail className="w-5 h-5" />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-gray-200 mt-8 pt-6 text-center">
                        <p className="text-gray-400 text-sm">
                            © {new Date().getFullYear()} {user?.name}. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    )
}
