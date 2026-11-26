import { useEffect, useRef } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Lumi from "../../components/common/Lumi/Lumi";
import PageLoading from "../../components/common/PageLoading/PageLoading";
import useQuest from "../../hooks/useQuest";
import useLumiCall from "../../hooks/useLumiCall";

const ERROR_TEXT = {
  MIC_DENIED: "마이크를 쓸 수 있게 허용해야 루미와 통화할 수 있어요.",
  CALL_UNAVAILABLE: "지금은 루미와 통화할 수 없어요. 혼자 비행으로 이어 가요.",
  QUEST_ALREADY_DONE: "오늘 비행은 이미 끝났어요.",
  NOT_FOUND: "오늘 탑승권을 먼저 받아 주세요.",
  NETWORK: "통화가 끊겼어요. 잠시 후 다시 불러 주세요.",
};

const mmss = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

// 루미 동행 통화 : 비행 중에 이어폰으로 루미와 실시간 통화
export default function QuestCall() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { quest, mission, error: questError } = useQuest();
  const call = useLumiCall();
  const autoStarted = useRef(false);

  // 탑승 방법에서 「통화하며 가기」 로 왔으면 바로 연결 (안 되면 시작 버튼이 그대로 보임)
  const { start } = call;
  useEffect(() => {
    if (!state?.autoStart || !quest || autoStarted.current) return;
    autoStarted.current = true;
    start();
  }, [state, quest, start]);

  if (!quest) return <PageLoading error={questError} />;
  if (quest.status === "COMPLETED" || quest.status === "SKIPPED") return <Navigate to="/home" replace />;

  const back = quest.isSplit ? "/quest/split" : "/quest/progress";
  const hangUp = () => {
    call.stop();
    navigate(back);
  };
  const land = () => {
    call.stop();
    navigate("/quest/record");
  };
  const live = call.status === "live";

  return (
    <div className="relative flex min-h-dvh flex-1 flex-col overflow-hidden bg-navy-deep px-5 pb-8 text-white">
      <svg aria-hidden width="440" height="440" className="pointer-events-none absolute left-1/2 top-[-40px] -translate-x-1/2">
        {Array.from({ length: 9 }, (_, i) => (
          <circle key={i} cx="220" cy="220" r={(i + 1) * 24} fill="none" stroke="#D2B36B" strokeOpacity="0.07" />
        ))}
      </svg>

      <header className="relative flex items-center justify-between pt-6">
        <p className="label-en text-[11px] text-brass">{live ? "IN FLIGHT · 루미와 통화 중" : "CALL · 루미 동행"}</p>
        <div className="flex items-center gap-2">
          {live && (
            <span className="text-xs tabular-nums text-mute-on-navy">
              {mmss(call.seconds)} / {mmss(call.maxSeconds)}
            </span>
          )}
          <button
            type="button"
            onClick={() => {
              call.stop();
              navigate("/help");
            }}
            className="rounded-full border border-mute-on-navy/40 px-2.5 py-1 text-[11px] text-mute-on-navy cursor-pointer"
          >
            🛟 도움 받기
          </button>
        </div>
      </header>

      {/* 루미 */}
      <div className="relative mx-auto mt-8 flex h-[170px] w-[170px] items-center justify-center">
        <span
          aria-hidden
          className={`absolute inset-0 rounded-full bg-brass/20 ${call.speaking ? "animate-ping" : ""}`}
          style={{ animationDuration: "1.6s" }}
        />
        <span className="relative flex h-[148px] w-[148px] items-end justify-center overflow-hidden rounded-full border-[5px] border-brass bg-paper">
          <Lumi pose="salute" bust size={120} decorative />
        </span>
      </div>

      <div className="relative mt-3 flex h-7 items-center justify-center gap-1" aria-hidden>
        {[10, 18, 28, 16, 24, 12, 20, 8].map((h, i) => (
          <span
            key={i}
            className={`w-1 rounded-full bg-brass ${call.speaking ? "animate-pulse" : "opacity-30"}`}
            style={{ height: call.speaking ? h : 4, animationDelay: `${i * 90}ms` }}
          />
        ))}
      </div>
      <p className="relative mt-1 text-center text-xs text-mute-on-navy" role="status">
        {call.status === "connecting" && "루미를 부르는 중…"}
        {live && (call.speaking ? "루미가 말하고 있어요" : call.muted ? "마이크가 꺼져 있어요" : "듣고 있어요")}
        {call.status === "ended" && "통화가 끝났어요"}
        {call.status === "idle" && mission.title}
      </p>

      {/* 대기 · 실패 */}
      {(call.status === "idle" || call.status === "error" || call.status === "ended") && (
        <div className="relative mt-6 flex flex-col gap-3">
          {call.status === "error" && (
            <p className="rounded-xl bg-navy px-4 py-3 text-center text-sm text-white">
              {ERROR_TEXT[call.error] ?? ERROR_TEXT.NETWORK}
            </p>
          )}
          {call.status !== "ended" && (
            <>
              <ul className="rounded-xl bg-navy px-4 py-3 text-xs leading-6 text-mute-on-navy">
                <li>🎧 이어폰을 끼면 더 잘 들려요</li>
                <li>🔒 통화는 녹음 · 저장하지 않아요</li>
                <li>📱 통화 중엔 화면을 켜 둘게요 · 최대 {Math.round(call.maxSeconds / 60)}분</li>
              </ul>
              <button
                type="button"
                onClick={call.start}
                disabled={call.error === "QUEST_ALREADY_DONE"}
                className="h-14 rounded-xl bg-brass text-base font-bold text-navy cursor-pointer disabled:opacity-40"
              >
                🎧 {call.status === "error" ? "다시 부르기" : "루미랑 통화 시작"}
              </button>
            </>
          )}
          <button type="button" onClick={() => navigate(back)} className="h-11 text-sm text-mute-on-navy cursor-pointer">
            혼자 비행으로 돌아가기
          </button>
        </div>
      )}

      {/* 자막 */}
      {(live || call.status === "connecting") && (
        <ul className="relative mt-5 flex flex-1 flex-col justify-end gap-2" aria-live="polite">
          {call.lines.map((line, i) => (
            <li
              key={i}
              className={`rounded-2xl px-3.5 py-2.5 ${line.who === "lumi" ? "bg-ticket text-navy" : "ml-8 bg-navy-2 text-white"}`}
            >
              <p className={`label-en text-[9px] ${line.who === "lumi" ? "text-[#C98714]" : "text-mute-on-navy"}`}>
                {line.who === "lumi" ? "CAPTAIN LUMI" : "나"}
              </p>
              <p className="mt-0.5 text-[13px] leading-5 break-keep">{line.text}</p>
            </li>
          ))}
        </ul>
      )}

      {/* 통화 버튼 */}
      {live && (
        <div className="relative mt-5 grid grid-cols-3 gap-2">
          <CallButton icon={call.muted ? "🔇" : "🎙"} label={call.muted ? "마이크 켜기" : "음소거"} onClick={call.toggleMute} />
          <CallButton icon="↩" label="끊고 돌아가기" onClick={hangUp} tone="red" />
          <CallButton icon="🛬" label="착륙했어요" onClick={land} tone="gold" />
        </div>
      )}
      <p className="relative mt-3 text-center text-[10.5px] text-mute-on-navy/70">
        녹음하지 않아요 · 자막은 이 화면에만 보여요
      </p>
    </div>
  );
}

function CallButton({ icon, label, onClick, tone }) {
  const bg = tone === "gold" ? "bg-brass text-navy" : tone === "red" ? "bg-[#7A2E2E] text-white" : "bg-navy-2 text-white";
  return (
    <button type="button" onClick={onClick} className="flex flex-col items-center gap-1.5 cursor-pointer">
      <span className={`flex h-14 w-14 items-center justify-center rounded-full text-xl ${bg}`}>{icon}</span>
      <span className="text-[11px] text-mute-on-navy">{label}</span>
    </button>
  );
}