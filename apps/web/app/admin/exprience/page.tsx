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
import { About, Exprience, EXPRIENCE_CREATE_REQUEST } from '@repo/types'
import { toast } from 'sonner'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { format } from 'date-fns'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { MoreHorizontalIcon } from 'lucide-react'
import { useAddExprienceMutation, useDeleteExprienceMutation, useGetExprienceQuery, useUpdateExprienceMutation } from '@/redux/apis/exprience.api'


const MyExprience = () => {
    const { data } = useGetExprienceQuery()
    const [addExprience, { isLoading }] = useAddExprienceMutation()
    const [updateExprience] = useUpdateExprienceMutation()
    const [deleteExprience] = useDeleteExprienceMutation()

    const [show, setShow] = useState(false)
    const [showimage, setShowimage] = useState(true)

    const [selectedResume, setSelectedResume] = useState<Exprience | null>(null)

    const closeDialog = () => {
        setShow(false)
        setSelectedResume(null)
        reset({
            exprienceYear: "",
            projects: "",
            happyClient: "",
            technologies: "",
            description: "",
            doj: new Date(),
            dor: new Date(),
            companyName: "",
            role: "",
            eDesc: ""
        })
    }


    const exprienceSchema = z.object({
        exprienceYear: z.string(),
        projects: z.string(),
        happyClient: z.string(),
        technologies: z.string(),
        description: z.string(),
        resume: typeof FileList !== 'undefined' ? z.instanceof(FileList) : z.any(),

        doj: z.coerce.date(),
        dor: z.coerce.date(),
        companyName: z.string(),
        role: z.string(),
        eDesc: z.string(),


    }) satisfies z.ZodType<EXPRIENCE_CREATE_REQUEST>

    const { register, reset, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(exprienceSchema)
    })

    const handleFormSubmit = async (userData: EXPRIENCE_CREATE_REQUEST) => {
        try {
            const fd = new FormData()
            console.log(fd)
            fd.append("exprienceYear", userData.exprienceYear)
            fd.append("projects", userData.projects)
            fd.append("happyClient", userData.happyClient)
            fd.append("technologies", userData.technologies)
            fd.append("description", userData.description)
            fd.append("companyName", userData.companyName)
            fd.append("role", userData.role)
            fd.append("eDesc", userData.eDesc)
            fd.append("doj", new Date(userData.doj).toISOString())
            fd.append("dor", new Date(userData.dor).toISOString())
            if (userData.resume) {
                fd.append("resume", userData.resume[0] as File)
            }
            if (selectedResume) {
                await updateExprience({ id: selectedResume.id as number, fd })
                setShow(false)
                toast.success("Exprience update success")
            } else {
                await addExprience(fd).unwrap()
                setShow(false)
                reset()
                toast.success("Exprience create success")
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete = async (id: number) => {
        try {
            await deleteExprience({ id }).unwrap()
            toast.success("exprience delete success")
        } catch (error) {
            console.log(error)
        }
    }

    const handleEdit = (exprienceData: Exprience) => {
        setShow(true)
        setSelectedResume(exprienceData)
        reset({
            exprienceYear: exprienceData.exprienceYear as string,
            projects: exprienceData.projects as string,
            happyClient: exprienceData.happyClient as string,
            technologies: exprienceData.technologies as string,
            description: exprienceData.description as string,
            doj: format(exprienceData.doj as Date, "yyyy-MM-dd") as unknown as Date,
            dor: format(exprienceData.dor as Date, "yyyy-MM-dd") as unknown as Date,
            companyName: exprienceData.companyName as string,
            role: exprienceData.role as string,
            eDesc: exprienceData.eDesc as string
        })
    }


    return <>

        <Dialog open={show}>
            <div className="flex justify-end">
                <DialogTrigger asChild>
                    <Button disabled={isLoading} onClick={() => setShow(true)}>Add Your Exprience</Button>
                </DialogTrigger>
            </div>
            <DialogContent isLoading={isLoading} closeDialog={closeDialog} className="sm:max-w-lg">
                <form onSubmit={handleSubmit(handleFormSubmit)}>
                    <DialogHeader >
                        {
                            selectedResume
                                ? <DialogTitle>Update Exprience</DialogTitle>
                                : <DialogTitle>Save Profile</DialogTitle>

                        }
                        <DialogDescription>
                            Make changes to your profile here. Click save when you&apos;re
                            done.
                        </DialogDescription>
                    </DialogHeader>
                    <FieldGroup className="grid grid-cols-2 gap-2">
                        <Field>
                            <Label htmlFor="exprienceYear">exprienceYear</Label>
                            <Input disabled={isLoading} {...register("exprienceYear")} />
                        </Field>
                        <Field>
                            <Label htmlFor="projects">projects</Label>
                            <Input disabled={isLoading} {...register("projects")} />
                        </Field>
                        <Field>
                            <Label htmlFor="happyClient">happyClient</Label>
                            <Input disabled={isLoading} {...register("happyClient")} />
                        </Field>
                        <Field>
                            <Label htmlFor="technologies">technologies</Label>
                            <Input disabled={isLoading} {...register("technologies")} />
                        </Field>
                        <Field>
                            <Label htmlFor="description">description</Label>
                            <Input disabled={isLoading} {...register("description")} />
                        </Field>
                        <Field>
                            <Label htmlFor="companyName">companyName</Label>
                            <Input disabled={isLoading} {...register("companyName")} />
                        </Field>
                        <Field>
                            <Label htmlFor="role">role</Label>
                            <Input disabled={isLoading} {...register("role")} />
                        </Field>
                        <Field>
                            <Label htmlFor="eDesc">Exprience Desc</Label>
                            <Input disabled={isLoading} {...register("eDesc")} />
                        </Field>
                        <Field>
                            <Label htmlFor="doj">Date of Join Company</Label>
                            <Input type='date' disabled={isLoading} {...register("doj")} />
                        </Field>
                        <Field>
                            <Label htmlFor="dor">Date of Resign Company</Label>
                            <Input type='date' disabled={isLoading} {...register("dor")} />
                        </Field>

                        <Field>
                            {
                                selectedResume && showimage
                                    ? <>
                                        <img src={selectedResume.resume as string} height={50} width={50} alt="" />
                                        <Button onClick={() => setShowimage(false)} variant={"secondary"}>Change File</Button>
                                    </>
                                    : <>
                                        <Label htmlFor="resume-1">Resume</Label>
                                        <Input disabled={isLoading} {...register("resume")} type="file" />
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
                            selectedResume
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
                        <TableHead>Resume</TableHead>
                        <TableHead>ExprienceYear</TableHead>
                        <TableHead>Projects</TableHead>
                        <TableHead>HappyClient</TableHead>
                        <TableHead>Technologies</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Company Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Exprience Description</TableHead>
                        <TableHead>Date of Join Company</TableHead>
                        <TableHead>Date of Resign Company</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.result?.map((item) =>
                        <TableRow key={item.id}>
                            <TableCell><img src={item.resume as string} height={300} width={300} alt="" /></TableCell>
                            <TableCell>{item.exprienceYear}</TableCell>
                            <TableCell>{item.projects}</TableCell>
                            <TableCell>{item.happyClient}</TableCell>
                            <TableCell >{item.technologies}</TableCell>
                            <TableCell >{item.description}</TableCell>
                            <TableCell >{item.companyName}</TableCell>
                            <TableCell >{item.role}</TableCell>
                            <TableCell >{item.eDesc}</TableCell>
                            <TableCell >{format(item.doj as Date, "yyyy-MM-dd")}</TableCell>
                            <TableCell >{format(item.dor as Date, "yyyy-MM-dd")}</TableCell>
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

        {/* <div className="w-full">
            {data && (
                <Table className="table-fixed w-full">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[120px]">Resume</TableHead>
                            <TableHead>ExprienceYear</TableHead>
                            <TableHead>Projects</TableHead>
                            <TableHead>HappyClient</TableHead>
                            <TableHead className="w-[150px]">Technologies</TableHead>
                            <TableHead className="w-[200px]">Description</TableHead>
                            <TableHead>Company Name</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead className="w-[200px]">Exprience Description</TableHead>
                            <TableHead>Date of Join</TableHead>
                            <TableHead>Date of Resign</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {data.result?.map((item) => (
                            <TableRow key={item.id}>

                                <TableCell>
                                    <img
                                        src={item.resume as string}
                                        className="w-20 h-20 object-cover rounded"
                                    />
                                </TableCell>

                                <TableCell className="break-words">{item.exprienceYear}</TableCell>
                                <TableCell className="break-words">{item.projects}</TableCell>
                                <TableCell className="break-words">{item.happyClient}</TableCell>

                                <TableCell className="break-words">
                                    {item.technologies}
                                </TableCell>

                                <TableCell className="break-words line-clamp-2">
                                    {item.description}
                                </TableCell>

                                <TableCell className="break-words">
                                    {item.companyName}
                                </TableCell>

                                <TableCell className="break-words">
                                    {item.role}
                                </TableCell>

                                <TableCell className="break-words line-clamp-2">
                                    {item.eDesc}
                                </TableCell>

                                <TableCell>
                                    {format(item.doj as Date, "yyyy-MM-dd")}
                                </TableCell>

                                <TableCell>
                                    {format(item.dor as Date, "yyyy-MM-dd")}
                                </TableCell>

                                <TableCell>
                                    <div className="flex gap-2">
                                        <Button size="sm" variant="outline" onClick={() => handleEdit(item)}>
                                            Edit
                                        </Button>
                                        <Button size="sm" variant="destructive" onClick={() => handleDelete(item.id as number)}>
                                            Delete
                                        </Button>
                                    </div>
                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </div> */}
    </>
}

export default MyExprience