import { useEffect, useState } from "react";
import { disablePush, enablePush, getPushState } from "../../utils/push";

const GUIDE = {
  "needs-install":
    "아이폰은 공유 → 「홈 화면에 추가」 한 앱에서 알림을 받을 수 있어요.",
  denied: "브라우저 설정에서 이 사이트 알림이 꺼져 있어요.",
  unsupported: "이 브라우저에서는 알림을 받을 수 없어요.",
};

export default function NotificationToggle({ onToast }) {
  const [state, setState] = useState(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    getPushState()
      .then(setState)
      .catch(() => setState("unsupported"));
  }, []);

  if (!state) return null;
  const on = state === "on";
  const canToggle = state === "on" || state === "off";

  const toggle = async () => {
    if (busy || !canToggle) return;
    setBusy(true);
    try {
      if (on) {
        await disablePush();
        setState("off");
        onToast?.("알림을 껐어요");
      } else {
        const ok = await enablePush();
        setState(ok ? "on" : await getPushState());
        onToast?.(
          ok
            ? "매일 아침 9시에 오늘의 퀘스트를 알려 줄게요"
            : "알림이 허용되지 않았어요",
        );
      }
    } catch {
      onToast?.("잠시 후 다시 시도해 주세요.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="w-full rounded-[10px] border-2 border-[#15121F] bg-[#2C2745] px-4 py-3.5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="font-pixel text-sm text-[#F4EAD5]">알림</p>
          <p className="mt-0.5 text-xs text-[#B9B0D0]">
            오늘의 퀘스트 (매일 9시) · 루미의 편지 · 서버 점검
          </p>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={on}
          onClick={toggle}
          disabled={!canToggle}
          className={`h-7 w-12 shrink-0 rounded-full border-2 border-[#15121F] p-0.5 transition-colors ${
            on ? "bg-[#F2C14E]" : "bg-[#3A3358]"
          } disabled:opacity-40`}
        >
          <span
            className={`block size-5 rounded-full bg-[#F4EAD5] transition-transform ${on ? "translate-x-5" : ""}`}
          />
        </button>
      </div>
      {GUIDE[state] && (
        <p className="mt-2 text-xs text-[#B9B0D0] break-keep">{GUIDE[state]}</p>
      )}
    </section>
  );
}
