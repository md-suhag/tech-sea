"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { myFetch } from "@/utils/myFetch";
import { toast } from "sonner";
import { revalidateTags } from "@/helpers/revalidateHelper";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

const CommentBox = ({ id, slug }: { id: string; slug: string }) => {
  const [comment, setComment] = useState("");
  const { user } = useAuth();

  const handleSubmit = async () => {
    if (!comment.trim()) return;
    const payload = {
      text: comment,
      blog: id,
    };
    const res = await myFetch(`/comments`, {
      method: "POST",
      body: payload,
    });
    if (res.success) {
      toast.success("Comment Added");
      await revalidateTags([`comments/${id}`, `blogs/${slug}`]);
      setComment("");
    }
  };

  return (
    <Card className="w-full max-w-md gap-3 py-3 ">
      <CardHeader className="flex flex-row items-center gap-3">
        <Avatar>
          <AvatarImage src="/avatar.png" alt="User" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <CardTitle className="text-lg font-semibold">Write a comment</CardTitle>
      </CardHeader>

      <CardContent>
        <Textarea
          placeholder="Share your thoughts..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="min-h-[100px] resize-none"
        />
      </CardContent>

      <CardFooter className="flex justify-end gap-2">
        {user && (
          <>
            <Button variant="outline" onClick={() => setComment("")}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Post</Button>
          </>
        )}
        {!user && (
          <Button className="ml-auto">
            <Link href="/login">Login to comment</Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default CommentBox;
