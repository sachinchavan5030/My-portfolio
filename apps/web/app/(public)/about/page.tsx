"use client"

import { useGetAboutQuery } from "@/redux/apis/about.api"
import {
    Card,
    CardContent,
} from "@/components/ui/card"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { motion, Variants } from "framer-motion"
import { FaGithub, FaLinkedin } from "react-icons/fa"
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

const About = () => {
    const { data } = useGetAboutQuery()
    const user = data?.result?.[0]

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
                    About
                </motion.span>
                <motion.h1 variants={fadeInUp} className="mt-4 text-5xl font-bold text-public-text-heading">
                    About Me
                </motion.h1>
                <motion.p variants={fadeInUp} className="mt-4 text-public-text-body max-w-xl mx-auto">
                    Get to know more about me, my education, and personal details.
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
                    {data.result?.map((item: any) => (
                        <motion.div key={item.id} variants={scaleIn}>
                            <Card className="border-0 rounded-3xl bg-public-card-bg public-shadow-lg p-6 md:p-8">
                                <div className="grid md:grid-cols-3 gap-8 items-start">
                                    <div className="flex flex-col items-center text-center gap-4">
                                        <Avatar className="h-40 w-40">
                                            <AvatarImage src={item.profilePic} />
                                        </Avatar>
                                        <div>
                                            <h2 className="text-xl font-semibold text-public-text-heading">
                                                {item.name}
                                            </h2>
                                            <Badge className="mt-2 bg-public-card-bg text-[#FF014F] public-shadow-xs border border-public-border">
                                                Full Stack Developer
                                            </Badge>
                                        </div>
                                    </div>
                                    <div className="md:col-span-2">
                                        <Tabs defaultValue="bio" className="w-full">
                                            <TabsList className="grid grid-cols-3 w-full bg-public-card-bg">
                                                <TabsTrigger
                                                    value="bio"
                                                    className="text-public-text-muted data-[state=active]:text-public-text-heading data-[state=active]:bg-public-card-bg"
                                                >
                                                    Bio
                                                </TabsTrigger>
                                                <TabsTrigger
                                                    value="education"
                                                    className="text-public-text-muted data-[state=active]:text-public-text-heading data-[state=active]:bg-public-card-bg"
                                                >
                                                    Education
                                                </TabsTrigger>
                                                <TabsTrigger
                                                    value="personal"
                                                    className="text-public-text-muted data-[state=active]:text-public-text-heading data-[state=active]:bg-public-card-bg"
                                                >
                                                    Personal
                                                </TabsTrigger>
                                            </TabsList>
                                            <TabsContent value="bio">
                                                <Card className="mt-4 border-0 bg-public-card-bg public-shadow-sm">
                                                    <CardContent className="text-public-text-body leading-relaxed p-6">
                                                        {item.bio}
                                                    </CardContent>
                                                </Card>
                                            </TabsContent>
                                            <TabsContent value="education">
                                                <Card className="mt-4 border-0 bg-public-card-bg public-shadow-sm">
                                                    <CardContent className="space-y-2 p-6">
                                                        <h4 className="font-semibold text-public-text-heading">
                                                            Bachelor of Computer Applications (BCA)
                                                        </h4>
                                                        <p className="text-public-text-muted text-sm">
                                                            Dr. Babasaheb Ambedkar Marathwada University,
                                                            Chhatrapati Sambhajinagar
                                                        </p>
                                                    </CardContent>
                                                </Card>
                                            </TabsContent>
                                            <TabsContent value="personal">
                                                <Card className="mt-4 border-0 bg-public-card-bg public-shadow-sm">
                                                    <CardContent className="grid sm:grid-cols-2 gap-3 text-sm p-6">
                                                        <p className="text-public-text-body">
                                                            <strong className="text-public-text-heading">Name:</strong>{" "}
                                                            {item.name}
                                                        </p>
                                                        <p className="text-public-text-body">
                                                            <strong className="text-public-text-heading">Email:</strong>{" "}
                                                            {item.email}
                                                        </p>
                                                        <p className="text-public-text-body">
                                                            <strong className="text-public-text-heading">Mobile:</strong>{" "}
                                                            {item.mobile}
                                                        </p>
                                                        <p className="text-public-text-body">
                                                            <strong className="text-public-text-heading">DOB:</strong>{" "}
                                                            {new Date(item.dob).toLocaleDateString("en-GB")}
                                                        </p>
                                                        <p className="text-public-text-body">
                                                            <strong className="text-public-text-heading">Location:</strong>{" "}
                                                            {item.location}
                                                        </p>
                                                    </CardContent>
                                                </Card>
                                            </TabsContent>
                                        </Tabs>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            )}

            <hr className="border-0 h-[2px] my-8 bg-gradient-to-r from-transparent via-public-divider to-transparent" />

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

        </div>
    )
}

export default About
