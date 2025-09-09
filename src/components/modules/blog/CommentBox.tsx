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

const CommentBox = ({ id }: { id: string }) => {
  const [comment, setComment] = useState("");

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

      setComment("");
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-md rounded-2xl">
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
        <Button variant="outline" onClick={() => setComment("")}>
          Cancel
        </Button>
        <Button onClick={handleSubmit}>Post</Button>
      </CardFooter>
    </Card>
  );
};

export default CommentBox;
