import { BlogContent } from "@/components/modules/blog/BlogContent";
import { myFetch } from "@/utils/myFetch";
import Image from "next/image";

export default async function BlogDetails({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const res = await myFetch(`/blogs/${slug}`, { method: "GET" });

  return (
    <div className="max-w-5xl mx-auto p-2">
      <h1 className="text-3xl font-bold mt-4">{res.data?.title}</h1>
      <p className="text-sm text-muted-foreground mb-4">
        By {res.data?.author.name} on{" "}
        {new Date(res.data?.createdAt).toLocaleString()}
      </p>
      <Image
        width={500}
        height={300}
        alt={res.data?.title}
        src={res.data?.imageUrl}
        className="w-full  "
      />
      <BlogContent content={res.data?.description ?? ""} />
    </div>
  );
}
