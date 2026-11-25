// 카카오맵 JS SDK 를 한 번만 불러옴
let loading = null;

export const loadKakaoMap = () => {
  if (window.kakao?.maps?.LatLng) return Promise.resolve(window.kakao);
  if (loading) return loading;

  const appKey = import.meta.env.VITE_KAKAO_JS_KEY;
  if (!appKey) return Promise.reject(new Error("VITE_KAKAO_JS_KEY 가 없어요"));

  loading = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${appKey}&autoload=false&libraries=services`;
    script.async = true;
    script.onload = () => window.kakao.maps.load(() => resolve(window.kakao));
    script.onerror = () => {
      loading = null; // 다음에 다시 시도
      reject(new Error("카카오맵을 불러오지 못했어요"));
    };
    document.head.appendChild(script);
  });
  return loading;
};

// 장소 핀 (카테고리 · 지역 색 물방울 + 이름표) — CustomOverlay content 로, yAnchor: 1
export const createPlacePin = (color, name) => {
  const marker = document.createElement("div");
  marker.className = "flex flex-col items-center";

  if (name) {
    const label = document.createElement("div");
    label.className =
      "mb-1 max-w-[160px] truncate rounded-full bg-[#1C2A5E] px-2.5 py-0.5 text-[11px] font-bold text-[#D2B36B] shadow";
    label.textContent = name;
    marker.appendChild(label);
  }

  const pin = document.createElement("div");
  pin.className =
    "flex h-7 w-7 items-center justify-center border-2 border-[#1C2A5E] shadow-[0_2px_6px_rgba(0,0,0,0.25)]";
  pin.style.backgroundColor = color;
  pin.style.borderRadius = "50% 50% 50% 0";
  pin.style.transform = "rotate(-45deg)";

  const dot = document.createElement("div");
  dot.className = "h-2.5 w-2.5 rounded-full bg-white";
  pin.appendChild(dot);

  marker.appendChild(pin);
  return marker;
};