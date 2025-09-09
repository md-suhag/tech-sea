"use client";
import { useAuth } from "@/context/AuthContext";
import { revalidateTags } from "@/helpers/revalidateHelper";
import { TBlog } from "@/types/blog";
import { ReactionType } from "@/types/Reaction";
import { myFetch } from "@/utils/myFetch";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import React from "react";
import { toast } from "sonner";

const Reaction = ({ data }: { data: TBlog }) => {
  const { user } = useAuth();
  const handleReaction = async (type: ReactionType) => {
    try {
      if (!user) {
        return toast.error("You must be logged in to react");
      }
      const res = await myFetch(`/blogs/${data._id}/react`, {
        method: "POST",
        body: { type },
      });
      if (res.success) {
        await revalidateTags([`blogs/${data.slug}`]);
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
      <div>
        <ThumbsUp
          onClick={() => handleReaction(ReactionType.LIKE)}
          className="hover:scale-105 duration-300 cursor-pointer"
        />
        <span className="ml-1">{data.likes}</span>
      </div>
      <div>
        <ThumbsDown
          onClick={() => handleReaction(ReactionType.DISLIKE)}
          className="hover:scale-105 duration-300 cursor-pointer"
        />
        <span className="ml-1">{data.dislikes}</span>
      </div>
    </div>
  );
};

export default Reaction;
