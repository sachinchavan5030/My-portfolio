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

const About = () => {
    const { data } = useGetAboutQuery()

    return (
        <div className="bg-background text-foreground">

            {/* Heading */}
            <section className="container py-16 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-3">
                    About Me 👨‍💻
                </h1>
                <p className="text-muted-foreground max-w-xl mx-auto">
                    Get to know more about me, my education, and personal details.
                </p>
            </section>

            {/* Content */}
            {data && (
                <div className="container pb-20 space-y-10">

                    {data.result?.map((item: any) => (
                        <Card
                            key={item.id}
                            className="p-6 md:p-8 shadow-lg border-muted/40 backdrop-blur-xl"
                        >
                            <div className="grid md:grid-cols-3 gap-8 items-start">

                                {/* Profile */}
                                <div className="flex flex-col items-center text-center gap-4">
                                    <Avatar className="h-40 w-40">
                                        <AvatarImage src={item.profilePic} />
                                    </Avatar>

                                    <div>
                                        <h2 className="text-xl font-semibold">{item.name}</h2>
                                        <Badge className="mt-2">Full Stack Developer</Badge>
                                    </div>
                                </div>

                                {/* Tabs */}
                                <div className="md:col-span-2">

                                    <Tabs defaultValue="bio" className="w-full">

                                        <TabsList className="grid grid-cols-3 w-full">
                                            <TabsTrigger value="bio">Bio</TabsTrigger>
                                            <TabsTrigger value="education">Education</TabsTrigger>
                                            <TabsTrigger value="personal">Personal</TabsTrigger>
                                        </TabsList>

                                        {/* Bio */}
                                        <TabsContent value="bio">
                                            <Card className="mt-4 shadow-none border-none">
                                                <CardContent className="text-muted-foreground leading-relaxed">
                                                    {item.bio}
                                                </CardContent>
                                            </Card>
                                        </TabsContent>

                                        {/* Education */}
                                        <TabsContent value="education">
                                            <Card className="mt-4">
                                                <CardContent className="space-y-2">
                                                    <h4 className="font-semibold">
                                                        Bachelor of Computer Applications (BCA)
                                                    </h4>
                                                    <p className="text-muted-foreground text-sm">
                                                        Dr. Babasaheb Ambedkar Marathwada University,
                                                        Chhatrapati Sambhajinagar
                                                    </p>
                                                </CardContent>
                                            </Card>
                                        </TabsContent>

                                        {/* Personal */}
                                        <TabsContent value="personal">
                                            <Card className="mt-4">
                                                <CardContent className="grid sm:grid-cols-2 gap-3 text-sm">

                                                    <p><strong>Name:</strong> {item.name}</p>
                                                    <p><strong>Email:</strong> {item.email}</p>
                                                    <p><strong>Mobile:</strong> {item.mobile}</p>
                                                    <p>
                                                        <strong>DOB:</strong>{" "}
                                                        {new Date(item.dob).toLocaleDateString("en-GB")}
                                                    </p>
                                                    <p><strong>Location:</strong> {item.location}</p>

                                                </CardContent>
                                            </Card>
                                        </TabsContent>

                                    </Tabs>

                                </div>

                            </div>
                        </Card>
                    ))}

                </div>
            )}

            {/* Footer */}
            <footer className="border-t bg-muted/30 backdrop-blur-xl py-12">
                <div className="container grid md:grid-cols-3 gap-8">

                    {/* About */}
                    <div>
                        <h4 className="font-semibold text-lg">
                            {data?.result?.[0]?.name}
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
                            <p>📧 {data?.result?.[0]?.email}</p>
                            <p>📞 {data?.result?.[0]?.mobile}</p>
                            <p>📍 {data?.result?.[0]?.location}, Maharashtra</p>
                        </div>
                    </div>

                    {/* Social */}
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

export default About