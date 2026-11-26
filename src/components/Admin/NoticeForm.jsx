import { useState } from "react";

const TITLE_MAX = 60;
const CONTENT_MAX = 500;

// 새 기내 방송 : 제목 · 내용 · 홈 팝업 미리보기 → 등록
export default function NoticeForm({ submitting = false, onSubmit }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const canSubmit = title.trim() && content.trim() && !submitting;

  return (
    <section className="rounded-2xl bg-navy p-4">
      <Field label="제목" count={`${title.length} / ${TITLE_MAX}`}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={TITLE_MAX}
          placeholder="예) 12월 1일 새벽 서버 점검"
          className="block h-12 w-full rounded-[10px] bg-paper px-3 text-sm text-navy outline-none placeholder:text-mute/70 focus:ring-2 focus:ring-brass"
        />
      </Field>

      <Field label="내용" count={`${content.length} / ${CONTENT_MAX}`} className="mt-3">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          maxLength={CONTENT_MAX}
          placeholder="탑승객에게 전할 내용을 적어 주세요."
          className="block h-[120px] w-full resize-none rounded-[10px] bg-paper px-3 pt-3 text-sm leading-6 text-navy outline-none placeholder:text-mute/70 focus:ring-2 focus:ring-brass"
        />
      </Field>

      <p className="mt-3 text-xs font-bold text-white">홈 팝업 미리보기</p>
      <div className="mt-2 rounded-xl bg-ticket px-3.5 py-3">
        <p className="label-en text-[9px] text-brass">NOTICE · 마음 군도 항공</p>
        <p className="mt-1 font-serif text-sm font-bold text-navy break-keep">{title.trim() || "제목이 여기에 보여요"}</p>
        <p className="mt-0.5 whitespace-pre-line text-xs leading-5 text-mute break-keep line-clamp-3">
          {content.trim() || "내용이 여기에 보여요"}
        </p>
      </div>

      <button
        type="button"
        disabled={!canSubmit}
        onClick={() => onSubmit({ title: title.trim(), content: content.trim() })}
        className="mt-4 h-[50px] w-full rounded-xl bg-brass text-[15px] font-bold text-navy cursor-pointer disabled:cursor-not-allowed disabled:bg-[#2E3F7E] disabled:text-mute-on-navy"
      >
        {submitting ? "방송 등록 중…" : "방송 등록하기"}
      </button>
    </section>
  );
}

function Field({ label, count, className = "", children }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 flex justify-between">
        <span className="text-xs font-bold text-white">{label}</span>
        <span className="text-[11px] text-mute-on-navy">{count}</span>
      </span>
      {children}
    </label>
  );
}