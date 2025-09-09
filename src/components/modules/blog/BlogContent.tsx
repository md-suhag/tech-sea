"use client";
import DOMPurify from "dompurify";
import { useMemo } from "react";

export function BlogContent({ content }: { content: string }) {
  const sanitized = useMemo(() => {
    if (typeof window !== "undefined") {
      return DOMPurify.sanitize(content);
    }
    return content;
  }, [content]);
  return (
    <div className="my-4">
      <article
        dangerouslySetInnerHTML={{ __html: sanitized }}
        className="prose lg:prose-lg "
      />
    </div>
  );
}
