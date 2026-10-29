import CheckBox from "../../components/Terms/CheckBox";
import { useState } from "react";
import Button from "../../components/common/Button/Button";
import { goKakaoLogin } from "../../utils/kakao";

export default function Terms() {
  const [agreements, setAgreements] = useState({
    service: false,
    privacy: false,
  });

  const isAllChecked = Object.values(agreements).every(Boolean); // agreements 안의 값이 전부 true 인지 확인

  const handleAllChange = () => {
    const next = !isAllChecked;
    setAgreements({ service: next, privacy: next });
  };

  const handleChange = (key) => () => {
    setAgreements((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleKakaoStart = () => {
    goKakaoLogin({ terms: agreements.service, privacy: agreements.privacy });
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
        <div className="w-[338px] h-[140px] border-2 border-[#E6D6B0] rounded-lg bg-[#F4EAD5] py-[19px] pl-[17px] pr-[14px] mt-[18px]">
          <CheckBox
            checked={isAllChecked}
            onChange={handleAllChange}
            label="전체 동의하기"
          />

          <div className="my-3 h-0.5 w-full bg-[repeating-linear-gradient(to_right,#D6C49A_0_4px,transparent_4px_7px)]" />

          <div className="flex items-center justify-between mt-[13.5px]">
            <CheckBox
              checked={agreements.service}
              onChange={handleChange("service")}
              label="서비스 이용약관"
            />
            <span className="text-[9px] text-[#B5523B] font-normal font-pixel">
              필수
            </span>
          </div>
          <div className="mt-[17px] flex items-center justify-between">
            <CheckBox
              checked={agreements.privacy}
              onChange={handleChange("privacy")}
              label="개인정보 수집 및 이용"
            />
            <span className="text-[9px] text-[#B5523B] font-normal font-pixel">
              필수
            </span>
          </div>
        </div>

        <p className="text-[#B9B0D0] text-xs font-medium font-sans break-keep leading-4 mt-5 mb-[379px]">
          나가볼까는 나가볼까는 치료 · 진단이 아닌 일상 연습 도구에요. 기록은
          언제든지 지울 수 있어요.
        </p>
      </div>
      <div className="mt-auto flex justify-center pb-[65px]">
        <Button
          variant="kakao"
          disabled={!isAllChecked}
          onClick={handleKakaoStart}
          title={
            isAllChecked ? "카카오로 시작하기" : "필수 항목에 동의해주세요"
          }
        />
      </div>
    </div>
  );
}
