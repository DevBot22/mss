import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,} from "@/components/ui/form"
import {z} from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'
import { loginFormSchema } from "@/lib/form.schemas"
import Link from "next/link"


export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

    const form = useForm<z.infer<typeof loginFormSchema>>({
            resolver: zodResolver(loginFormSchema),
            defaultValues: {
                email: "",
                password: "",
            }
    })

    const onSubmit = (values: z.infer<typeof loginFormSchema>) => {

        console.log(values)
    }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                    <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input type='text' placeholder="Enter your email" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem> )} />
              </div>
              <div className="grid gap-3">
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                            <Input type='password' placeholder="Enter your password" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem> )} />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
            <Link href={'/signup'}  className="underline underline-offset-4">Sign up</Link>
            </div>
          </form>
            </Form>
        </CardContent>
      </Card>
    </div>
  )
}
