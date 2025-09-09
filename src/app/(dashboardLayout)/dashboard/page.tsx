import BlogStats from "@/components/modules/dashboard/BlogStats";
import UserStats from "@/components/modules/dashboard/UserStats";
import React from "react";

const page = () => {
  return (
    <div>
      <UserStats />
      <BlogStats />
    </div>
  );
};

export default page;
