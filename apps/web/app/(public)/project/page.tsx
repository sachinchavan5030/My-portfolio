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
import { motion, Variants } from "framer-motion"
import { FaExternalLinkAlt, FaGithub, FaLinkedin } from "react-icons/fa"
import { SiGmail } from "react-icons/si"
import Link from "next/link"
import { Mail, MapPin, Phone } from "lucide-react"

const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
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

const Project = () => {
    const { data } = useGetProjectQuery()
    const { data: aboutData } = useGetAboutQuery()
    const user = aboutData?.result?.[0]

    const socialIcons = [<FaGithub key="g" />, <FaLinkedin key="l" />, <SiGmail key="m" />]

    return (
        <div className="bg-public-bg min-h-screen pt-25">

            <motion.section
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="container pb-8 text-center"
            >
                <motion.span variants={fadeInUp} className="tracking-[4px] uppercase text-public-text-muted text-sm">
                    Portfolio
                </motion.span>
                <motion.h1 variants={fadeInUp} className="mt-4 text-5xl font-bold text-public-text-heading">
                    My Projects
                </motion.h1>
                <motion.p variants={fadeInUp} className="mt-4 text-public-text-body">
                    A collection of my recent work and builds
                </motion.p>
            </motion.section>

            {data && (
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                    className="container pb-20"
                >
                    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
                        {data.result?.map((item: any, index: number) => (
                            <motion.div
                                key={item.id}
                                variants={scaleIn}
                                whileHover={{ y: -10 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Card className="border-0 overflow-hidden rounded-[30px] bg-public-card-bg public-shadow-lg transition-all duration-500 group h-full flex flex-col">
                                    <div className="overflow-hidden h-[200px]">
                                        <img
                                            src={item.projectImage}
                                            alt={item.title}
                                            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                                        />
                                    </div>
                                    <CardHeader>
                                        <CardTitle className="text-xl text-public-text-heading group-hover:text-[#FF014F] transition-colors duration-500">
                                            {item.title}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex-1">
                                        <p className="text-public-text-body text-sm leading-relaxed">
                                            {item.description}
                                        </p>
                                    </CardContent>
                                    <CardFooter className="flex gap-3">
                                        <Button
                                            size="sm"
                                            className="flex-1 bg-public-card-bg text-[#FF014F] public-shadow hover:bg-[#FF014F] hover:text-white duration-500 rounded-xl"
                                            asChild
                                        >
                                            <a href={item.liveLink} target="_blank" rel="noopener noreferrer">
                                                <FaExternalLinkAlt className="mr-2 h-3 w-3" />
                                                Live Demo
                                            </a>
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="flex-1 bg-public-card-bg text-public-text-heading public-shadow hover:bg-public-hover-bg hover:text-white duration-500 rounded-xl border-0"
                                            asChild
                                        >
                                            <a href={item.githubLink} target="_blank" rel="noopener noreferrer">
                                                <FaGithub className="mr-2 h-3 w-3" />
                                                Code
                                            </a>
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            )}

            <hr className="border-0 h-[2px] my-8 bg-gradient-to-r from-transparent via-public-divider to-transparent" />

            <footer className="border-t border-public-border bg-public-bg py-12">
                <div className="container grid md:grid-cols-3 gap-8">
                    <div>
                        <h4 className="font-semibold text-lg text-public-text-heading">
                            {aboutData?.result?.[0]?.name}
                        </h4>
                        <p className="text-public-text-muted text-sm mt-2">
                            Full Stack Developer building modern web apps with great UI.
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
                                    <span>{aboutData?.result?.[0]?.email}</span>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Phone
                                        size={18}
                                        className="text-black dark:text-white"
                                    />
                                    <span>{aboutData?.result?.[0]?.mobile}</span>
                                </div>

                                <div className="flex items-center gap-3">
                                    <MapPin
                                        size={18}
                                        className="text-black dark:text-white"
                                    />
                                    <span>{aboutData?.result?.[0]?.location}</span>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="md:text-right">
                        <h4 className="font-semibold text-public-text-heading mb-3">Social</h4>
                        <div className="flex gap-4 md:justify-end">
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
                                        className=" h-12 w-12 rounded-xl flex items-center justify-center text-xl bg-public-card-bg public-shadow hover:-translate-y-2 hover:text-[#FF014F] transition-all duration-500 cursor-pointer "
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

        </div>
    )
}

export default Project
