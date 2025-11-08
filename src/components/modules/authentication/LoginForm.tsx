import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { Link, useNavigate } from "react-router"
import { useLoginMutation } from "@/redux/features/auth/auth.api"
import { useForm, type SubmitHandler, type FieldValues } from "react-hook-form"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import PasswordShow from "@/components/ui/PasswordShow"
import { toast } from "sonner"






export function LoginForm({
  className,

}: React.ComponentProps<"form">) {

  const [login] = useLoginMutation()

  const form = useForm()

  const navigate = useNavigate()

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await login(data).unwrap();
  
      if (res.success) {
        const user = res.data.user;
        const driver = res.data.driver;
  
        if (user.isBlocked) {
          toast.error("Your account is blocked");
          navigate("/account-status");
          return;
        }
  
        if (user.role === "DRIVER" && driver && driver.isSuspend === true) {
          toast.error("Your driver account is suspended");
          navigate("/account-status");
          return;
        }
  
        toast.success("Login successful!");
        navigate("/"); 
      }
    } catch (err: any) {
      const message = err.data?.message;
      if (message === "password is incorrect") {
        toast.error("Invalid email or password");
      }
      if (message === "you are not verified") {
        toast.error("You are not verified");
        navigate("/verify", { state: data.email });
      }
    }
  };
  
  return (
    <div className={cn("flex flex-col gap-6", className)} >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="hello@gmail.com" {...field} />
                      </FormControl>
                      <FormDescription className="sr-only">
                        This is your public display name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                  <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                       <PasswordShow {...field}/>
                      </FormControl>
                      <FormDescription className="sr-only">
                        This is your public display name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                    <Button type="submit">Login</Button>
          </form>
        </Form>
    
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}

        <Link to="/register"  className="underline underline-offset-4">
        Register Now
        </Link>
   
      
     
      </div>
    </div>
  )
}
