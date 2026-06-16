"use client"

import { useGetAboutQuery } from "@/redux/apis/about.api"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import z from "zod"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useAddContactMutation } from "@/redux/apis/contact.api"
import { CREATE_CONTACT_REQUEST } from "@repo/types"
import { toast } from "sonner"
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

const fadeInRight: Variants = {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
}

const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
}

const Contact = () => {
    const { data } = useGetAboutQuery()
    const user = data?.result?.[0]
    // const { data: aboutData } = useGetAboutQuery()
    const [addContact, { isLoading }] = useAddContactMutation()

    const contactSchema = z.object({
        name: z.string(),
        email: z.string(),
        msg: z.string(),
    }) satisfies z.ZodType<CREATE_CONTACT_REQUEST>

    const { register, reset, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(contactSchema)
    })

    const handleContact = async (formData: CREATE_CONTACT_REQUEST) => {
        try {
            await addContact(formData)
            toast.success("Message sent successfully 🚀")
            reset()
        } catch (error) {
            toast.error("Something went wrong")
        }
    }

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
                    Contact
                </motion.span>
                <motion.h1 variants={fadeInUp} className="mt-4 text-5xl font-bold text-public-text-heading">
                    Contact Me
                </motion.h1>
                <motion.p variants={fadeInUp} className="mt-4 text-public-text-body">
                    Let&apos;s connect and build something amazing together 🚀
                </motion.p>
            </motion.section>

            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
                className="container pb-20 grid md:grid-cols-2 gap-8"
            >
                {data && data.result?.map((item: any) => (
                    <motion.div key={item.id} variants={fadeInLeft}>
                        <Card className="border-0 rounded-3xl bg-public-card-bg public-shadow-lg">
                            <CardHeader>
                                <CardTitle className="text-public-text-heading text-2xl">
                                    Get In Touch
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6 text-sm">
                                <div>
                                    <p className="font-medium text-public-text-heading text-base">📧 Email</p>
                                    <p className="text-public-text-muted mt-1">{item.email}</p>
                                </div>
                                <div>
                                    <p className="font-medium text-public-text-heading text-base">📞 Phone</p>
                                    <p className="text-public-text-muted mt-1">{item.mobile}</p>
                                </div>
                                <div>
                                    <p className="font-medium text-public-text-heading text-base">📍 Location</p>
                                    <p className="text-public-text-muted mt-1">{item.location}</p>
                                </div>
                                <div className="pt-4">
                                    <p className="font-medium text-public-text-heading text-base mb-4">Follow Me</p>
                                    <div className="flex gap-4">
                                        {/* {socialIcons.map((icon, i) => (
                                            <div
                                                key={i}
                                                className="h-14 w-14 rounded-xl flex items-center justify-center text-xl bg-public-card-bg public-shadow-sm hover:-translate-y-2 hover:text-[#FF014F] transition-all duration-500 cursor-pointer"
                                            >
                                                {icon}
                                            </div>
                                        ))} */}
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
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}

                <motion.div variants={fadeInRight}>
                    <Card className="border-0 rounded-3xl bg-public-card-bg public-shadow-lg">
                        <CardHeader>
                            <CardTitle className="text-public-text-heading text-2xl">
                                Send Message
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit(handleContact)} className="space-y-5">
                                <div>
                                    <Input
                                        {...register("name")}
                                        placeholder="Your name"
                                        className="bg-public-card-bg border-public-border text-public-text-body placeholder:text-public-text-muted rounded-xl"
                                    />
                                    {errors.name && (
                                        <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
                                    )}
                                </div>
                                <div>
                                    <Input
                                        {...register("email")}
                                        placeholder="Your email"
                                        type="email"
                                        className="bg-public-card-bg border-public-border text-public-text-body placeholder:text-public-text-muted rounded-xl"
                                    />
                                    {errors.email && (
                                        <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
                                    )}
                                </div>
                                <div>
                                    <Textarea
                                        {...register("msg")}
                                        placeholder="Your message"
                                        className="bg-public-card-bg border-public-border text-public-text-body placeholder:text-public-text-muted rounded-xl min-h-[120px]"
                                    />
                                    {errors.msg && (
                                        <p className="text-sm text-red-500 mt-1">{errors.msg.message}</p>
                                    )}
                                </div>
                                <Button
                                    disabled={isLoading}
                                    className="w-full bg-public-card-bg text-[#FF014F] public-shadow hover:bg-[#FF014F] hover:text-white duration-500 rounded-xl py-6"
                                >
                                    {isLoading ? "Sending..." : "Send Message"}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </motion.div>
            </motion.div>

            <hr className="border-0 h-[2px] my-8 bg-gradient-to-r from-transparent via-public-divider to-transparent" />

            <footer className="border-t border-public-border bg-public-bg py-12">
                <div className="container grid md:grid-cols-3 gap-8">
                    <div>
                        <h4 className="font-semibold text-lg text-public-text-heading">
                            {user?.name}
                        </h4>
                        <p className="text-public-text-muted text-sm mt-2">
                            Full Stack Developer building modern web apps.
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

export default Contact
