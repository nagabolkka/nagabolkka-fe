// 복원도(%) → 지역 이미지 위 어두운 오버레이 opacity
// 복원도가 오를수록 오버레이가 옅어져 지역이 밝아진다
export const RESTORATION_OVERLAY = {
  0: 0.6,
  20: 0.48,
  40: 0.36,
  60: 0.24,
  80: 0.12,
  100: 0,
};

export const getOverlayOpacity = (restoration) =>
  RESTORATION_OVERLAY[restoration] ?? 0.6;