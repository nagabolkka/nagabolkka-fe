import CheckBox from "../../components/Terms/CheckBox";
import { useState } from "react";
import Button from "../../components/common/Button/Button";
import PolicySheet from "../../components/Terms/PolicySheet";
import { goKakaoLogin } from "../../utils/kakao";

// 체크 항목 → 시트에서 열 문서
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
    <div className="flex-1 flex flex-col bg-sky-paper">
      <div className="flex flex-col px-6">
        <p className="label-en text-[11px] text-stamp-red mt-16">ARRIVAL CARD</p>
        <h1 className="mt-1 font-serif text-[26px] font-bold leading-9 text-navy">
          마음 군도
          <br />
          입국 신청서
        </h1>
        <p className="mt-2 text-[13px] text-mute">
          섬에 들어가기 전에, 몇 가지만 확인할게요.
        </p>

        {/* 약관 동의 */}
        <div className="mt-5 rounded-2xl border border-line bg-ticket px-4 py-4">
          <CheckBox checked={isAllChecked} onChange={handleAllChange} label="전체 동의하기" bold />

          <div className="my-3 h-px w-full bg-line" />
          {ITEMS.map(({ key, label, policy }, i) => (
            <div
              key={key}
              className={`flex items-center justify-between ${i === 0 ? "" : "mt-3.5"}`}
            >
              <CheckBox checked={agreements[key]} onChange={handleChange(key)} label={label} />
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setOpenPolicy(policy)}
                  className="text-[11px] text-mute underline underline-offset-2 cursor-pointer"
                >
                  보기
                </button>
                <span className="text-[11px] font-bold text-stamp-red">필수</span>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-4 text-xs leading-5 text-mute break-keep">
          나가볼까는 치료 · 진단이 아닌 일상 연습 도구예요. 기록은 언제든지 지울 수 있어요.
        </p>
        <button
          type="button"
          onClick={() => setOpenPolicy("policy")}
          className="self-start mt-2 text-[11px] text-mute underline underline-offset-2 cursor-pointer"
        >
          개인정보 처리방침
        </button>
      </div>
      <div className="mt-auto pt-10 flex justify-center pb-14">
        <Button
          variant="kakao"
          disabled={!isAllChecked}
          onClick={handleKakaoStart}
          title={isAllChecked ? "카카오로 입국하기" : "필수 항목에 동의해주세요"}
        />
      </div>

      {openPolicy && (
        <PolicySheet initialKey={openPolicy} onClose={() => setOpenPolicy(null)} />
      )}
    </div>
  );
}