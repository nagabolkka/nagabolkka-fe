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
            ? "매일 아침 9시에 오늘의 탑승권을 알려 줄게요"
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
    <section className="w-full rounded-2xl border border-line bg-ticket px-4 py-3.5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[15px] font-bold text-navy">알림</p>
          <p className="mt-0.5 text-xs text-mute">
            오늘의 탑승권 (매일 9시) · 루미의 엽서 · 서버 점검
          </p>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={on}
          aria-label="알림"
          onClick={toggle}
          disabled={!canToggle}
          className={`h-7 w-12 shrink-0 rounded-full p-0.5 transition-colors cursor-pointer ${
            on ? "bg-brass" : "bg-line"
          } disabled:opacity-40`}
        >
          <span
            className={`block size-6 rounded-full bg-white shadow transition-transform ${on ? "translate-x-5" : ""}`}
          />
        </button>
      </div>
      {GUIDE[state] && <p className="mt-2 text-xs text-mute break-keep">{GUIDE[state]}</p>}
    </section>
  );
}