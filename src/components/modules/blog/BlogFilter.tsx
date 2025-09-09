"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUpdateSearchParams } from "@/hooks/useUpdateSearchParams";
import React from "react";

const BlogFilter = () => {
  const [category, setCategory] = React.useState<string | null>(null);
  const updateSearchParams = useUpdateSearchParams();

  return (
    <div className="flex flex-col gap-2 p-4 pt-0">
      <p className="font-semibold">Filter :</p>
      <Select
        onValueChange={(value) => {
          setCategory(value);
          updateSearchParams("category", value === "all" ? null : value);
        }}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Category</SelectLabel>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="web_development">Web Development</SelectItem>
            <SelectItem value="graphic_design">Graphic Design</SelectItem>
            <SelectItem value="programming">Programming</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default BlogFilter;
