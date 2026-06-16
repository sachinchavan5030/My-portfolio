"use client"


import { useGetAboutQuery } from "@/redux/apis/about.api"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useGetProjectQuery } from "@/redux/apis/project.api"
import { useGetExprienceQuery } from "@/redux/apis/exprience.api"
import { motion, useScroll, useTransform, Variants } from "framer-motion"
import { useEffect, useState } from "react"
import {
    FaArrowRight,
    FaAward,
    FaBriefcase,
    FaCheckCircle,
    FaCode,
    FaDownload,
    FaExternalLinkAlt,
    FaGithub,
    FaLinkedin,
    FaUser,
} from "react-icons/fa";

import {
    SiReact,
    SiNextdotjs,
    SiNodedotjs,
    SiTypescript,
    SiRedux,
    SiMongodb,
    SiTailwindcss,
    SiPostgresql,
    SiGmail,
} from "react-icons/si";
import Link from "next/link"
import { Mail, MapPin, Phone } from "lucide-react"

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
        <div className="bg-public-bg min-h-screen overflow-hidden pt-25">
            {/* Hero Section */}

            <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative min-h-screen flex items-center overflow-hidden bg-public-bg"
            >
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-pink-500/10 blur-[120px]" />
                    <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-purple-500/10 blur-[120px]" />
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -80 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="tracking-[4px] uppercase text-public-text-muted text-sm">
                                Welcome To My Portfolio
                            </span>

                            <h1 className="mt-6 text-6xl lg:text-7xl font-extrabold leading-tight text-public-text-heading">
                                Hi, I'm{" "}
                                <span className="text-[#FF014F]">
                                    {user?.name}
                                </span>
                            </h1>

                            <h2 className="mt-4 text-2xl md:text-4xl font-semibold text-public-text-body">
                                Full Stack Developer
                            </h2>

                            <div className="flex flex-wrap gap-5 mt-10">

                                <Button className=" bg-public-card-bg text-public-text-heading px-8 py-6 rounded-xl public-shadow hover:bg-public-hover-bg hover:text-white duration-500">
                                    <a href={exprience?.resume as string} download>
                                        <FaDownload className="mr-2 h-3 w-4" />
                                        Download CV
                                    </a>
                                </Button>

                                <Button
                                    variant="outline"
                                    className="bg-public-card-bg text-public-text-heading px-8 py-6 rounded-xl public-shadow hover:bg-public-hover-bg hover:text-white duration-500 ">
                                    <Link href="/contact">
                                        Contact Me
                                    </Link>

                                    <FaArrowRight className="mr-2 h-3 w-4" />
                                </Button>
                            </div>

                            <div className="flex gap-5 mt-12">
                                {[
                                    {
                                        icon: <FaGithub />,
                                        href: user?.gitHubLink,
                                    },
                                    {
                                        icon: <FaLinkedin />,
                                        href: user?.linkdinLink?.startsWith("http")
                                            ? user.linkdinLink
                                            : `https://${user?.linkdinLink}`,
                                    },
                                    {
                                        icon: <SiGmail />,
                                        href: `mailto:${user?.email}`,
                                    },
                                ].map((item, i) => (
                                    <Link
                                        key={i}
                                        href={item.href || "#"}
                                        target="_blank"
                                        className="
        h-14
        w-14
        rounded-xl
        flex
        items-center
        justify-center
        text-xl
        bg-public-card-bg
        public-shadow
        hover:-translate-y-2
        hover:text-[#FF014F]
        transition-all
        duration-500
        cursor-pointer
        "
                                    >
                                        {item.icon}
                                    </Link>
                                ))}
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 80 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="flex justify-center">
                            <div className="relative">
                                <motion.div className=" w-[420px] h-[520px] rounded-[30px] overflow-hidden bg-public-card-bg public-shadow-lg ">
                                    <img
                                        src={user?.profilePic as string}
                                        className="w-full h-full object-cover"
                                        alt="profile"
                                    />
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.section>

            <hr className="border-0 h-[2px] my-8 bg-gradient-to-r from-transparent via-public-divider to-transparent" />

            {/* About Section  */}

            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="py-5 bg-public-bg" >
                <div className="container mx-auto px-6">
                    <div className="text-center mb-20">
                        <h2 className="mt-4 text-5xl font-bold text-public-text-heading">
                            About Me
                        </h2>
                    </div>
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -80 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="mt-5 text-5xl font-bold text-public-text-heading">
                                Professional Full Stack Developer
                            </h2>

                            <p className="mt-8 text-lg text-public-text-muted leading-loose">
                                {user?.bio}
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 80 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >

                            <div className="mt-10 space-y-6">{[
                                "Modern React & Next.js Development",
                                "Responsive Mobile Friendly UI",
                                "SEO Optimized Applications",
                                "REST API & Backend Integration"
                            ].map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-4"
                                >
                                    <div className=" h-12 w-12 rounded-xl flex items-center justify-center bg-public-card-bg public-shadow-sm ">
                                        <FaCheckCircle className="text-[#FF014F]" />
                                    </div>

                                    <span className="text-public-text-body text-lg">
                                        {item}
                                    </span>
                                </div>
                            ))}
                            </div>

                        </motion.div>

                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-24">

                        {[
                            {
                                icon: FaAward,
                                value: exprience?.exprienceYear,
                                title: "Years Experience"
                            },
                            {
                                icon: FaCode,
                                value: exprience?.projects,
                                title: "Projects"
                            },
                            {
                                icon: FaBriefcase,
                                value: exprience?.technologies,
                                title: "Technologies"
                            },
                            {
                                icon: FaUser,
                                value: exprience?.happyClient,
                                title: "Happy Clients"
                            }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                whileHover={{
                                    y: -10,
                                    scale: 1.03
                                }}
                            >
                                <Card className=" border-0 rounded-3xl bg-public-card-bg public-shadow-lg ">
                                    <CardContent className="p-10 text-center">
                                        <item.icon className=" mx-auto mb-6 text-[#FF014F] " size={40} />

                                        <h3 className="text-5xl font-bold text-public-text-heading">
                                            {item.value}+
                                        </h3>

                                        <p className="mt-3 text-public-text-muted">
                                            {item.title}
                                        </p>

                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}

                    </div>

                </div>
            </motion.section>

            <hr className="border-0 h-[2px] my-8 bg-gradient-to-r from-transparent via-public-divider to-transparent" />

            {/* Skills Section */}

            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="py-5 bg-public-bg"
            >
                <div className="container mx-auto px-6">
                    <div className="text-center mb-20">
                        <h2 className="mt-4 text-5xl font-bold text-public-text-heading">
                            My Skills
                        </h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {[
                            {
                                icon: <SiReact size={45} />,
                                title: "React.js"
                            },
                            {
                                icon: <SiNextdotjs size={45} />,
                                title: "Next.js"
                            },
                            {
                                icon: <SiNodedotjs size={45} />,
                                title: "Node.js"
                            },
                            {
                                icon: <SiTypescript size={45} />,
                                title: "TypeScript"
                            },
                            {
                                icon: <SiRedux size={45} />,
                                title: "Redux"
                            },
                            {
                                icon: <SiMongodb size={45} />,
                                title: "MongoDB"
                            },
                            {
                                icon: <SiTailwindcss size={45} />,
                                title: "Tailwind CSS"
                            },
                            {
                                icon: <SiPostgresql size={45} />,
                                title: "PostgreSQL"
                            }
                        ].map((skill, index) => (

                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.6,
                                    delay: index * 0.1
                                }}
                                whileHover={{ y: -12, scale: 1.04 }}>
                                <Card
                                    className=" border-0 h-[220px] rounded-3xl bg-public-card-bg public-shadow-lg hover-public-shadow-sm transition-all duration-500 ">
                                    <CardContent
                                        className=" flex flex-col items-center justify-center h-full text-center ">
                                        <div className="text-[#FF014F]">
                                            {skill.icon}
                                        </div>

                                        <h3 className=" mt-8 text-xl font-semibold text-public-text-heading ">
                                            {skill.title}
                                        </h3>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}

                    </div>

                    <div className="text-center mt-20">

                        <Button className=" px-8 py-6 bg-public-card-bg text-[#FF014F] public-shadow hover:bg-[#FF014F] hover:text-white duration-500 ">
                            View All Skills
                        </Button>

                    </div>

                </div>
            </motion.section>

            <hr className="border-0 h-[2px] my-8 bg-gradient-to-r from-transparent via-public-divider to-transparent" />

            {/* Project Session */}

            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="py-5 bg-public-bg"
            >
                <div className="container mx-auto px-6">
                    <div className="text-center mb-20">
                        <h2 className="mt-4 text-5xl font-bold text-public-text-heading">
                            My Projects
                        </h2>
                    </div>
                    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-10">
                        {projectData?.result?.map((item: any, index: number) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 60 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: index * 0.1 }}
                                whileHover={{ y: -15 }}>

                                <Card className=" border-0 overflow-hidden rounded-[30px] bg-public-card-bg public-shadow-lg transition-all duration-500 group ">
                                    <div className=" overflow-hidden h-[260px] " >
                                        <img
                                            src={item.projectImage}
                                            alt={item.title}
                                            className=" w-full h-full object-cover transition-all duration-700 group-hover:scale-110 "
                                        />
                                    </div>

                                    <CardContent className="p-8">
                                        <div className="flex justify-between items-center mb-4">
                                        </div>
                                        <h3 className=" text-2xl font-bold text-public-text-heading group-hover:text-[#FF014F] transition-all duration-500 ">
                                            {item.title}
                                        </h3>
                                        <p className=" mt-4 text-public-text-heading leading-relaxed ">
                                            {item.description}
                                        </p>

                                        <div className="flex flex-wrap gap-2 mt-5">

                                            {item.technologies
                                                ?.slice(0, 4)
                                                .map((tech: string, i: number) => (

                                                    <span
                                                        key={i}
                                                        className="
                                            px-3
                                            py-1
                                            text-xs
                                            rounded-full
                                            bg-public-tech-tag
                                            text-[#FF014F]
                                            shadow-sm
                                            "
                                                    >
                                                        {tech}
                                                    </span>

                                                ))}
                                        </div>

                                        {/* Links */}

                                        <div className="flex gap-6 mt-8">

                                            <a
                                                href={item.liveLink}
                                                target="_blank"
                                                className="
                                    flex
                                    items-center
                                    gap-2
                                    text-public-text-heading
                                    hover:text-[#FF014F]
                                    duration-300
                                    "
                                            >
                                                <FaExternalLinkAlt size={16} />
                                                Live Demo
                                            </a>

                                            <a
                                                href={item.githubLink}
                                                target="_blank"
                                                className="
                                    flex
                                    items-center
                                    gap-2
                                    text-public-text-heading
                                    hover:text-[#FF014F]
                                    duration-300
                                    "
                                            >
                                                <FaGithub />
                                                Source Code
                                            </a>

                                        </div>

                                    </CardContent>

                                </Card>
                            </motion.div>

                        ))}

                    </div>

                    {/* Button */}

                    <div className="text-center mt-20">

                        <Button
                            className="
                px-8
                py-6
                bg-public-card-bg
                text-[#FF014F]
                public-shadow
                hover:bg-[#FF014F]
                hover:text-white
                duration-500
                "
                        >
                            View All Projects
                        </Button>

                    </div>

                </div>
            </motion.section>

            <hr className="border-0 h-[2px] my-8 bg-gradient-to-r from-transparent via-public-divider to-transparent" />

            {/* Contact CTA */}
            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="py-5 bg-public-bg"
            >
                <div className="container mx-auto px-6">

                    <motion.div
                        whileHover={{
                            y: -8
                        }}
                        className="
            relative
            overflow-hidden
            rounded-[40px]
            bg-public-card-bg
            public-shadow-xl
            "
                    >

                        {/* Background Glow */}

                        <div
                            className="
                absolute
                top-0
                right-0
                h-80
                w-80
                bg-[#FF014F]/10
                blur-[120px]
                rounded-full
                "
                        />

                        <div
                            className="
                relative
                z-10
                p-10
                md:p-20
                text-center
                "
                        >

                            <span
                                className="
                    uppercase
                    tracking-[4px]
                    text-[#FF014F]
                    text-sm
                    "
                            >
                                Contact
                            </span>

                            <h2
                                className="
                    mt-5
                    text-4xl
                    md:text-6xl
                    font-bold
                    text-public-text-heading
                    "
                            >
                                Let's Work Together
                            </h2>

                            <p
                                className="
                    mt-6
                    text-lg
                    text-public-text-muted
                    max-w-2xl
                    mx-auto
                    "
                            >
                                Have a project in mind? Looking for a Full Stack Developer?
                                Let's build something amazing together.
                            </p>

                            <Button
                                size="lg"
                                className="
                    mt-10
                    px-10
                    py-7
                    bg-public-card-bg
                    text-[#FF014F]
                    public-shadow
                    hover:bg-[#FF014F]
                    hover:text-white
                    duration-500
                    "
                            >
                                Get In Touch
                                <FaArrowRight className="ml-2 h-4 w-4" />
                            </Button>

                        </div>

                    </motion.div>

                </div>
            </motion.section>

            <hr className="border-0 h-[2px] my-8 bg-gradient-to-r from-transparent via-public-divider to-transparent" />

            {/* Footer */}

            {/* <footer className="bg-public-card-bg py-20">

                <div className="container mx-auto px-6">

                    <div className="grid md:grid-cols-3 gap-10">


                        <div>

                            <h3 className=" text-3xl font-bold text-public-text-heading ">
                                {user?.name}
                            </h3>

                            <p className="mt-4 text-public-text-muted">
                                Full Stack Developer
                            </p>

                        </div>


                        <div>

                            <h4 className=" font-semibold text-xl mb-5 ">
                                Contact
                            </h4>

                            <p className="text-public-text-muted">
                                {user?.email}
                            </p>

                            <p className="mt-2 text-public-text-muted">
                                {user?.mobile}
                            </p>

                        </div>


                        <div>

                            <h4
                                className="
                    font-semibold
                    text-xl
                    mb-5
                    "
                            >
                                Follow Me
                            </h4>



                            <div className="flex gap-5 mt-12">
                                {[
                                    {
                                        icon: <FaGithub />,
                                        href: user?.gitHubLink,
                                    },
                                    {
                                        icon: <FaLinkedin />,
                                        href: user?.linkdinLink?.startsWith("http")
                                            ? user.linkdinLink
                                            : `https://${user?.linkdinLink}`,
                                    },
                                    {
                                        icon: <SiGmail />,
                                        href: `mailto:${user?.email}`,
                                    },
                                ].map((item, i) => (
                                    <Link
                                        key={i}
                                        href={item.href || "#"}
                                        target="_blank"
                                        className="
        h-14
        w-14
        rounded-xl
        flex
        items-center
        justify-center
        text-xl
        bg-public-card-bg
        public-shadow
        hover:-translate-y-2
        hover:text-[#FF014F]
        transition-all
        duration-500
        cursor-pointer
        "
                                    >
                                        {item.icon}
                                    </Link>
                                ))}
                            </div>


                        </div>

                    </div>


                    <div
                        className="
            mt-16
            pt-8
            border-t
            border-public-border
            text-center
            "
                    >
                        <p className="text-public-text-muted">
                            © {new Date().getFullYear()} {user?.name}.
                            All Rights Reserved.
                        </p>
                    </div>

                </div>

            </footer> */}

            <footer className="border-t border-public-border bg-public-bg py-12">
                <div className="container grid md:grid-cols-3 gap-8">
                    <div>
                        <h4 className="font-semibold text-lg text-public-text-heading">
                            {data?.result?.[0]?.name}
                        </h4>
                        <p className="text-public-text-muted text-sm mt-2">
                            Full Stack Developer passionate about building scalable
                            and modern web applications.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-public-text-heading mb-3">Contact</h4>
                        <div className="text-public-text-muted text-sm space-y-1">
                            <div className="flex flex-wrap gap-8 items-center text-sm md:text-base">
                                <div className="flex items-center gap-3">
                                    <Mail
                                        size={18}
                                        className="text-black dark:text-white"
                                    />
                                    <span>{user?.email}</span>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Phone
                                        size={18}
                                        className="text-black dark:text-white"
                                    />
                                    <span>{user?.mobile}</span>
                                </div>

                                <div className="flex items-center gap-3">
                                    <MapPin
                                        size={18}
                                        className="text-black dark:text-white"
                                    />
                                    <span>{user?.location}</span>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="md:text-right">
                        <h4 className="font-semibold text-public-text-heading mb-3">Social</h4>
                        <div className="flex gap-4 md:justify-end">
                            {/* {socialIcons.map((icon, i) => (
                                            <div
                                                key={i}
                                                className="h-12 w-12 rounded-xl flex items-center justify-center text-lg bg-public-card-bg public-shadow-sm hover:-translate-y-2 hover:text-[#FF014F] transition-all duration-500 cursor-pointer"
                                            >
                                                {icon}
                                            </div>
                                        ))} */}
                            <div className="flex gap-5 mt-1">
                                {[
                                    {
                                        icon: <FaGithub key="g" />,
                                        href: user?.gitHubLink,
                                    },
                                    {
                                        icon: <FaLinkedin key="l" />,
                                        href: user?.linkdinLink?.startsWith("http")
                                            ? user.linkdinLink
                                            : `https://${user?.linkdinLink}`,
                                    },
                                    {
                                        icon: <SiGmail key="m" />,
                                        href: `mailto:${user?.email}`,
                                    },
                                ].map((item, i) => (
                                    <Link
                                        key={i}
                                        href={item.href || "#"}
                                        target="_blank"
                                        className="
                                                h-12
                                                w-12
                                                rounded-xl
                                                flex
                                                items-center
                                                justify-center
                                                text-xl
                                                bg-public-card-bg
                                                public-shadow
                                                hover:-translate-y-2
                                                hover:text-[#FF014F]
                                                transition-all
                                                duration-500
                                                cursor-pointer
                                                "
                                    >
                                        {item.icon}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <p className="text-center text-sm text-public-text-muted mt-8">
                    &copy; 2026 Sachin &mdash; Built with shadcn UI
                </p>
            </footer>

        </div >
    )
}
