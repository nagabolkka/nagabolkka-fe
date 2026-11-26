import StatTile from "./StatTile";
import AdminSectionTitle from "./AdminSectionTitle";

// 플러스 수요 : 가격 설문 응답 (누가 골랐는지는 서버도 안 줌)
const FARES = [
  { value: "PRICE_1900", label: "월 1,900원" },
  { value: "PRICE_3900", label: "월 3,900원" },
  { value: "CUSTOM", label: "직접 입력" },
];

export default function PlusDemand({ plusInterest }) {
  const { total, byOption = {}, customPriceAvg } = plusInterest;

  return (
    <div className="flex flex-col gap-3.5">
      <AdminSectionTitle en="PLUS DEMAND" title="플러스 관심 조사" />

      <div className="grid grid-cols-2 gap-2">
        <StatTile en="RESPONSES" label="응답한 탑승객" value={total} unit="명" />
        <StatTile
          en="CUSTOM AVG"
          label="직접 입력 평균"
          value={customPriceAvg != null ? customPriceAvg.toLocaleString() : "-"}
          unit={customPriceAvg != null ? "원" : ""}
        />
      </div>

      <section className="overflow-hidden rounded-2xl bg-ticket">
        <div className="flex items-center justify-between bg-brass px-3.5 py-2.5">
          <span className="label-en text-[11px] text-navy">FARE TABLE · 운임표</span>
          <span className="text-[11px] font-bold text-navy">응답 수</span>
        </div>
        <ul>
          {FARES.map(({ value, label }) => {
            const count = byOption[value] ?? 0;
            const percent = total ? Math.round((count / total) * 100) : 0;
            return (
              <li key={value} className="border-t border-line px-3.5 py-3 first:border-t-0">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span className="text-sm font-bold text-navy">{label}</span>
                    <span className="label-en text-[9px] text-mute">{value}</span>
                  </span>
                  <span className="flex items-baseline gap-0.5">
                    <span className="font-serif text-lg font-bold text-navy">{count}</span>
                    <span className="text-[11px] text-mute">명 · {percent}%</span>
                  </span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#E6E9F2]">
                  <div className="h-full rounded-full bg-navy" style={{ width: `${percent}%` }} />
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      <p className="text-[11px] leading-4 text-mute-on-navy">
        플러스는 아직 준비 중인 유료 기능이에요. 나 탭 「플러스」에서 탑승객이 고른 가격을 모아 보여 줘요.
        <br />
        누가 골랐는지는 보이지 않아요.
      </p>
    </div>
  );
}