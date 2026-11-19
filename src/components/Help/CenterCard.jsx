import { formatDistance } from "../../utils/format";
import { CENTER_SEARCH_URL } from "../../constants/help";

const CARD = "block rounded-[10px] border-2 border-[#15121F] bg-[#2C2F45] px-4 py-[11px]";

// status : "loading" (찾는 중) · "found" · "noLocation" (위치 꺼짐) · "notFound" (근처 없음 · 실패)
export default function CenterCard({ status, center }) {
  if (status === "loading") {
    return (
      <div className={CARD}>
        <p className="text-xs text-[#C3C6DA] font-normal font-sans">가까운 기관</p>
        <p className="mt-1 text-sm text-[#C3C6DA] font-normal font-sans">
          가까운 정신건강복지센터를 찾고 있어요…
        </p>
      </div>
    );
  }

  if (status !== "found") {
    return (
      <a href={CENTER_SEARCH_URL} target="_blank" rel="noopener noreferrer" className={CARD}>
        <p className="text-xs text-[#C3C6DA] font-normal font-sans">가까운 기관</p>
        <p className="mt-1 text-base font-bold text-[#F4EAD5] font-sans">
          정신건강복지센터 찾아보기 ▶
        </p>
        <p className="mt-1 text-xs text-[#C3C6DA] font-normal font-sans break-keep">
          {status === "noLocation"
            ? "위치를 켜면 가장 가까운 센터를 바로 보여드려요."
            : "카카오맵에서 우리 동네 센터를 찾을 수 있어요."}
        </p>
      </a>
    );
  }

  const { name, address, tel, distanceM } = center;
  return (
    <a href={`tel:${tel.replaceAll("-", "")}`} className={CARD}>
      <p className="text-xs text-[#C3C6DA] font-normal font-sans">가까운 기관</p>
      <div className="mt-1 flex items-center justify-between gap-3">
        <p className="text-base font-bold text-[#F4EAD5] font-sans break-keep">{name}</p>
        <span className="shrink-0 text-xs font-normal font-pixel text-[#F4EAD5]">전화 ▶</span>
      </div>
      <p className="mt-1 text-xs text-[#C3C6DA] font-normal font-sans break-keep">
        {address} · {formatDistance(distanceM)}
      </p>
    </a>
  );
}