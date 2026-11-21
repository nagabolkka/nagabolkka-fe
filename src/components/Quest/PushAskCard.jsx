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
    <section className="rounded-[10px] border-2 border-[#15121F] bg-[#2C2745] p-4">
      <p className="font-pixel text-sm text-[#F4EAD5]">내일 아침에도 알려 줄까?</p>
      <p className="mt-1 text-xs text-[#B9B0D0] break-keep">매일 오전 9시에 오늘의 퀘스트가 도착하면 알려 줄게요. 언제든 마이페이지에서 끌 수 있어요.</p>
      <div className="mt-3 flex gap-2">
        <button type="button" onClick={async () => { await enablePush().catch(() => {}); close(); }}
          className="flex-1 h-10 rounded-[10px] border-2 border-[#15121F] bg-[#F2C14E] font-pixel text-sm text-[#15121F]">
          알려 줘
        </button>
        <button type="button" onClick={close}
          className="flex-1 h-10 rounded-[10px] border-2 border-[#15121F] bg-[#3A3358] font-pixel text-sm text-[#F4EAD5]">
          괜찮아요
        </button>
      </div>
    </section>
  );
}