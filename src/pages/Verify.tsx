import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl,  FormDescription,  FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import {z} from "zod"
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router"
import { zodResolver } from "@hookform/resolvers/zod";
import { useSendOtpMutation, useVerifyOtpMutation } from "@/redux/features/auth/auth.api";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const FormSchema = z.object({
    pin: z.string().min(6, {
      message: "Your otp must be 6 characters.",
    }),
  })

export const Verify = () => {

    const location = useLocation()

    const [email] = useState(location.state) // user jate nije nije /verify diye na jete pare email chara
    const [confirm, setConfirm] = useState(false)
    const [sendOtp] = useSendOtpMutation()
    const [verifyOtp] = useVerifyOtpMutation()
    const [timer, setTimer] = useState(5)
    console.log(location.state);
    
    const navigate = useNavigate()


    //! comment for developmnent
    // useEffect(()=>{
    //     if(!email){
    //         navigate("/")
    //     }
    
    // },[email])
   
    console.log(location.state);

    useEffect(()=>{
        const timerId = setInterval(()=>{
            if(email && confirm){
                setTimer(prev => (prev > 0 ? prev -1 : 0))
            }
        },1000)

        return ()=> clearInterval(timerId)

       
        

    },[email,confirm])

    console.log("tick");

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            pin:""
        }
    })

    const onSubmit = async (value: z.infer<typeof FormSchema>)=>{
        console.log(value);

        const verifyInfo = {
            email,
            otp: value.pin
        }

        try {
            
            const toastId = toast.loading("verifying otp")

            const res = await verifyOtp(verifyInfo).unwrap()

            if(res.success){
                toast.success("Otp verified successfully", {id: toastId})
                navigate("/login")
            }
        } catch (error) {
            console.log(error);
            
        }
        
    }

    const handleSubmit =async ()=>{



        try {
           
            const toasId = toast.loading("Sending Otp")
           const res = await sendOtp({email: email}).unwrap()

           if(res.success){
            toast.success("Otp send", {id: toasId})
            setConfirm(true)
           }

          
         
        } catch (error) {
          
           
            console.log(error);
            
        }
       
    }

    const handleResendOtp = async ()=>{
    

      try {
           
        const toasId = toast.loading("Resending Otp")
       const res = await sendOtp({email: email}).unwrap()

       if(res.success){
        toast.success("Otp resend", {id: toasId})
        setTimer(5)
       }
    } catch (error) {
        console.log(error);
        
    }
   
    }
    
  return (
   <div className="flex justify-center items-center h-screen">

    { confirm ? (
   <Card className="w-full max-w-sm">
   <CardHeader>
     <CardTitle>Verify your email address</CardTitle>
     <CardDescription>
      Please enter the 6-digit code we sent to {email}
     </CardDescription>
   
   </CardHeader>
   <CardContent>
   <Form {...form}>
   <form 
   id="otp"
   onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
     <FormField
       control={form.control}
       name="pin"
       render={({ field }) => (
         <FormItem >
           <FormLabel>Enter OTP</FormLabel>
           <FormControl>
             <InputOTP maxLength={6} {...field}>
               <InputOTPGroup>
                 <InputOTPSlot index={0} />
               </InputOTPGroup>
               <InputOTPGroup>
                 <InputOTPSlot index={1} />
               </InputOTPGroup>
               <InputOTPGroup>
                 <InputOTPSlot index={2} />
               </InputOTPGroup>
               <InputOTPGroup>
                 <InputOTPSlot index={3} />
               </InputOTPGroup>
               <InputOTPGroup>
                 <InputOTPSlot index={4} />
               </InputOTPGroup>
               <InputOTPGroup>
                 <InputOTPSlot index={5} />
               </InputOTPGroup>
             </InputOTP>
           </FormControl>
        <FormDescription>
            <Button variant={"link"} 
            disabled = { timer !== 0} 
            type="button" 
            onClick={handleResendOtp} 
            className={cn("p-2", { "cursor-pointer": timer===0, "text-gray-700": timer !==0})}
            >
              Resend Otp:
            </Button>
            {timer}
        </FormDescription>
           <FormMessage />
         </FormItem>
       )}
     />
    
   </form>
 </Form>
   </CardContent>
   <CardFooter className="flex-col gap-2">
     <Button form="otp" type="submit" className="w-full">
       Submit
     </Button>
    
   </CardFooter>
 </Card>
    ): (
        <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Verify your email address</CardTitle>
          <CardDescription>
            We will send you and otp to{email}
          </CardDescription>
        
        </CardHeader>
  
        <CardFooter className="flex-col gap-2">
          <Button onClick={handleSubmit} type="submit" className="w-full">
            Confirm
          </Button>
         
        </CardFooter>
      </Card>
    )}
 
  
   </div>

  )}