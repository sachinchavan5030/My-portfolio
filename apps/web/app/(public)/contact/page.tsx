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

const Contact = () => {
    const { data } = useGetAboutQuery()
    const { data: aboutData } = useGetAboutQuery()
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

    return (
        <div className="bg-background text-foreground">

            {/* Heading */}
            <section className="container py-16 text-center">
                <h1 className="text-4xl font-bold mb-4">Contact Me</h1>
                <p className="text-muted-foreground">
                    Let's connect and build something amazing together 🚀
                </p>
            </section>

            <div className="container pb-16 grid md:grid-cols-2 gap-8">

                {/* LEFT SIDE */}
                {data && data.result?.map((item: any) => (
                    <Card key={item.id} className="rounded-2xl shadow-sm">

                        <CardHeader>
                            <CardTitle>Get In Touch</CardTitle>
                        </CardHeader>

                        <CardContent className="space-y-4 text-sm">

                            <div>
                                <p className="font-medium">📧 Email</p>
                                <p className="text-muted-foreground">{item.email}</p>
                            </div>

                            <div>
                                <p className="font-medium">📞 Phone</p>
                                <p className="text-muted-foreground">{item.mobile}</p>
                            </div>

                            <div>
                                <p className="font-medium">📍 Location</p>
                                <p className="text-muted-foreground">{item.location}</p>
                            </div>

                            <div className="pt-4">
                                <p className="font-medium mb-2">Follow Me</p>
                                <div className="flex gap-4">
                                    <a href="#" className="hover:text-primary">GitHub</a>
                                    <a href="#" className="hover:text-primary">LinkedIn</a>
                                    <a href="#" className="hover:text-primary">Email</a>
                                </div>
                            </div>

                        </CardContent>
                    </Card>
                ))}

                {/* RIGHT SIDE FORM */}
                <Card className="rounded-2xl shadow-sm">

                    <CardHeader>
                        <CardTitle>Send Message</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={handleSubmit(handleContact)} className="space-y-4">

                            {/* Name */}
                            <div>
                                <Input
                                    {...register("name")}
                                    placeholder="Your name"
                                />
                                {errors.name && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {errors.name.message}
                                    </p>
                                )}
                            </div>

                            {/* Email */}
                            <div>
                                <Input
                                    {...register("email")}
                                    placeholder="Your email"
                                    type="email"
                                />
                                {errors.email && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>

                            {/* Message */}
                            <div>
                                <Textarea
                                    {...register("msg")}
                                    placeholder="Your message"
                                />
                                {errors.msg && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {errors.msg.message}
                                    </p>
                                )}
                            </div>

                            {/* Button */}
                            <Button disabled={isLoading} className="w-full">
                                {isLoading ? "Sending..." : "Send Message"}
                            </Button>

                        </form>
                    </CardContent>
                </Card>

            </div>

            {/* Footer */}
            <footer className="border-t bg-muted/30 backdrop-blur-xl py-12">
                <div className="container grid md:grid-cols-3 gap-8">

                    <div>
                        <h4 className="font-semibold text-lg">
                            {aboutData?.result?.[0]?.name}
                        </h4>
                        <p className="text-muted-foreground text-sm mt-2">
                            Full Stack Developer building modern web apps.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-3">Contact</h4>
                        <div className="text-muted-foreground text-sm space-y-1">
                            <p>📧 {aboutData?.result?.[0]?.email}</p>
                            <p>📞 {aboutData?.result?.[0]?.mobile}</p>
                            <p>📍 {aboutData?.result?.[0]?.location}, Maharashtra</p>
                        </div>
                    </div>

                    <div className="md:text-right">
                        <h4 className="font-semibold mb-3">Social</h4>
                        <div className="flex gap-4 md:justify-end">
                            <a href="#" className="hover:text-primary">GitHub</a>
                            <a href="#" className="hover:text-primary">LinkedIn</a>
                            <a href="#" className="hover:text-primary">Email</a>
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

export default Contact