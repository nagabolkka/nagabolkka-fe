import CheckBox from "../../components/Terms/CheckBox";
import { useState } from "react";
import Button from "../../components/common/Button/Button";
import PolicySheet from "../../components/Terms/PolicySheet";
import { goKakaoLogin } from "../../utils/kakao";

// 🆕 체크 항목 → 시트에서 열 문서
const ITEMS = [
  { key: "service", label: "서비스 이용약관", policy: "service" },
  { key: "privacy", label: "개인정보 수집 및 이용", policy: "privacy" },
  { key: "location", label: "위치 기반 서비스 이용약관", policy: "location" },
];

export default function Terms() {
  const [agreements, setAgreements] = useState({
    service: false,
    privacy: false,
    location: false,
  });
  const [openPolicy, setOpenPolicy] = useState(null);

  const isAllChecked = Object.values(agreements).every(Boolean); // agreements 안의 값이 전부 true 인지 확인

  const handleAllChange = () => {
    const next = !isAllChecked;
    setAgreements({ service: next, privacy: next, location: next });
  };

  const handleChange = (key) => () => {
    setAgreements((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleKakaoStart = () => {
    goKakaoLogin({
      terms: agreements.service,
      privacy: agreements.privacy,
      location: agreements.location,
    });
  };

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex flex-col pl-7">
        <p className="text-[#F2C14E] text-sm font-normal font-pixel mt-[65px]">
          모험가 등록
        </p>
        <p className="text-[#F4EAD5] text-2xl font-normal font-pixel leading-8 mt-1">
          모험을 시작하기 전에
          <br />
          약속 몇 가지만 확인할게요
        </p>
        {/* 약관 동의 */}
        <div className="w-[calc(100vw_-_55px)] min-h-[177px] border-2 border-[#E6D6B0] rounded-lg bg-[#F4EAD5] py-[19px] pl-[17px] pr-[14px] mt-[18px]">
          <CheckBox
            checked={isAllChecked}
            onChange={handleAllChange}
            label="전체 동의하기"
          />

          <div className="my-3 h-0.5 w-full bg-[repeating-linear-gradient(to_right,#D6C49A_0_4px,transparent_4px_7px)]" />
          {ITEMS.map(({ key, label, policy }, i) => (
            <div
              key={key}
              className={`flex items-center justify-between ${
                i === 0 ? "mt-[13.5px]" : "mt-[17px]"
              }`}
            >
              <CheckBox
                checked={agreements[key]}
                onChange={handleChange(key)}
                label={label}
              />
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setOpenPolicy(policy)}
                  className="text-[10px] text-[#2B2340]/60 underline underline-offset-2"
                >
                  보기
                </button>
                <span className="text-[9px] text-[#B5523B] font-normal font-pixel">
                  필수
                </span>
              </div>
            </div>
          ))}
        </div>

        <p className="text-[#B9B0D0] text-xs font-medium font-sans break-keep leading-4 mt-5">
          나가볼까는 치료 · 진단이 아닌 일상 연습 도구예요. 기록은 언제든지 지울
          수 있어요.
        </p>
        <button
          type="button"
          onClick={() => setOpenPolicy("policy")}
          className="self-start mt-2 text-[11px] text-[#B9B0D0] underline underline-offset-2"
        >
          개인정보 처리방침
        </button>
      </div>
      <div className="mt-auto pt-10 flex justify-center pb-[65px]">
        <Button
          variant="kakao"
          disabled={!isAllChecked}
          onClick={handleKakaoStart}
          title={
            isAllChecked ? "카카오로 시작하기" : "필수 항목에 동의해주세요"
          }
        />
      </div>

      {openPolicy && (
        <PolicySheet
          initialKey={openPolicy}
          onClose={() => setOpenPolicy(null)}
        />
      )}
    </div>
  );
}
