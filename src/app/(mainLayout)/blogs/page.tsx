import BlogFilter from "@/components/modules/blog/BlogFilter";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { TBlog } from "@/types/blog";
import { myFetch } from "@/utils/myFetch";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface BlogsProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const Blogs = async ({ searchParams }: BlogsProps) => {
  const params = await searchParams;
  const categoryParam = params?.category;

  const category = Array.isArray(categoryParam)
    ? categoryParam[0]
    : categoryParam;

  const queryParams = new URLSearchParams(category ? { category } : {});

  const res = await myFetch(`/blogs?${queryParams.toString()}`, {
    method: "GET",
    tags: ["blogs"],
  });

  return (
    <div>
      <h1 className="text-3xl font-semibold text-center my-2">Blogs</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6">
        <BlogFilter />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:col-span-3 lg:col-span-5">
          {res?.data?.map((blog: TBlog) => (
            <Card key={blog._id}>
              <CardHeader>
                <div className="relative w-full h-48">
                  <Image
                    src={blog.imageUrl}
                    alt={blog.title}
                    fill
                    className="object-cover rounded-md mb-2"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <h2 className="text-2xl font-bold mb-2">{blog.title}</h2>
                <div className="text-sm text-gray-500">
                  By {blog.author.name} on{" "}
                  {new Date(blog.createdAt).toLocaleDateString()}
                </div>
              </CardContent>
              <CardFooter className="px-4 ml-auto">
                <Button asChild variant="ghost">
                  <Link href={`/blogs/${blog.slug}`}>Read More</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
