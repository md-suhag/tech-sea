import { TComment } from "@/types/comments";
import { myFetch } from "@/utils/myFetch";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const AllComentsOfBlog = async ({ id }: { id: string }) => {
  const res = await myFetch(`/blogs/${id}/comments`, {
    method: "GET",
    tags: [`comments/${id}`],
  });

  return (
    <div>
      <h4 className="text-2xl font-semibold my-4">Comments: </h4>

      {res?.data?.length === 0 && <p>No comments yet.</p>}
      <div className="space-y-4">
        {res?.data?.map((comment: TComment) => (
          <Card key={comment._id}>
            <CardHeader>
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src={"./avatar.jpg"} />
                  <AvatarFallback>
                    {comment.user?.name?.slice(0, 1)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{comment.user?.name}</CardTitle>
                  <CardDescription>
                    {new Date(comment.createdAt).toDateString()}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p>{comment.text}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AllComentsOfBlog;
