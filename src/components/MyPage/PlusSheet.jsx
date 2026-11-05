import { useState } from "react";
import { CUSTOM_PRICE_MAX, PLUS_FEATURES, PRICE_OPTIONS } from "../../constants/plus";

export default function PlusSheet({ plusInterest, onClose, onSubmit }) {
  const [option, setOption] = useState(plusInterest?.priceOption ?? null);
  const [customPrice, setCustomPrice] = useState(plusInterest?.customPrice?.toString() ?? "");

  const price = Number(customPrice);
  const isCustomValid = customPrice !== "" && Number.isInteger(price) && price >= 0 && price <= CUSTOM_PRICE_MAX;
  const canSubmit = option && (option !== "CUSTOM" || isCustomValid);

  const handleSubmit = () => {
    onSubmit({ priceOption: option, customPrice: option === "CUSTOM" ? price : null });
  };

  return (
    <div className="absolute inset-0 z-50 flex items-end bg-black/50" onClick={onClose}>
      <div
        className="w-full rounded-t-2xl bg-[#F4EAD5] px-5 pb-8 pt-3"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto h-1 w-10 rounded-full bg-[#C9B48E]" />

        <h2 className="mt-4 font-pixel text-xl text-[#15121F]">루미 플러스</h2>
        <p className="mt-1 text-xs text-[#15121F]/60">조금 더 깊은 모험을 위한 추가 기능 · 준비 중</p>

        <ul className="mt-4 flex flex-col gap-2">
          {PLUS_FEATURES.map(({ title, desc, color }) => (
            <li key={title} className="flex items-center gap-3 rounded-md bg-[#E8DCC0] px-3 py-2.5">
              <div
                className="ml-1 h-3.5 w-3.5 shrink-0 rotate-45 border-2 border-[#15121F]"
                style={{ backgroundColor: color }}
              />
              <div>
                <p className="text-sm text-[#15121F]">{title}</p>
                <p className="text-[10px] text-[#15121F]/60">{desc}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-4 border-t-2 border-dashed border-[#C9B48E] pt-3">
          <p className="text-[11px] leading-relaxed text-[#15121F]/70">
            루미 플러스, 어떻게 생각해요?
            <br />
            나중에 생긴다면 어느 정도가 괜찮을지 알려주세요.
          </p>

          <ul className="mt-3 flex flex-col gap-2">
            {PRICE_OPTIONS.map(({ value, label }) => (
              <li key={value}>
                <label className="flex items-center gap-2 text-xs text-[#15121F]">
                  <input
                    type="radio"
                    name="priceOption"
                    checked={option === value}
                    onChange={() => setOption(value)}
                    className="h-4 w-4 accent-[#2B2340]"
                  />
                  {label}
                  {value === "CUSTOM" && (
                    <span className="flex items-center gap-1">
                      [
                      <input
                        type="number"
                        inputMode="numeric"
                        value={customPrice}
                        onChange={(e) => {
                          setCustomPrice(e.target.value);
                          setOption("CUSTOM");
                        }}
                        min={0}
                        max={CUSTOM_PRICE_MAX}
                        className="w-16 border-b border-[#15121F] bg-transparent text-center outline-none"
                      />
                      원 ]
                    </span>
                  )}
                </label>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-5 text-center text-[11px] text-[#15121F]/70">
          {plusInterest ? "관심 남겼어요 ✓ 응답은 언제든 바꿀 수 있어요" : "🎁 관심을 남기면 '첫 발견 조각'을 바로 드려요!"}
        </p>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={!canSubmit}
          className="mt-2 w-full rounded-lg border-2 border-[#15121F] bg-[#E8C06A] py-3 font-pixel text-base text-[#15121F] disabled:opacity-40"
        >
          {plusInterest ? "응답 바꾸기" : "관심 있어요"}
        </button>
      </div>
    </div>
  );
}