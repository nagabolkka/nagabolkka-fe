import { useNavigate, useSearchParams } from "react-router-dom";
import HelpNotice from "../../components/Help/HelpNotice";
import HotlineCard from "../../components/Help/HotlineCard";
import CenterCard from "../../components/Help/CenterCard";
import { HELP_NOTICE, HOTLINES, NEARBY_CENTER } from "../../constants/help";
import backButton from "../../assets/images/backButton.svg";

export default function Help() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const notice = HELP_NOTICE[params.get("from")] ?? HELP_NOTICE.default;

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
        <CenterCard center={NEARBY_CENTER} />
      </div>

      <p className="mt-4 text-xs font-normal font-sans leading-4 text-[#C3C6DA] break-keep">
        나가볼까는 치료 · 진단 서비스가 아니에요. 대화 내용은 저장하지 않고,
        도움 화면이 열린 시각만 남겨요.
      </p>
    </div>
  );
}
