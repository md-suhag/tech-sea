"use client";
import QuillEditor from "@/components/modules/blog/QuillEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { myFetch } from "@/utils/myFetch";
import { toast } from "sonner";

const blogSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  category: z.string().min(1, "Category is required"),
  image: z.any().refine((files) => files?.length == 1, "Image is required."),
});

const CreateBlog = () => {
  const form = useForm<z.infer<typeof blogSchema>>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      image: undefined,
    },
  });

  const onSubmit = async (data: z.infer<typeof blogSchema>) => {
    const formData = new FormData();
    const { image, ...blogData } = data;
    formData.append("data", JSON.stringify(blogData));
    formData.append("image", image[0]);
    try {
      const res = await myFetch("/blogs", {
        method: "POST",
        body: formData,
      });

      if (res.success) {
        form.reset();
        toast.success("Blog creation successful");
      } else {
        toast.error(res.message || "Something went wrong");
      }
    } catch (error: unknown) {
      toast.error(
        error instanceof Error ? error.message : "Error fetching data"
      );
    }
  };

  return (
    <div className="">
      <h1 className="text-3xl font-bold text-center">Create New Blog</h1>
      <div className="mt-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter blog title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Web_Development">
                        Web Development
                      </SelectItem>
                      <SelectItem value="Graphic_Design">
                        Graphic Design
                      </SelectItem>
                      <SelectItem value="Programming">Programming</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      onChange={(e) => field.onChange(e.target.files)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Blog Content</FormLabel>
                  <FormControl>
                    <QuillEditor
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Submitting" : "Submit"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreateBlog;
