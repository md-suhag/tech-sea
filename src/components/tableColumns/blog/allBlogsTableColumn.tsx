import type { ColumnDef } from "@tanstack/react-table";

import { TBlog } from "@/types/blog";

export const allBlogsTableColumn: ColumnDef<TBlog>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "category",
    header: "Category",
  },

  {
    accessorKey: "author",
    header: "Author",
    cell: ({ row }) => {
      return <div>{row.original.author.name}</div>;
    },
  },
];
