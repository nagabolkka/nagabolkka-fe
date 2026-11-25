import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "../../components/common/Button/Button";
import GuideDots from "../../components/Guide/GuideDots";
import GuideArt from "../../components/Guide/GuideArt";
import GuideLineCard from "../../components/Guide/GuideLineCard";
import GuideLumi from "../../components/Guide/GuideLumi";
import { GUIDE_PAGES } from "../../constants/guide";

export default function Guide() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const isFirst = params.get("first") === "1"; // 시작 체크 직후
  const [index, setIndex] = useState(0);

  const page = GUIDE_PAGES[index];
  const isLast = index === GUIDE_PAGES.length - 1;
  
  const finish = () => {
    if (isFirst) navigate("/home", { replace: true });
    else navigate(-1);
  };

  const handleNext = () => (isLast ? finish() : setIndex(index + 1));

  const buttonTitle = isLast ? (isFirst ? "✈  첫 여행 떠나기" : "닫기") : "다음";

  return (
    <div className="flex flex-1 flex-col bg-sky-paper px-5 pb-8 pt-5">
      <header className="flex h-10 items-center justify-between">
        {isFirst ? (
          <span />
        ) : (
          <button
            type="button"
            onClick={() => navigate(-1)}
            aria-label="뒤로"
            className="-ml-2 w-10 h-10 flex items-center justify-center text-[28px] leading-none text-navy cursor-pointer"
          >
            ‹
          </button>
        )}
        {isFirst && !isLast && (
          <button type="button" onClick={finish} className="text-xs font-semibold text-mute cursor-pointer">
            건너뛰기
          </button>
        )}
      </header>

      <div className="mt-2">
        <GuideDots total={GUIDE_PAGES.length} current={index} />
      </div>

      <p className="label-en mt-4 text-center text-[11px] text-mute">
        GUIDE {index + 1} / {GUIDE_PAGES.length}
      </p>
      <h1 className="mt-1 text-center font-serif text-2xl font-bold text-navy">{page.title}</h1>

      <div className="mt-5">
        <GuideArt index={index} />
      </div>

      <ul className="mt-4 flex flex-col gap-2">
        {page.lines.map((line) => (
          <GuideLineCard key={line} text={line} />
        ))}
      </ul>

      <GuideLumi message={page.lumi} pose={page.pose} />

      <div className="mt-auto flex flex-col items-center gap-3 pt-8">
        <Button title={buttonTitle} onClick={handleNext} />
        <button
          type="button"
          onClick={() => setIndex(index - 1)}
          className={`text-xs font-semibold text-mute cursor-pointer ${index === 0 ? "invisible" : ""}`}
        >
          이전
        </button>
      </div>
    </div>
  );
}