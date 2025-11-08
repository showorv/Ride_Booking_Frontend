import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { useCreateDriverMutation } from "@/redux/features/user/user.api";
import { toast } from "sonner";


const formSchema = z.object({
  vehicleNumber: z
    .string()
    .min(3, { message: "Vehicle number must be at least 3 characters long" }),
  license: z.instanceof(FileList, { message: "License image is required" }),
});

export default function BecomeDriverForm() {
  const navigate = useNavigate();
  const [createDriver, { isLoading }] = useCreateDriverMutation();
  const [preview, setPreview] = useState<string | null>(null);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      vehicleNumber: "",
    },
  });

  const onSubmit = async (values: any) => {
    try {
      const formData = new FormData();
      formData.append("vehicleNumber", values.vehicleNumber);
      if (values.license && values.license.length > 0) {
        formData.append("files", values.license[0]);
      }

      await createDriver(formData).unwrap();
      toast.success("Driver request submitted successfully!");
      navigate("/login");
    } catch (error: any) {
      console.error(error);
      toast.error(error?.data?.message || "Failed to submit driver request");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="max-w-lg mx-auto  bg-white dark:bg-black shadow-lg border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 mt-10"
    >
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-gray-100">
        Become a Driver
      </h2>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5"
          encType="multipart/form-data"
        >
     
          <FormField
            control={form.control}
            name="vehicleNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 dark:text-gray-300">
                  Vehicle Number
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your vehicle number"
                    {...field}
                    className="dark:bg-neutral-900"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="license"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 dark:text-gray-300">
                  Upload License Image
                </FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      field.onChange(e.target.files);
                      const file = e.target.files?.[0];
                      if (file) setPreview(URL.createObjectURL(file));
                    }}
                    className="cursor-pointer dark:bg-neutral-900"
                  />
                </FormControl>
                {preview && (
                  <div className="mt-3 flex justify-center">
                    <img
                      src={preview}
                      alt="License preview"
                      className="w-40 h-28 rounded-lg object-cover border border-gray-300 dark:border-gray-700"
                    />
                  </div>
                )}
                <FormMessage />
              </FormItem>
            )}
          />

         
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full mt-3 bg-black text-white dark:bg-white dark:text-black hover:opacity-80 transition"
          >
            {isLoading ? "Submitting..." : "Submit Request"}
          </Button>
        </form>
      </Form>
    </motion.div>
  );
}
