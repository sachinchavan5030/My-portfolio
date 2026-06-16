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
import { motion, Variants } from "framer-motion"
import { FaGithub, FaLinkedin } from "react-icons/fa"
import { SiGmail } from "react-icons/si"
import Link from "next/link"
import { Mail, MapPin, Phone } from "lucide-react"

const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
}

const fadeInLeft: Variants = {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
}

const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
}

const Experience = () => {
    const { data } = useGetExprienceQuery()
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
                    Experience
                </motion.span>
                <motion.h1 variants={fadeInUp} className="mt-4 text-5xl font-bold text-public-text-heading">
                    Experience
                </motion.h1>
                <motion.p variants={fadeInUp} className="mt-4 text-public-text-body max-w-xl mx-auto">
                    My professional journey and the roles I&apos;ve worked in so far.
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
                    <div className="max-w-3xl mx-auto space-y-8">
                        {data.result?.map((item: any, index: number) => (
                            <motion.div
                                key={item.id}
                                variants={fadeInLeft}
                                whileHover={{ y: -5, scale: 1.01 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Card className="border-0 rounded-3xl bg-public-card-bg public-shadow-lg transition-all duration-500">
                                    <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                                        <div>
                                            <CardTitle className="text-xl text-public-text-heading">
                                                {item.role}
                                            </CardTitle>
                                            <p className="text-public-text-muted text-sm mt-1">
                                                {item.companyName}
                                            </p>
                                        </div>
                                        <Badge variant="secondary" className="bg-public-card-bg text-public-text-muted public-shadow-xs border border-public-border">
                                            {item.workingDate}
                                        </Badge>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-public-text-body leading-relaxed">
                                            {item.desc}
                                        </p>
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

        </div>
    )
}

export default Experience
