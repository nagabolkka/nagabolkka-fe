import { useEffect, useState } from "react";
import { HELP_NOTICE, HOTLINES } from "../../constants/help";
import { getLocation } from "../../utils/location";
import { findNearbyCenter } from "../../utils/nearbyCenter";
import { useNavigate, useSearchParams } from "react-router-dom";
import HelpNotice from "../../components/Help/HelpNotice";
import HotlineCard from "../../components/Help/HotlineCard";
import CenterCard from "../../components/Help/CenterCard";
import { recordHelpOpened } from "../../api/safety";
import backButton from "../../assets/images/backButton.svg";

export default function Help() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const from = params.get("from");
  const notice = HELP_NOTICE[from] ?? HELP_NOTICE.default;

  const [nearby, setNearby] = useState({ status: "loading", center: null });

  // 가까운 센터 : 위치 → 카카오 검색 (109 · 1577-0199 는 기다리지 않고 바로 보임)
  useEffect(() => {
    let ignore = false;
    getLocation()
      .then(async (location) => {
        if (!location) return { status: "noLocation", center: null };
        const center = await findNearbyCenter(location);
        return center
          ? { status: "found", center }
          : { status: "notFound", center: null };
      })
      .catch(() => ({ status: "notFound", center: null })) // SDK 로딩 실패 등
      .then((result) => {
        if (!ignore) setNearby(result);
      });
    return () => {
      ignore = true;
    };
  }, []);

  // 직접 연 경우만 기록 (회고 · 연습 위기 감지는 서버가 이미 기록)
  useEffect(() => {
    if (from) return;
    recordHelpOpened().catch(() => {}); // 실패해도 도움 받기 화면은 그대로
  }, [from]);

  return (
    <div className="flex min-h-screen flex-col px-4 pb-8 pt-[27px] bg-[#1F2233]">
      <header className="flex items-center gap-3">
        <button type="button" onClick={() => navigate(-1)}>
          <img src={backButton} className="h-[22px] w-[22px]" />
        </button>
        <h1 className="font-pixel text-base font-normal text-[#F4EAD5]">
          도움 받기
        </h1>
      </header>

      <div className="mt-8 flex flex-col gap-4">
        <HelpNotice message={notice} />
        <p className="text-sm font-semibold text-[#E6E8F5]">
          혼자 견디지 않아도 돼요. 아래 번호는 24시간 언제든 연결돼요.
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        {HOTLINES.map(({ key, ...hotline }) => (
          <HotlineCard key={key} {...hotline} />
        ))}
        <CenterCard status={nearby.status} center={nearby.center} />
      </div>

      <p className="mt-4 text-xs font-normal font-sans leading-4 text-[#C3C6DA] break-keep">
        나가볼까는 치료 · 진단 서비스가 아니에요. 대화 내용은 저장하지 않고,
        도움 화면이 열린 시각만 남겨요.
      </p>
    </div>
  );
}
