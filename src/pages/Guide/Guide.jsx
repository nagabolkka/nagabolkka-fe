import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "../../components/common/Button/Button";
import GuideDots from "../../components/Guide/GuideDots";
import GuideArt from "../../components/Guide/GuideArt";
import GuideLineCard from "../../components/Guide/GuideLineCard";
import GuideLumi from "../../components/Guide/GuideLumi";
import { GUIDE_PAGES } from "../../constants/guide";
import backButton from "../../assets/images/backButton.svg";

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

  const buttonTitle = isLast ? (isFirst ? "모험 떠나기" : "닫기") : "다음";

  return (
    <div className="flex flex-1 flex-col bg-radial-[at_50%_28%] from-bg-glow to-bg-page to-75% px-[21px] pb-8 pt-[27px]">
      <header className="flex h-[22px] items-center justify-between">
        {isFirst ? (
          <span />
        ) : (
          <button type="button" onClick={() => navigate(-1)} className="-ml-3">
            <img src={backButton} className="h-[22px] w-[22px]" />
          </button>
        )}
        {isFirst && !isLast && (
          <button
            type="button"
            onClick={finish}
            className="font-pixel text-xs text-sub"
          >
            건너뛰기
          </button>
        )}
      </header>

      <div className="mt-5">
        <GuideDots total={GUIDE_PAGES.length} current={index} />
      </div>

      <p className="mt-4 text-center font-pixel text-xs text-gold">
        {index + 1} / {GUIDE_PAGES.length}
      </p>
      <h1 className="mt-1 text-center font-pixel text-2xl font-bold text-cream">
        {page.title}
      </h1>

      <div className="mt-5">
        <GuideArt index={index} />
      </div>

      <ul className="mt-5 flex flex-col gap-2.5">
        {page.lines.map((line) => (
          <GuideLineCard key={line} text={line} />
        ))}
      </ul>

      <GuideLumi message={page.lumi} />

      <div className="mt-auto flex flex-col items-center gap-3 pt-8">
        <Button title={buttonTitle} onClick={handleNext} />
        <button
          type="button"
          onClick={() => setIndex(index - 1)}
          className={`font-pixel text-xs text-sub ${
            index === 0 ? "invisible" : ""
          }`}
        >
          이전
        </button>
      </div>
    </div>
  );
}