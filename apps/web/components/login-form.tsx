"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { z } from 'zod'
import { LOGIN_REQUEST } from "@repo/types"
import { zodResolver } from '@hookform/resolvers/zod';
import { useSigninMutation } from "@/redux/apis/admin.api"
import { toast } from "sonner"
import { useForm } from "react-hook-form"

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {

  const [signIn, { isLoading }] = useSigninMutation()

  const { push } = useRouter()

  const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(3)
  }) satisfies z.ZodType<LOGIN_REQUEST>

  const { register, reset, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema)
  })
  const handleFormSubmit = async (userData: LOGIN_REQUEST) => {
    try {
      const data = await signIn(userData).unwrap()
      push("/admin")
      reset()
      toast.success("login success")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6 w-full ", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-4xl">Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  {...register("email")}
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input {...register("password")} id="password" type="password" required />
              </Field>
              <Field>
                <Button disabled={isLoading} type="submit">Login</Button>
                <Button variant="outline" type="button">
                  Login with Google
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <a href="#">Sign up</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
