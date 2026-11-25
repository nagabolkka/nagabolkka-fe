import InkStamp from "../common/Stamp/InkStamp";
import { DIFFICULTY } from "../../constants/difficulty";
import { SEAT_BY_DIFFICULTY, todayFlight } from "../../constants/islands";
import { formatDistance, formatMinutes } from "../../utils/format";

// 오늘의 퀘스트 = 오늘의 탑승권 (본권 + 오른쪽 네이비 스텁 = 버튼)
export default function TodayQuestCard({
  mission,
  region, // 섬 (getIsland)
  status = "ASSIGNED", // ASSIGNED · IN_PROGRESS · COMPLETED · SKIPPED
  date = new Date(),
  onClick,
  isSavedPlace = false,
  onDifficultyClick, // 있으면 등급 칩을 누를 수 있음 (수락 전 · 자동 배정 퀘스트)
}) {
  const isInProgress = status === "IN_PROGRESS";
  const isCompleted = status === "COMPLETED";
  const isSkipped = status === "SKIPPED";
  const isDone = isCompleted || isSkipped;
  const difficulty = DIFFICULTY[mission.difficulty];

  const stubLabel = isDone ? "내일\n또 만나요" : isInProgress ? "이어서\n가기" : "탑승\n하기";

  return (
    <section className="mx-4 flex drop-shadow-[0_8px_14px_rgba(122,134,173,0.3)]">
      {/* 본권 */}
      <div className="relative min-w-0 flex-1 overflow-hidden rounded-l-2xl rounded-r-md bg-ticket">
        <div className="h-9 px-4 flex items-center justify-between" style={{ backgroundColor: region.color }}>
          <span className="label-en text-[11px] text-navy">
            {isSavedPlace ? "SAVED FLIGHT" : "TODAY'S FLIGHT"}
          </span>
          <span className="label-en text-[11px] text-navy">{todayFlight(date)}</span>
        </div>

        <div className="px-4 pt-2.5 pb-3">
          {isCompleted && (
            <div className="flex items-center gap-3">
              <InkStamp title="입국" sub={mission.reward.name} color={region.dark} size={70} />
              <div className="min-w-0">
                <p className="label-en text-[10px] text-mute">ARRIVED</p>
                <p className="mt-0.5 font-serif text-[17px] font-bold leading-6 text-navy break-keep">
                  {mission.reward.name} 도장 쾅!
                </p>
                <p className="mt-0.5 text-xs text-mute truncate">{mission.title}</p>
              </div>
            </div>
          )}

          {isSkipped && (
            <div>
              <p className="label-en text-[10px] text-mute">REST DAY</p>
              <p className="mt-0.5 font-serif text-[17px] font-bold text-navy">오늘은 쉬어 가는 날</p>
              <p className="mt-1 text-xs leading-5 text-mute break-keep">
                잃은 건 없어요. 내일은 조금 더 가벼운 편으로 준비할게요.
              </p>
            </div>
          )}

          {!isDone && (
            <>
              <div className="flex items-center justify-between text-[12px] font-bold text-navy">
                <span>내 방</span>
                <span aria-hidden className="mx-2 flex-1 border-t border-dashed border-navy/40" />
                <span aria-hidden>✈</span>
                <span aria-hidden className="mx-2 flex-1 border-t border-dashed border-navy/40" />
                <span className="max-w-[40%] truncate">{mission.placeName}</span>
              </div>

              <h2 className="mt-2 font-serif text-[17px] font-bold leading-6 text-navy break-keep line-clamp-2">
                {mission.title}
              </h2>

              <div className="mt-2.5 pt-2 border-t border-line grid grid-cols-[1fr_auto_auto] gap-3 items-end">
                <Info label="TIME" value={mission.estMinutes != null ? formatMinutes(mission.estMinutes) : "-"} />
                <Info
                  label="DIST"
                  value={mission.isIndoor ? "이동 없음" : mission.distanceM != null ? formatDistance(mission.distanceM) : "-"}
                />
                <div>
                  <p className="label-en text-[9px] text-mute">CLASS</p>
                  {isSavedPlace ? (
                    <span className="mt-0.5 inline-block rounded-full bg-[#E3EEFF] px-2.5 py-1 text-[11px] font-bold text-navy">
                      담아둔 곳
                    </span>
                  ) : onDifficultyClick ? (
                    <button
                      type="button"
                      onClick={onDifficultyClick}
                      aria-label={`등급 ${difficulty.label} · 눌러서 바꾸기`}
                      className="mt-0.5 inline-flex items-center gap-1 rounded-full border-[1.5px] border-navy px-2.5 py-0.5 text-[12px] font-bold text-navy cursor-pointer active:translate-y-px"
                      style={{ backgroundColor: difficulty.bgColor }}
                    >
                      {difficulty.label}
                      <span aria-hidden className="text-[9px]">▾</span>
                    </button>
                  ) : (
                    <span
                      className="mt-0.5 inline-block rounded-full px-2.5 py-1 text-[12px] font-bold text-navy"
                      style={{ backgroundColor: difficulty.bgColor }}
                    >
                      {difficulty.label} · {SEAT_BY_DIFFICULTY[mission.difficulty]}
                    </span>
                  )}
                </div>
              </div>

              {isInProgress ? (
                <p className="mt-2 flex items-center gap-1.5 text-[11px] font-semibold text-navy">
                  <span className="w-2 h-2 rounded-full bg-[#5DB884] animate-pulse" />
                  비행 중 · 다녀오면 입국 심사를 받아요
                </p>
              ) : (
                <p className="mt-2 text-[11px] text-mute">
                  도착하면 <span className="font-bold text-navy">{mission.reward.name}</span> 도장
                </p>
              )}
            </>
          )}
        </div>
      </div>

      {/* 스텁 */}
      <button
        type="button"
        onClick={isDone ? undefined : onClick}
        disabled={isDone}
        aria-label={isDone ? "오늘 퀘스트 끝" : isInProgress ? "이어서 하기" : "퀘스트 확인하기"}
        className="relative w-[78px] shrink-0 rounded-r-2xl rounded-l-md bg-navy flex flex-col items-center justify-between py-3 cursor-pointer disabled:cursor-default border-l-2 border-dashed border-line/60"
      >
        <svg width="40" height="70" aria-hidden>
          {Array.from({ length: 14 }, (_, i) => (
            <rect key={i} x="0" y={i * 5} width="40" height={[1, 2, 1, 3, 1, 2][i % 6]} fill="#D2B36B" opacity="0.8" />
          ))}
        </svg>
        <span className="whitespace-pre-line text-center text-[15px] font-bold leading-5 text-brass">
          {stubLabel}
        </span>
        <span className="label-en text-[8px] text-mute-on-navy">BOARDING</span>
      </button>
    </section>
  );
}

function Info({ label, value }) {
  return (
    <div className="min-w-0">
      <p className="label-en text-[9px] text-mute">{label}</p>
      <p className="mt-0.5 text-[13px] font-bold text-navy truncate">{value}</p>
    </div>
  );
}