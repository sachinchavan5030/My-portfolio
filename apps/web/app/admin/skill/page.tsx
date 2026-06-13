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
import { CREATE_SKILL_REQUEST, Skills } from '@repo/types'
import { toast } from 'sonner'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { MoreHorizontalIcon, Pencil, Trash2 } from 'lucide-react'
import { useAddSkillMutation, useDeleteSkillMutation, useGetSkillQuery, useUpdateSkillMutation } from '@/redux/apis/skill.api'
import { Card, CardContent } from '@/components/ui/card'


const MyExprience = () => {
    const { data } = useGetSkillQuery()
    const [addSkill, { isLoading }] = useAddSkillMutation()
    const [updateSkill] = useUpdateSkillMutation()
    const [deleteSkill] = useDeleteSkillMutation()

    const [show, setShow] = useState(false)
    const [selectedProject, setSelectedProject] = useState<Skills | null>(null)

    const closeDialog = () => {
        setShow(false)
        setSelectedProject(null)
        reset({ skills: "" })
    }


    const exprienceSchema = z.object({
        skills: z.string(),
    }) satisfies z.ZodType<CREATE_SKILL_REQUEST>

    const { register, reset, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(exprienceSchema)
    })

    const handleFormSubmit = async (userData: CREATE_SKILL_REQUEST) => {
        try {
            if (selectedProject) {
                await updateSkill({ id: selectedProject.id as number, ...userData })
                setShow(false)
                toast.success("project update success")
            } else {
                await addSkill(userData).unwrap()
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
            await deleteSkill({ id }).unwrap()
            toast.success("project delete success")
        } catch (error) {
            console.log(error)
        }
    }

    const handleEdit = (projectData: Skills) => {
        setShow(true)
        setSelectedProject(projectData)
        reset({
            skills: projectData.skills as string,
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
                            selectedProject
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
                            <Label htmlFor="skill">Skill</Label>
                            <Input disabled={isLoading} {...register("skills")} />
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

                        <TableHead>Skill</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.result?.map((item) =>
                        <TableRow key={item.id}>
                            <TableCell>{item.skills}</TableCell>
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

        <div className="container mx-auto mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

                {data && data.result?.map((item) => (
                    <Card key={item.id} className="shadow-md hover:shadow-lg transition">
                        <CardContent className="flex flex-col items-center justify-center p-4">

                            {/* Skill */}
                            <h5 className="text-lg font-semibold mb-3">
                                {item.skills}
                            </h5>

                            {/* Actions */}
                            <div className="flex gap-2">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => {
                                        handleEdit(item)
                                        // setEdit(item.id)
                                    }}
                                >
                                    <Pencil className="w-4 h-4 text-gray-500" />
                                </Button>

                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleDelete(item.id as number)}
                                >
                                    <Trash2 className="w-4 h-4 text-red-500" />
                                </Button>
                            </div>

                        </CardContent>
                    </Card>
                ))}

            </div>
        </div>
    </>
}

export default MyExprience