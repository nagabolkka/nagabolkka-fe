import Lumi from "../common/Lumi/Lumi";
import Ticket from "../common/Ticket/Ticket";
import { getIsland, SEAT_BY_DIFFICULTY } from "../../constants/islands";
import { DIFFICULTY } from "../../constants/difficulty";
import { iGa, euro } from "../../utils/josa";

// 새 섬 탑승구 (장식) · 다음 섬이 열리는 이유
const GATE = { 2: "현관문", 3: "동네 골목", 4: "버스 정류장", 5: "큰길" };
const OPEN_LINE = {
  2: "이제 문 밖으로 한 발,",
  3: "이제 동네로 한 걸음 더,",
  4: "이제 사람들 곁으로 한 걸음,",
  5: "이제 하고 싶은 일 쪽으로,",
};

// 섬 불빛 5개를 다 켜면 홈에서 먼저 뜨는 전체 화면 : 다음 섬 새 탑승권
export default function NextIslandPass({ region, nextRegion, difficulty, submitting = false, onOpen, onStay }) {
  const here = getIsland(region.stageNo);
  const next = getIsland(nextRegion.stageNo);
  const seat = SEAT_BY_DIFFICULTY[difficulty] ?? "1A";
  const seatLabel = DIFFICULTY[difficulty]?.label;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="next-island-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-navy"
    >
      {/* 배경 : 은은한 동심원 + 다음 섬 색 빛 */}
      <svg aria-hidden className="pointer-events-none absolute left-1/2 top-[-160px] -translate-x-1/2" width="720" height="720">
        {Array.from({ length: 22 }, (_, i) => (
          <circle key={i} cx="360" cy="360" r={20 + i * 16} fill="none" stroke="#FFFFFF" strokeOpacity="0.05" />
        ))}
      </svg>
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-10 h-36 w-36 -translate-x-1/2 rounded-full opacity-35 blur-2xl"
        style={{ backgroundColor: next.color }}
      />

      <div className="relative mx-auto flex min-h-full max-w-[430px] flex-col px-6 pb-8 pt-7">
        <div className="relative flex justify-center">
          <Lumi pose="salute" size={54} decorative className="absolute left-0 -top-1" />
          <div className="flex gap-2.5 pt-3" aria-label="불빛 5개가 모두 켜졌어요">
            {Array.from({ length: 5 }, (_, i) => (
              <span
                key={i}
                className="h-6 w-6 rounded-full border-[3px] border-[#3A4677] bg-lamp shadow-[0_0_10px_rgba(255,224,122,0.7)]"
              />
            ))}
          </div>
        </div>

        <p className="label-en mt-4 text-center text-[12px] tracking-[0.2em] text-brass">NEW ROUTE OPENED</p>
        <h1 id="next-island-title" className="mt-1 text-center font-serif text-[22px] font-bold text-white break-keep">
          {next.name} 안개가 걷혔어요
        </h1>

        <Ticket
          className="mt-5"
          color={next.color}
          accent={next.dark}
          flight={next.flight}
          badge="NEW ROUTE"
          from={{ code: here.code, label: here.name }}
          to={{ code: next.code, label: next.name }}
          stub={
            <div>
              <p className="label-en text-[11px] text-navy">
                {next.flight} · {here.code} → {next.code}
              </p>
              <p className="mt-1 text-[11px] text-mute">이 표 한 장이면 충분해요</p>
              <svg width="300" height="40" aria-hidden className="mt-2 max-w-full">
                {Array.from({ length: 60 }, (_, i) => (
                  <rect key={i} x={i * 5} y="0" width={[2, 1, 2, 2, 1, 1, 3][i % 7]} height="40" fill="#1C2A5E" />
                ))}
              </svg>
            </div>
          }
        >
          <dl className="mt-3 grid grid-cols-3 gap-x-2 gap-y-3 border-t border-line pt-3">
            <Info label="PASSENGER / 탑승객" value="모험가" />
            <Info label="FLIGHT / 편명" value={next.flight} />
            <Info label="GATE / 탑승구" value={GATE[next.stageNo] ?? "현관문"} />
            <Info label="SEAT / 좌석" value={seatLabel ? `${seat} · ${seatLabel}` : seat} />
            <Info label="BOARDING / 탑승" value="오늘" />
            <Info label="CLASS / 섬" value={next.name} />
          </dl>
          <p
            className="mt-3 rounded-xl px-3 py-2.5 text-xs leading-5 break-keep"
            style={{ backgroundColor: `${next.color}2E`, color: next.dark }}
          >
            {here.name} 불빛 5개를 다 켰어요.
            <br />
            {OPEN_LINE[next.stageNo] ?? "이제 한 걸음 더,"} {next.name}
            {iGa(next.name)} 열렸어요.
          </p>
        </Ticket>

        <div className="mt-auto flex flex-col items-center gap-1 pt-7">
          <button
            type="button"
            onClick={onOpen}
            disabled={submitting}
            className="h-14 w-full rounded-xl text-base font-bold text-navy transition active:translate-y-px disabled:opacity-60 cursor-pointer"
            style={{ backgroundColor: next.color }}
          >
            {submitting ? "탑승 준비 중…" : `✈  ${next.name}${euro(next.name)} 탑승`}
          </button>
          <button
            type="button"
            onClick={onStay}
            disabled={submitting}
            className="h-11 w-full text-sm text-mute-on-navy cursor-pointer disabled:opacity-60"
          >
            {here.name}에 조금 더 머물래요
          </button>
          <p className="text-[11px] text-mute-on-navy/70">머물러도 모은 도장은 그대로예요</p>
        </div>
      </div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className="min-w-0">
      <dt className="text-[9px] text-mute">{label}</dt>
      <dd className="mt-0.5 text-[14px] font-bold text-navy break-keep">{value}</dd>
    </div>
  );
}