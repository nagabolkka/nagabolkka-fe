import LetterStats from "./LetterStats";
import RecommendedPlaces from "./RecommendedPlaces";
import IslandStamp from "../common/Island/IslandStamp";
import Lumi from "../common/Lumi/Lumi";

const formatWeekStart = (date) => {
  const [, m, d] = date.split("-").map(Number);
  return `${m}월 ${d}일부터의 한 주`;
};

// 루미의 엽서 (위 그림 · 우표 · 본문 · 서명)
export default function LetterPaper({ letter, nickname, onSelectPlace, stageNo = 1 }) {
  const { weekStart, body, stats, recommendedPlaces } = letter;

  return (
    <article className="relative -rotate-[0.8deg] rounded-md bg-ticket shadow-[0_10px_22px_rgba(138,127,100,0.35)]">
      {/* 그림 */}
      <div className="relative h-[120px] overflow-hidden rounded-t-md bg-[#BFE4F4]">
        <div aria-hidden className="absolute right-10 top-6 h-10 w-10 rounded-full bg-lamp" />
        <svg aria-hidden className="absolute inset-x-0 bottom-0 w-full" height="56" viewBox="0 0 345 56" preserveAspectRatio="none">
          <path d="M0 30 Q90 0 172 20 Q260 40 345 10 V56 H0 Z" fill="#F2B94A" />
        </svg>
      </div>

      <div className="relative px-5 pb-5 pt-4">
        <IslandStamp stageNo={stageNo} size={58} edge="#FFFDF6" className="absolute right-4 -top-8 rotate-3" />

        <p className="label-en text-[11px] text-mute">{formatWeekStart(weekStart)}</p>
        <h2 className="mt-2 font-serif text-2xl font-bold text-navy">{nickname}에게</h2>

        <p className="mt-3 whitespace-pre-line text-[15px] font-medium leading-7 text-navy break-keep">{body}</p>

        <div className="mt-5">
          <LetterStats stats={stats} />
        </div>

        <div className="mt-5">
          <RecommendedPlaces places={recommendedPlaces} onSelect={onSelectPlace} />
        </div>

        <div className="mt-3 flex items-end justify-end gap-1">
          <p className="font-serif text-base font-bold text-navy">— 기장 루미</p>
          <Lumi pose="letter" size={58} decorative />
        </div>
      </div>
    </article>
  );
}