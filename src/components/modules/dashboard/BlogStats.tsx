/* eslint-disable @typescript-eslint/no-explicit-any */
import { myFetch } from "@/utils/myFetch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart2 } from "lucide-react";
import { formatCategoryName } from "./../../../utils/formatCategory";

import { fillMonthlyStats } from "@/utils/stats";
import MonthlyStatsChart from "./MonthlyStatsChart";

export default async function BlogStats() {
  const res = await myFetch("/stats/blog", {
    method: "GET",
    tags: ["stats/blog"],
  });

  const blogData = res?.data;
  const monthlyStats = fillMonthlyStats(
    blogData?.monthlyBlogStats ?? [],
    new Date().getFullYear()
  );
  return (
    <div className="space-y-8 p-4">
      {/* Blogs by Category */}
      <Card className="rounded-2xl shadow-sm hover:shadow-md transition">
        <CardHeader className="flex items-center gap-2">
          <BarChart2 className="h-5 w-5 text-green-600" />
          <CardTitle>Blogs by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            {blogData?.totalBlogByCategory?.map((blog: any) => (
              <div
                key={blog.category}
                className="p-3 border rounded-lg flex justify-between items-center hover:shadow-sm transition"
              >
                <h3 className="font-medium">
                  {formatCategoryName(blog.category)}
                </h3>
                <p className="text-lg font-semibold">{blog.count}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <h3 className="text-2xl text-center ">Monthly Blog stats</h3>
      <MonthlyStatsChart data={monthlyStats} />
    </div>
  );
}
