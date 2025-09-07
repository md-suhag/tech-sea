"use client";
import "react-quill-new/dist/quill.snow.css";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

interface QuillEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const QuillEditor = ({ value, onChange }: QuillEditorProps) => {
  return (
    <ReactQuill
      className="mb-8"
      theme="snow"
      value={value}
      onChange={onChange}
    />
  );
};

export default QuillEditor;
