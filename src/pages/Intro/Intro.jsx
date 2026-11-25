import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Button from "../../components/common/Button/Button";
import Lumi from "../../components/common/Lumi/Lumi";
import DialogBox from "../../components/Intro/DialogBox";
import PassportCover from "../../components/Intro/PassportCover";
import { INTRO_STEPS } from "../../constants/intro";
import { REFRESH_KEY } from "../../api/api";
import { goKakaoLogin } from "../../utils/kakao";

// 인트로 : 여권 표지 → 펼치기 → 기장 루미 안내 3장 → 약관
export default function Intro() {
  const navigate = useNavigate();
  const [opened, setOpened] = useState(false);
  const [step, setStep] = useState(0);

  // 홈 화면 앱(PWA)을 다시 열었을 때 : 로그인 상태면 바로 홈
  if (localStorage.getItem(REFRESH_KEY)) {
    return <Navigate to="/home" replace />;
  }

  const current = INTRO_STEPS[step];
  const isLast = step === INTRO_STEPS.length - 1;

  const handleNext = () => {
    if (isLast) navigate("/terms");
    else setStep((prev) => prev + 1);
  };

  return (
    <div className="relative flex-1 flex flex-col items-center bg-navy overflow-hidden">
      {/* 배경 무늬 */}
      <svg aria-hidden className="pointer-events-none absolute inset-0 w-full h-full" viewBox="0 0 393 852" preserveAspectRatio="xMidYMid slice">
        <g fill="none" stroke="#FFFFFF" strokeOpacity="0.05">
          {Array.from({ length: 22 }, (_, i) => (
            <circle key={i} cx="80" cy="620" r={20 + i * 16} />
          ))}
        </g>
      </svg>

      {!opened ? (
        <>
          <p className="label-en mt-[88px] text-xs text-brass tracking-[0.35em]">MIND ISLANDS AIRLINE</p>
          <h1 className="mt-2 font-serif text-[40px] font-bold text-white">나가볼까?</h1>

          <button
            type="button"
            onClick={() => setOpened(true)}
            aria-label="여권 펼치기"
            className="mt-9 cursor-pointer animate-float"
          >
            <PassportCover />
          </button>

          <p className="mt-6 text-sm text-mute-on-navy">작은 모험을 떠날 준비, 됐나요?</p>

          <div className="mt-auto pb-10 flex flex-col items-center">
            <Button variant="gold" title="여권 펼치기" onClick={() => setOpened(true)} />
            <p className="mt-3.5 text-sm text-mute-on-navy">
              이미 여권이 있다면?{" "}
              <button type="button" onClick={() => goKakaoLogin()} className="font-bold text-[#FEE500] underline cursor-pointer">
                카카오로 이어하기
              </button>
            </p>
          </div>
        </>
      ) : (
        <>
          {/* 펼친 여권 : 왼쪽 표지 · 오른쪽 속지 */}
          <div className="mt-[72px] flex animate-[passport-open_0.6s_ease-out]">
            <div className="w-[64px] h-[290px] rounded-l-[14px] bg-navy-2 border border-navy-deep flex items-start justify-center pt-8">
              <svg width="36" height="36" viewBox="0 0 80 80" aria-hidden>
                <circle cx="40" cy="40" r="34" fill="none" stroke="#D2B36B" strokeWidth="4" />
              </svg>
            </div>
            <div className="w-[232px] h-[290px] rounded-r-[14px] bg-paper flex flex-col items-center justify-center">
              <Lumi key={current.id} pose={current.pose} size={150} />
              <p className="label-en mt-1 text-[10px] text-mute">CAPTAIN LUMI</p>
            </div>
          </div>

          <div className="mt-10">
            <DialogBox speaker={current.speaker} text={current.text} />
          </div>

          <div className="mt-auto pb-10 flex flex-col items-center">
            <Button variant="gold" title={current.buttonText} onClick={handleNext} />
            <p className="mt-3.5 text-sm text-mute-on-navy">
              이미 여권이 있다면?{" "}
              <button type="button" onClick={() => goKakaoLogin()} className="font-bold text-[#FEE500] underline cursor-pointer">
                카카오로 이어하기
              </button>
            </p>
          </div>
        </>
      )}
    </div>
  );
}