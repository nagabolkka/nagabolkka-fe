import { useEffect, useState } from "react";
import { enablePush, getPushState } from "../../utils/push";

const ASKED_KEY = "nagabolkka:pushAsked";

export default function PushAskCard() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(ASKED_KEY)) return;
    getPushState()
      .then((s) => setShow(s === "off" && Notification.permission === "default"))
      .catch(() => {});
  }, []);

  if (!show) return null;
  const close = () => {
    localStorage.setItem(ASKED_KEY, "1");
    setShow(false);
  };

  return (
    <section className="rounded-2xl bg-navy-2 p-4">
      <p className="text-sm font-bold text-white">내일 아침에도 탑승권을 알려 줄까요?</p>
      <p className="mt-1 text-xs text-mute-on-navy break-keep">
        매일 오전 9시에 오늘의 탑승권이 나오면 알려 줄게요. 언제든 나 탭에서 끌 수 있어요.
      </p>
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={async () => {
            await enablePush().catch(() => {});
            close();
          }}
          className="flex-1 h-10 rounded-xl bg-brass text-sm font-bold text-navy cursor-pointer"
        >
          알려 줘
        </button>
        <button
          type="button"
          onClick={close}
          className="flex-1 h-10 rounded-xl border border-[#8FA0D0] text-sm font-bold text-white cursor-pointer"
        >
          괜찮아요
        </button>
      </div>
    </section>
  );
}