
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useSubmitContactMutation } from "@/redux/features/contact/contact.api";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  message: z.string().min(5, "Message is too short"),
});

export default function ContactPage() {
  const [submitContact, { isLoading }] = useSubmitContactMutation();
  const form = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (values: any) => {
    try {
      await submitContact(values).unwrap();
      toast.success("Message submitted successfully!");
      form.reset();
    } catch (err: any) {
      toast.error(err?.data?.message || " Failed to submit message");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-3xl mx-auto p-6 sm:p-8 mt-20 bg-white dark:bg-black rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800"
    >
      <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-6">
        Contact Us
      </h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="you@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea placeholder="Your message..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-black dark:bg-white dark:text-black text-white hover:opacity-80 transition"
          >
            {isLoading ? "Submitting..." : "Send Message"}
          </Button>
        </form>
      </Form>
    </motion.div>
  );
}
