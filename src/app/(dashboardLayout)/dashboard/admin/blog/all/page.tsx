"use client";
import PaginationBtn from "@/components/modules/dashboard/PaginationBtn";
import { DashboardTable } from "@/components/shared/Table";
import { allBlogsTableColumn } from "@/components/tableColumns/blog/allBlogsTableColumn";
import { FetchResponse, myFetch } from "@/utils/myFetch";
import React, { useEffect, useState } from "react";

const AllBlogs = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [data, setData] = useState<FetchResponse>(
    null as unknown as FetchResponse
  );

  useEffect(() => {
    const fetchBlogs = async () => {
      setIsLoading(true);
      const res = await myFetch(`/blogs?page=${page}`, {
        method: "GET",
        tags: [`blogs/${page}`],
      });
      if (res) {
        setData(res);
        setPage(res.meta?.page || 1);
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, [page]);
  return (
    <section>
      <h1 className="text-3xl my-2 font-semibold">All blogs</h1>

      <DashboardTable
        data={data?.data || []}
        columns={allBlogsTableColumn}
        isLoading={isLoading}
      />
      {data && data?.meta && (
        <PaginationBtn page={page} setPage={setPage} meta={data!.meta} />
      )}
    </section>
  );
};

export default AllBlogs;
