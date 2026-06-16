"use client"

import { useGetAboutQuery } from "@/redux/apis/about.api"
import {
    Card,
    CardContent,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useGetSkillQuery } from "@/redux/apis/skill.api"
import { motion, Variants } from "framer-motion"
import { FaGithub, FaLinkedin, FaLocationArrow, FaMobile } from "react-icons/fa"
import { SiAircall, SiGmail } from "react-icons/si"
import { getIcon } from "@/lib/icon-map"
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
        transition: { staggerChildren: 0.08, delayChildren: 0.1 }
    }
}

const Skill = () => {
    const { data } = useGetSkillQuery()
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
                    Skills
                </motion.span>
                <motion.h1 variants={fadeInUp} className="mt-4 text-5xl font-bold text-public-text-heading">
                    My Skills
                </motion.h1>
                <motion.p variants={fadeInUp} className="mt-4 text-public-text-body max-w-xl mx-auto">
                    Technologies and tools I use to build modern web applications.
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
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {data.result?.map((item: any) => (
                            <motion.div
                                key={item.id}
                                variants={scaleIn}
                                whileHover={{ y: -10, scale: 1.04 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Card className="border-0 rounded-3xl bg-public-card-bg public-shadow-lg transition-all duration-500 h-full">
                                    <CardContent className="flex flex-col items-center justify-center py-12">
                                        <div className="text-[#FF014F] mb-5">
                                            {(() => {
                                                const Icon = getIcon(item.skillIcon)
                                                return <Icon size={35} />
                                            })()}
                                        </div>
                                        <h3 className="text-xl font-semibold text-public-text-heading mb-4">
                                            {item.skills}
                                        </h3>
                                        <Badge
                                            variant="secondary"
                                            className="bg-public-card-bg text-public-text-muted public-shadow-xs border border-public-border"
                                        >
                                            Technology
                                        </Badge>
                                    </CardContent>
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
                            Full Stack Developer passionate about building scalable and modern web applications.
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

export default Skill