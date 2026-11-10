import LetterStats from "./LetterStats";
import RecommendedPlaces from "./RecommendedPlaces";

const formatWeekStart = (date) => {
  const [, m, d] = date.split("-").map(Number);
  return `${m}월 ${d}일부터의 한 주`;
};

export default function LetterPaper({ letter, nickname, onSelectPlace }) {
  const { weekStart, body, stats, recommendedPlaces } = letter;

  return (
    <article className="bg-[#F4EAD5] p-2.5 shadow-[0_4px_16px_rgba(0,0,0,0.35)]">
      <div className="border-2 border-[#C9A24A] px-3.5 py-4">
        <p className="font-pixel font-normal text-xs text-[#6B5E4A]">
          {formatWeekStart(weekStart)}
        </p>
        <h2 className="mt-3 font-pixel font-normal text-3xl text-[#2B2340]">
          {nickname}에게,
        </h2>

        <p className="mt-4 whitespace-pre-line text-sm font-semibold leading-6 text-[#2B2340] break-keep">
          {body}
        </p>

        <div className="mt-5">
          <LetterStats stats={stats} />
        </div>

        <div className="mt-5">
          <RecommendedPlaces
            places={recommendedPlaces}
            onSelect={onSelectPlace}
          />
        </div>

        <p className="mt-3 text-sm font-normal font-pixel text-black text-right">
          — 루미가
        </p>
      </div>
    </article>
  );
}
