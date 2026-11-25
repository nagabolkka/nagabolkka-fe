import { useState } from "react";

const MESSAGES = {
  denied: {
    title: "위치 권한이 꺼져 있어요",
    body: "지금은 가입할 때 고른 동네 중심으로 퀘스트와 장소를 찾고 있어요. 위치를 허용하면 지금 있는 곳 근처로 찾아 드려요.",
  },
  unavailable: {
    title: "지금 위치를 찾지 못했어요",
    body: "기기의 위치 서비스가 켜져 있는지 확인해 주세요. 지금은 가입할 때 고른 동네 중심으로 보여 드려요.",
  },
};

const GUIDES = [
  "크롬 (PC · 안드로이드) : 주소창 왼쪽 아이콘 → 권한 · 위치 → 허용",
  "아이폰 사파리 : 설정 → 개인정보 보호 및 보안 → 위치 서비스 → 켜기 → Safari 웹 사이트 → 앱을 사용하는 동안",
  "안드로이드 : 설정 → 위치 → 켜기",
];

// 이 탭에서 닫았으면 안 보임 (앱을 다시 열면 다시 알려 줌)
const HIDDEN_KEY = "nagabolkka:locationBannerHidden";

const isHidden = () => {
  try {
    return sessionStorage.getItem(HIDDEN_KEY) === "1";
  } catch {
    return false;
  }
};

export default function LocationBanner({ status, onRetry }) {
  const [hidden, setHidden] = useState(isHidden);
  const [guideOpen, setGuideOpen] = useState(false);
  const [retrying, setRetrying] = useState(false);

  const message = MESSAGES[status];
  if (!message || hidden) return null;

  const hide = () => {
    try {
      sessionStorage.setItem(HIDDEN_KEY, "1");
    } catch {
      // 저장 못 해도 이번 화면에선 닫힘
    }
    setHidden(true);
  };

  const retry = async () => {
    setRetrying(true);
    try {
      await onRetry();
    } finally {
      setRetrying(false);
    }
  };

  return (
    <section
      role="status"
      className="mx-4 mt-3 rounded-2xl border border-line bg-ticket px-4 py-3"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-bold text-navy">{message.title}</p>
          <p className="mt-1 text-xs leading-5 text-mute break-keep">
            {message.body}
          </p>
        </div>
        <button
          type="button"
          onClick={hide}
          className="shrink-0 text-xs text-mute cursor-pointer"
        >
          닫기
        </button>
      </div>

      <div className="mt-2 flex gap-4 text-xs">
        <button
          type="button"
          onClick={retry}
          disabled={retrying}
          className="font-bold text-navy underline disabled:opacity-50 cursor-pointer"
        >
          {retrying ? "확인 중…" : "다시 시도"}
        </button>
        <button
          type="button"
          onClick={() => setGuideOpen((open) => !open)}
          aria-expanded={guideOpen}
          className="text-mute underline cursor-pointer"
        >
          켜는 방법
        </button>
      </div>

      {guideOpen && (
        <ul className="mt-2 list-disc pl-4 text-[11px] leading-5 text-mute break-keep">
          {GUIDES.map((guide) => (
            <li key={guide}>{guide}</li>
          ))}
        </ul>
      )}
    </section>
  );
}