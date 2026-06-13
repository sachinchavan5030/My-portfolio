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
import { Project, PROJECT_CREATE_REQUEST } from '@repo/types'
import { toast } from 'sonner'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { MoreHorizontalIcon, Pencil, Trash2 } from 'lucide-react'
import { useAddProjectMutation, useDeleteProjectMutation, useGetProjectQuery, useUpdateProjectMutation } from '@/redux/apis/project.api'
import { Card, CardContent } from '@/components/ui/card'


const MyExprience = () => {
    const { data } = useGetProjectQuery()
    console.log(data)
    const [addProject, { isLoading }] = useAddProjectMutation()
    const [updateProject] = useUpdateProjectMutation()
    const [deleteProject] = useDeleteProjectMutation()

    const [show, setShow] = useState(false)
    const [showimage, setShowimage] = useState(true)

    const [selectedProject, setSelectedProject] = useState<Project | null>(null)

    const closeDialog = () => {
        setShow(false)
        setSelectedProject(null)
        reset({
            title: "",
            description: "",
            gitLink: "",
            liveLink: "",
        })
    }


    const exprienceSchema = z.object({
        title: z.string(),
        description: z.string(),
        gitLink: z.string(),
        liveLink: z.string(),
        projectImage: z.instanceof(FileList),




    }) satisfies z.ZodType<PROJECT_CREATE_REQUEST>

    const { register, reset, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(exprienceSchema)
    })

    const handleFormSubmit = async (userData: PROJECT_CREATE_REQUEST) => {
        try {
            console.log(userData)
            const fd = new FormData()
            fd.append("title", userData.title)
            fd.append("description", userData.description)
            fd.append("gitLink", userData.gitLink)
            fd.append("liveLink", userData.liveLink)

            if (userData.projectImage) {
                fd.append("project", userData.projectImage[0] as File)
            }
            if (selectedProject) {
                await updateProject({ id: selectedProject.id as number, fd })
                setShow(false)
                toast.success("project update success")
            } else {
                await addProject(fd).unwrap()
                setShow(false)
                reset()
                toast.success("project create success")
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete = async (id: number) => {
        try {
            await deleteProject({ id }).unwrap()
            toast.success("project delete success")
        } catch (error) {
            console.log(error)
        }
    }

    const handleEdit = (projectData: Project) => {
        setShow(true)
        setSelectedProject(projectData)
        reset({
            title: projectData.title as string,
            description: projectData.description as string,
            gitLink: projectData.gitLink as string,
            liveLink: projectData.liveLink as string,
        })
    }


    return <>

        <Dialog open={show}>
            <div className="flex justify-end">
                <DialogTrigger asChild>
                    <Button disabled={isLoading} onClick={() => setShow(true)}>Add Your Project</Button>
                </DialogTrigger>
            </div>
            <DialogContent isLoading={isLoading} closeDialog={closeDialog} className="sm:max-w-lg">
                <form onSubmit={handleSubmit(handleFormSubmit)}>
                    <DialogHeader >
                        {
                            selectedProject
                                ? <DialogTitle>Update Project</DialogTitle>
                                : <DialogTitle>Save Project</DialogTitle>

                        }
                        <DialogDescription>
                            Make changes to your profile here. Click save when you&apos;re
                            done.
                        </DialogDescription>
                    </DialogHeader>
                    <FieldGroup className="grid grid-cols-2 gap-2">
                        <Field>
                            <Label htmlFor="title">Title</Label>
                            <Input disabled={isLoading} {...register("title")} />
                        </Field>
                        <Field>
                            <Label htmlFor="description">Description</Label>
                            <Input disabled={isLoading} {...register("description")} />
                        </Field>
                        <Field>
                            <Label htmlFor="gitLink">GithubLink</Label>
                            <Input disabled={isLoading} {...register("gitLink")} />
                        </Field>
                        <Field>
                            <Label htmlFor="liveLink">LiveLink</Label>
                            <Input disabled={isLoading} {...register("liveLink")} />
                        </Field>

                        <Field>
                            {
                                selectedProject && showimage
                                    ? <>
                                        <img src={selectedProject.projectImage as string} height={50} width={50} alt="" />
                                        <Button onClick={() => setShowimage(false)} variant={"secondary"}>Change File</Button>
                                    </>
                                    : <>
                                        <Label htmlFor="profile-1">Profile</Label>
                                        <Input disabled={isLoading} {...register("projectImage")} type="file" />
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
                            selectedProject
                                ? <Button type="submit">Update Your Projects</Button>
                                : <Button disabled={isLoading} type="submit">Save Changes</Button>

                        }
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog >



        {/* <div className="overflow-x-auto w-full">
            {data && <Table >
                <TableCaption >A list of your recent invoices.</TableCaption>
                <TableHeader>
                    <TableRow className="">
                        <TableHead>ProjectImage</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>GitLink</TableHead>
                        <TableHead>LiveLink</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.result?.map((item) =>
                        <TableRow key={item.id}>
                            <TableCell><img src={item.projectImage as string} height={300} width={300} alt="" /></TableCell>
                            <TableCell>{item.title}</TableCell>
                            <TableCell>{item.description}</TableCell>
                            <TableCell >{item.gitLink}</TableCell>
                            <TableCell >{item.liveLink}</TableCell>
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
        </div> */}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-4">
            {data?.result?.map((item) => (
                <Card key={item.id} className="overflow-hidden shadow-md hover:shadow-lg transition">

                    {/* Image */}
                    <img
                        src={item.projectImage as string}
                        alt=""
                        className="w-full h-40 object-cover"
                    />

                    <CardContent className="p-4 space-y-2">

                        {/* Title */}
                        <h2 className="font-semibold text-lg">{item.title}</h2>

                        {/* Description */}
                        <p className="text-sm text-muted-foreground line-clamp-2">
                            {item.description}
                        </p>

                        {/* Links */}
                        <div className="text-sm">
                            <p className="truncate">
                                <span className="font-medium">Git:</span> {item.gitLink}
                            </p>
                            <p className="truncate">
                                <span className="font-medium">Live:</span> {item.liveLink}
                            </p>
                        </div>

                        {/* Separate Buttons */}
                        <div className="flex justify-between pt-3">

                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEdit(item)}
                                className="flex items-center gap-1"
                            >
                                <Pencil className="w-4 h-4" />
                                Edit
                            </Button>

                            <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleDelete(item.id as number)}
                                className="flex items-center gap-1"
                            >
                                <Trash2 className="w-4 h-4" />
                                Delete
                            </Button>

                        </div>

                    </CardContent>
                </Card>
            ))}
        </div>
    </>
}

export default MyExprience