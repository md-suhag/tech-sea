import AllComentsOfBlog from "@/components/modules/blog/AllComentsOfBlog";
import { BlogContent } from "@/components/modules/blog/BlogContent";
import CommentBox from "@/components/modules/blog/CommentBox";
import Reaction from "@/components/modules/blog/Reaction";
import { myFetch } from "@/utils/myFetch";
import Image from "next/image";

export default async function BlogDetails({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { slug } = await params;
  const res = await myFetch(`/blogs/${slug}`, {
    method: "GET",
    tags: [`blogs/${slug}`],
  });
  if (!res) {
    return (
      <div className="text-center text-2xl font-bold mt-10">Blog not found</div>
    );
  }
  return (
    <div className="max-w-5xl mx-auto p-2">
      <h1 className="text-3xl font-bold mt-4">{res.data?.title}</h1>
      <p className="text-sm text-muted-foreground mb-4">
        By {res.data?.author?.name} on{" "}
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
      <Reaction data={res?.data} />

      <CommentBox id={res.data?._id} slug={res.data?.slug} />
      {/* Comments Section */}
      <AllComentsOfBlog id={res.data?._id} />
    </div>
  );
}
