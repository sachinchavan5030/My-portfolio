"use client"
import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CREATE_SKILL_REQUEST, Skills } from "@repo/types"
import { toast } from "sonner"
import { MoreHorizontalIcon, Pencil, Trash2 } from "lucide-react"
import { useAddSkillMutation, useDeleteSkillMutation, useGetSkillQuery, useUpdateSkillMutation } from "@/redux/apis/skill.api"
import { Card, CardContent } from "@/components/ui/card"
import { getIcon } from "@/lib/icon-map"


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
        reset({ skills: "", skillIcon: "" })
    }


    const exprienceSchema = z.object({
        skills: z.string(),
        skillIcon: z.string(),
    }) satisfies z.ZodType<CREATE_SKILL_REQUEST>

    const { register, reset, handleSubmit, watch, formState: { errors } } = useForm({
        resolver: zodResolver(exprienceSchema)
    })

    const watchedIcon = watch("skillIcon")

    const handleFormSubmit = async (userData: CREATE_SKILL_REQUEST) => {
        try {
            if (selectedProject) {
                await updateSkill({ id: selectedProject.id as number, body: userData }).unwrap()
                setShow(false)
                toast.success("skill update success")
            } else {
                await addSkill(userData).unwrap()
                setShow(false)
                reset()
                toast.success("skill create success")
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete = async (id: number) => {
        try {
            await deleteSkill({ id }).unwrap()
            toast.success("skill delete success")
        } catch (error) {
            console.log(error)
        }
    }

    const handleEdit = (projectData: Skills) => {
        setShow(true)
        setSelectedProject(projectData)
        reset({
            skills: projectData.skills as string,
            skillIcon: projectData.skillIcon ?? "",
        })
    }


    return <>
        <Dialog open={show}>
            <div className="flex justify-end">
                <DialogTrigger asChild>
                    <Button disabled={isLoading} onClick={() => setShow(true)}>Add Skill</Button>
                </DialogTrigger>
            </div>
            <DialogContent isLoading={isLoading} closeDialog={closeDialog} className="sm:max-w-lg">
                <form onSubmit={handleSubmit(handleFormSubmit)}>
                    <DialogHeader >
                        {
                            selectedProject
                                ? <DialogTitle>Update Skill</DialogTitle>
                                : <DialogTitle>Save Skill</DialogTitle>

                        }
                        <DialogDescription>
                            Make changes to your skill here. Click save when you're
                            done.
                        </DialogDescription>
                    </DialogHeader>
                    <FieldGroup className="grid grid-cols-2 gap-2">

                        <Field>
                            <Label htmlFor="skill">Skill</Label>
                            <Input disabled={isLoading} {...register("skills")} />
                        </Field>

                        <Field>
                            <Label htmlFor="skillIcon">Icon Name</Label>
                            <Input disabled={isLoading} {...register("skillIcon")} placeholder="e.g. FaReact, SiTypescript" />
                            {(() => {
                                const IconPreview = getIcon(watchedIcon)
                                return watchedIcon ? (
                                    <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                                        <span>Preview:</span>
                                        <span className="text-xl text-[#FF014F]">
                                            <IconPreview />
                                        </span>
                                    </div>
                                ) : null
                            })()}
                        </Field>

                    </FieldGroup>
                    <DialogFooter className="mt-3">
                        <DialogClose asChild>
                            <Button disabled={isLoading} onClick={closeDialog} variant="outline">Cancel</Button>
                        </DialogClose>
                        {
                            selectedProject
                                ? <Button type="submit">Update Skill</Button>
                                : <Button disabled={isLoading} type="submit">Save Changes</Button>

                        }
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog >



        <div className="container mx-auto mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

                {data && data.result?.map((item) => {
                    const IconComponent = getIcon(item.skillIcon)
                    return (
                        <Card key={item.id} className="shadow-md hover:shadow-lg transition">
                            <CardContent className="flex flex-col items-center justify-center p-4">

                                <div className="text-3xl text-[#FF014F] mb-3">
                                    <IconComponent />
                                </div>

                                <h5 className="text-lg font-semibold mb-3">
                                    {item.skills}
                                </h5>

                                <div className="flex gap-2">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => {
                                            handleEdit(item)
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
                    )
                })}

            </div>
        </div>
    </>
}

export default MyExprience