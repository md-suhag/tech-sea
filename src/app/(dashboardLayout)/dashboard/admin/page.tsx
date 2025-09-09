import BlogStats from "@/components/modules/dashboard/BlogStats";
import UserStats from "@/components/modules/dashboard/UserStats";
import React from "react";

const AdminDashboard = () => {
  return (
    <div>
      <UserStats />
      <BlogStats />
    </div>
  );
};

export default AdminDashboard;
