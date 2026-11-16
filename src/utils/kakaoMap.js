// 카카오맵 JS SDK 를 한 번만 불러옴 
let loading = null;

export const loadKakaoMap = () => {
  if (window.kakao?.maps?.LatLng) return Promise.resolve(window.kakao);
  if (loading) return loading;

  const appKey = import.meta.env.VITE_KAKAO_JS_KEY;
  if (!appKey) return Promise.reject(new Error("VITE_KAKAO_JS_KEY 가 없어요"));

  loading = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${appKey}&autoload=false`;
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