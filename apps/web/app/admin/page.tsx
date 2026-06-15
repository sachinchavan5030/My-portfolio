"use client"
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Field, FieldGroup } from '@/components/ui/field'
import { Label } from "@/components/ui/label"
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { About, ABOUT_CREATE_REQUEST } from '@repo/types'
import { useAddAboutMutation, useDeleteAboutMutation, useGetAboutQuery, useUpdateAboutMutation } from '@/redux/apis/about.api'
import { toast } from 'sonner'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { format } from 'date-fns'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { MoreHorizontalIcon } from 'lucide-react'


const AboutMe = () => {
    const { data } = useGetAboutQuery()
    const [addAbout, { isLoading }] = useAddAboutMutation()
    const [updateAbout] = useUpdateAboutMutation()
    const [deleteAbout] = useDeleteAboutMutation()

    const [show, setShow] = useState(false)
    const [showimage, setShowimage] = useState(true)

    const [selectedProfile, setSelectedProfile] = useState<About | null>(null)

    const closeDialog = () => {
        setShow(false)
        setSelectedProfile(null)
        reset({
            name: "",
            email: "",
            mobile: "",
            location: "",
            bio: "",
            dob: new Date(),
            gitHubLink: "",
            linkdinLink: "",
        })
    }


    const aboutSchema = z.object({
        name: z.string().min(2),
        email: z.string().email(),
        mobile: z.string(),
        profilePic: typeof FileList !== 'undefined' ? z.instanceof(FileList) : z.any(),
        dob: z.coerce.date(),
        location: z.string(),
        bio: z.string(),
        gitHubLink: z.string(),
        linkdinLink: z.string(),

    }) satisfies z.ZodType<ABOUT_CREATE_REQUEST>

    const { register, reset, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(aboutSchema)
    })

    const handleFormSubmit = async (userData: ABOUT_CREATE_REQUEST) => {
        console.log(userData)
        try {
            const fd = new FormData()
            fd.append("name", userData.name)
            fd.append("email", userData.email)
            fd.append("mobile", userData.mobile)
            fd.append("location", userData.location)
            fd.append("bio", userData.bio)
            fd.append("gitHubLink", userData.gitHubLink)
            fd.append("linkdinLink", userData.linkdinLink)
            fd.append("dob", new Date(userData.dob).toISOString())
            if (userData.profilePic) {
                fd.append("profile", userData.profilePic[0] as File)
            }
            if (selectedProfile) {
                await updateAbout({ id: selectedProfile.id as number, fd })
                setShow(false)
                toast.success("About update success")
            } else {
                await addAbout(fd).unwrap()
                setShow(false)
                reset()
                toast.success("About register success")
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete = async (id: number) => {
        try {
            await deleteAbout({ id }).unwrap()
            toast.success("about delete success")
        } catch (error) {
            console.log(error)
        }
    }

    const handleEdit = (aboutData: About) => {
        setShow(true)
        setSelectedProfile(aboutData)
        reset({
            name: aboutData.name,
            email: aboutData.email,
            mobile: aboutData.mobile,
            location: aboutData.location as string,
            dob: format(aboutData.dob as Date, "yyyy-MM-dd") as unknown as Date,
            bio: aboutData.bio as string,
            gitHubLink: aboutData.gitHubLink as string,
            linkdinLink: aboutData.linkdinLink as string,
        })
    }


    return <>

        <Dialog open={show}>
            <div className="flex justify-end">
                <DialogTrigger asChild>
                    <Button disabled={isLoading} onClick={() => setShow(true)}>Add Your About</Button>
                </DialogTrigger>
            </div>
            <DialogContent isLoading={isLoading} closeDialog={closeDialog} className="sm:max-w-lg">
                <form onSubmit={handleSubmit(handleFormSubmit)}>
                    <DialogHeader >
                        {
                            selectedProfile
                                ? <DialogTitle>Update Profile</DialogTitle>
                                : <DialogTitle>Save Profile</DialogTitle>

                        }
                        <DialogDescription>
                            Make changes to your profile here. Click save when you&apos;re
                            done.
                        </DialogDescription>
                    </DialogHeader>
                    <FieldGroup className="grid grid-cols-2 gap-2">
                        <Field>
                            <Label htmlFor="name-1">Name</Label>
                            <Input disabled={isLoading} {...register("name")} id="name-1" name="name" />
                        </Field>
                        <Field>
                            <Label htmlFor="email-1">Email</Label>
                            <Input disabled={isLoading} {...register("email")} id="email-1" />
                        </Field>
                        <Field>
                            <Label htmlFor="mobile-1">Mobile</Label>
                            <Input disabled={isLoading} {...register("mobile")} id="mobile-1" />
                        </Field>
                        <Field>
                            <Label htmlFor="location-1">Location</Label>
                            <Input disabled={isLoading} {...register("location")} id="location-1" />
                        </Field>
                        <Field>
                            <Label htmlFor="bio-1">Bio</Label>
                            <Input disabled={isLoading} {...register("bio")} id="bio-1" />
                        </Field>
                        <Field>
                            <Label htmlFor="date-of-birth-1">Date of Birth</Label>
                            <Input disabled={isLoading} {...register("dob")} id="date-of-birth-1" type="date" />
                        </Field>
                        <Field>
                            <Label htmlFor="gitHubLink">GitHubLink</Label>
                            <Input disabled={isLoading} {...register("gitHubLink")} id="gitHubLink" />
                        </Field>
                        <Field>
                            <Label htmlFor="linkdinLink">LinkdinLink</Label>
                            <Input disabled={isLoading} {...register("linkdinLink")} id="linkdinLink" />
                        </Field>
                        <Field>
                            {
                                selectedProfile && showimage
                                    ? <>
                                        <img src={selectedProfile.profilePic as string} height={50} width={50} alt="" />
                                        <Button onClick={() => setShowimage(false)} variant={"secondary"}>Change Image</Button>
                                    </>
                                    : <>
                                        <Label htmlFor="profile-1">Profile</Label>
                                        <Input disabled={isLoading} {...register("profilePic")} id="profile-1" type="file" />
                                        {!showimage && <Button onClick={() => setShowimage(true)}> Cancle</Button>}
                                    </>
                            }

                        </Field>
                    </FieldGroup>
                    <DialogFooter className="mt-3">
                        <DialogClose asChild>
                            <Button disabled={isLoading} onClick={closeDialog} variant="outline">Cancel</Button>
                        </DialogClose>
                        {
                            selectedProfile
                                ? <Button type="submit">Update Your Profile</Button>
                                : <Button disabled={isLoading} type="submit">Save Changes</Button>

                        }
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog >



        <div className="overflow-x-auto w-full">
            {data && <Table >
                <TableCaption >A list of your recent invoices.</TableCaption>
                <TableHeader>
                    <TableRow className="">
                        <TableHead>Id</TableHead>
                        <TableHead>Profile</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Eamil</TableHead>
                        <TableHead>Mobile</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>JobRole</TableHead>
                        <TableHead>Date of Birth</TableHead>
                        <TableHead>GitHubLink</TableHead>
                        <TableHead>LinkdinLink</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.result?.map((item) =>
                        <TableRow key={item.id}>
                            <TableCell>{item.id}</TableCell>
                            <TableCell><Avatar><AvatarImage height={70} width={70} src={item.profilePic as string} alt="" /></Avatar></TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.email}</TableCell>
                            <TableCell>{item.mobile}</TableCell>
                            <TableCell >{item.location}</TableCell>
                            <TableCell >{item.bio}</TableCell>
                            <TableCell>{format(item.dob as Date, "yyyy-MM-dd")}</TableCell>
                            <TableCell >{item.gitHubLink}</TableCell>
                            <TableCell >{item.linkdinLink}</TableCell>
                            <TableCell className="text-right">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="size-8">
                                            <MoreHorizontalIcon />
                                            <span className="sr-only">Open menu</span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem onClick={() => handleEdit(item)}>Edit</DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="text-red-500" onClick={() => handleDelete(item.id as number)}>
                                            Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table >
            }
        </div>
    </>
}

export default AboutMe