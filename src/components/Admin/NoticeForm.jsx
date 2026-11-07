import { useState } from "react";
import Button from "../common/Button/Button";

export default function NoticeForm({ onSubmit }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const canSubmit = title.trim() && content.trim();

  const handleSubmit = () => {
    onSubmit({ title: title.trim(), content: content.trim() });
    setTitle("");
    setContent("");
  };

  return (
    <section className="w-[358px] h-[294px] rounded-lg bg-[#2B2340] pl-[17px] pr-5 py-[23px]">
      <h2 className="font-pixel text-sm font-normal text-[#F4EAD5]">새 공지</h2>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        maxLength={60}
        placeholder="제목"
        className="mt-[13px] w-[321px] h-[45px] rounded-md bg-[#F4EAD5] border-2 border-[#2B2340] pl-[11px] pt-4 pb-[15px] text-sm text-[#15121F] outline-none placeholder:text-[#15121F]/40"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        maxLength={500}
        placeholder="내용"
        className="mt-[9px] h-[96px] w-[321px] resize-none rounded-md border-2 border-[#2B2340] bg-[#F4EAD5] pl-[11px] pt-4 text-sm text-[#15121F] outline-none placeholder:text-[#15121F]/40"
      />

      <button
        type="button"
        onClick={handleSubmit}
        disabled={!canSubmit}
        className="mt-4 w-[321px] h-[50px] rounded-[10px] border-2 border-[#15121F] bg-[#F2C14E] py-3 font-pixel font-bold text-base text-[#2B2340] disabled:opacity-40"
      >
        공지 등록
      </button>
    </section>
  );
}
