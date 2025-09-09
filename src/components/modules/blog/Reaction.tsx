"use client";
import { revalidateTags } from "@/helpers/revalidateHelper";
import { ReactionType } from "@/types/Reaction";
import { myFetch } from "@/utils/myFetch";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import React from "react";
import { toast } from "sonner";

const Reaction = ({ id, slug }: { id: string; slug: string }) => {
  const handleReaction = async (type: ReactionType) => {
    try {
      const res = await myFetch(`/blogs/${id}/react`, {
        method: "POST",
        body: { type },
      });
      if (res.success) {
        await revalidateTags([`blogs/${slug}`]);
        toast.success(`${type.toLowerCase()}d!`);
      } else {
        toast.error(res.message || "Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex gap-2 my-4">
      <ThumbsUp
        onClick={() => handleReaction(ReactionType.LIKE)}
        className="hover:scale-105 duration-300 cursor-pointer"
      />
      <ThumbsDown
        onClick={() => handleReaction(ReactionType.DISLIKE)}
        className="hover:scale-105 duration-300 cursor-pointer"
      />
    </div>
  );
};

export default Reaction;
