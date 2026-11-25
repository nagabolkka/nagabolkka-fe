import { useEffect, useRef, useState } from "react";
import {
  POLICIES,
  POLICY_TABS,
  POLICY_UPDATED_AT,
} from "../../constants/policies";

export default function PolicySheet({ initialKey = "policy", onClose }) {
  const [key, setKey] = useState(initialKey);
  const bodyRef = useRef(null);
  const doc = POLICIES[key];

  // 탭을 바꾸면 본문 맨 위부터
  useEffect(() => {
    bodyRef.current?.scrollTo({ top: 0 });
  }, [key]);

  // 시트가 열려 있는 동안 뒤 화면 스크롤 막기
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end bg-black/50"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={doc.title}
        className="flex max-h-[85dvh] w-full flex-col rounded-t-2xl bg-[#F4EAD5] pt-3"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto h-1 w-10 rounded-full bg-[#C9B48E]" />

        <div className="mt-3 flex shrink-0 items-center justify-between px-5">
          <h2 className="font-pixel text-lg text-[#15121F]">{doc.title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="닫기"
            className="px-1 text-base text-[#15121F]/60"
          >
            ✕
          </button>
        </div>

        <div className="mt-3 flex shrink-0 gap-1.5 overflow-x-auto px-5 pb-1">
          {POLICY_TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setKey(tab.key)}
              className={`shrink-0 rounded-full border-[1.5px] border-[#15121F] px-3 py-1 text-[11px] ${
                tab.key === key
                  ? "bg-[#E8C06A] text-[#15121F]"
                  : "text-[#15121F]/60"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div
          ref={bodyRef}
          className="mt-2 min-h-0 flex-1 overflow-y-auto border-t-2 border-dashed border-[#C9B48E] px-5 pb-8 pt-3"
        >
          {doc.intro && (
            <p className="break-keep text-xs leading-relaxed text-[#15121F]/80">
              {doc.intro}
            </p>
          )}

          {doc.sections.map(({ heading, lines }) => (
            <section key={heading} className="mt-4">
              <h3 className="text-[13px] font-semibold text-[#15121F]">
                {heading}
              </h3>
              <ul className="mt-1.5 flex flex-col gap-1">
                {lines.map((line) => (
                  <li
                    key={line}
                    className="break-keep text-xs leading-relaxed text-[#15121F]/80"
                  >
                    {line}
                  </li>
                ))}
              </ul>
            </section>
          ))}

          <p className="mt-6 text-[11px] text-[#15121F]/50">
            시행일 {POLICY_UPDATED_AT}
          </p>
        </div>
      </div>
    </div>
  );
}
