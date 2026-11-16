import api from "./api";

// 루미 플러스 설문 응답 · 수정 → { plusInterest, rewardPiece } (첫 응답만 rewardPiece)
export async function savePlusInterest({ priceOption, customPrice }) {
  const { data } = await api.put("/api/plus/interest", {
    priceOption,
    customPrice: priceOption === "CUSTOM" ? customPrice : null,
  });
  return data;
}