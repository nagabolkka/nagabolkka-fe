import lumi from "../../assets/icons/lumi.png";
import { PIECE_COLORS } from "../../constants/intro";
import Button from "../../components/common/Button/Button";
import { INTRO_STEPS } from "../../constants/intro";
import { goKakaoLogin } from "../../utils/kakao";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import DialogBox from "../../components/Intro/DialogBox";

export default function Intro() {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  const current = INTRO_STEPS[step];
  const isLast = step === INTRO_STEPS.length - 1;

  const handleNext = () => {
    if (isLast) navigate("/terms");
    else setStep((prev) => prev + 1);
  };

  return (
    <div className="flex-1 flex flex-col items-center bg-radial-[at_50%_28%] from-bg-glow to-bg-page to-75%">
      <p className="text-[#F2C14E] text-base font-normal font-pixel tracking-[3.20px] mt-[109px]">
        잃어버린 세상의 조각들
      </p>
      <p className="font-pixel text-5xl text-[#F4EAD5] font-bold [text-shadow:_0px_4px_0px_rgb(21_18_31_/_0.25)] mt-4">
        나가볼까?
      </p>

      {/* 루미 이미지 */}
      <div className="relative mt-[29px] size-[190px] animate-float">
        <img
          src={lumi}
          className="pointer-events-none absolute left-1/2 top-1/2 max-w-none w-[300px] -translate-x-1/2 -translate-y-1/2"
        />
      </div>

      {/* 조각들 */}
      <div className="flex gap-[18px] mt-[15px]">
        {PIECE_COLORS.map((color) => (
          <div
            key={color}
            className="size-[20px] rotate-45 outline-2 outline-[#15121F]"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
      <DialogBox speaker={current.speaker} text={current.text} />
      <Button title={current.buttonText} onClick={handleNext} />
      <p className="mt-[14px] font-pixel text-xs font-normal text-[#B9B0D0]">
        이미 모험가라면?{" "}
        <span
          onClick={() => goKakaoLogin()}
          className="underline text-[#FEE500] cursor-pointer"
        >
          카카오로 이어하기
        </span>
      </p>
    </div>
  );
}
