import { Button } from "@/components/ui/button";
import type { IMeta } from "@/types";
import React from "react";

interface IProps {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  meta: IMeta;
}
const PaginationBtn = ({ page, setPage, meta }: IProps) => {
  return (
    <div className="flex justify-between mt-2">
      <Button
        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        disabled={page === 1}
      >
        Previous
      </Button>
      <span>
        Page {page} of {meta?.totalPage ?? 1}
      </span>
      <Button
        onClick={() =>
          setPage((prev) => Math.min(prev + 1, meta?.totalPage ?? 1))
        }
        disabled={page >= (meta?.totalPage ?? 1)}
      >
        Next
      </Button>
    </div>
  );
};

export default PaginationBtn;
