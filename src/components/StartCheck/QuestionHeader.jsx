import Lumi from "../common/Lumi/Lumi";

// 심사관 루미 + 질문
export default function QuestionHeader({ step, question }) {
  return (
    <div className="mx-4 mb-5 flex items-center gap-3 rounded-2xl border border-line bg-ticket px-3 py-3">
      <Lumi pose="salute" bust size={52} decorative className="shrink-0" />
      <div className="min-w-0">
        <p className="text-[11px] text-mute">심사관 루미 · 질문 {step}</p>
        <p className="mt-0.5 font-serif text-[19px] font-bold leading-7 text-navy break-keep">
          {question}
        </p>
      </div>
    </div>
  );
}