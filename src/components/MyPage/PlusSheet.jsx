import { useState } from "react";
import {
  CUSTOM_PRICE_MAX,
  PLUS_FEATURES,
  PRICE_OPTIONS,
} from "../../constants/plus";

export default function PlusSheet({
  plusInterest,
  submitting = false,
  onClose,
  onSubmit,
}) {
  const [option, setOption] = useState(plusInterest?.priceOption ?? null);
  const [customPrice, setCustomPrice] = useState(
    plusInterest?.customPrice?.toString() ?? "",
  );

  const price = Number(customPrice);
  const isCustomValid =
    customPrice !== "" &&
    Number.isInteger(price) &&
    price >= 0 &&
    price <= CUSTOM_PRICE_MAX;
  const canSubmit = option && (option !== "CUSTOM" || isCustomValid);

  const handleSubmit = () => {
    onSubmit({
      priceOption: option,
      customPrice: option === "CUSTOM" ? price : null,
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end bg-navy-deep/55"
      onClick={onClose}
    >
      <div
        className="w-full rounded-t-[22px] bg-ticket px-5 pb-8 pt-3"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto h-1 w-10 rounded-full bg-line" />

        <h2 className="mt-4 font-serif text-xl font-bold text-navy">루미 플러스 · 비즈니스석</h2>
        <p className="mt-1 text-xs text-mute">
          조금 더 깊은 여행을 위한 추가 기능 · 준비 중
        </p>

        <ul className="mt-4 flex flex-col gap-2">
          {PLUS_FEATURES.map(({ title, desc, color }) => (
            <li
              key={title}
              className="flex items-center gap-3 rounded-xl bg-paper px-3 py-2.5"
            >
              <span
                aria-hidden
                className="h-3.5 w-3.5 shrink-0 rounded-full border-2 border-navy"
                style={{ backgroundColor: color }}
              />
              <div>
                <p className="text-sm font-bold text-navy">{title}</p>
                <p className="text-[11px] text-mute">{desc}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-4 border-t border-dashed border-line pt-3">
          <p className="text-xs leading-relaxed text-mute">
            루미 플러스, 어떻게 생각해요?
            <br />
            나중에 생긴다면 어느 정도가 괜찮을지 알려주세요.
          </p>

          <ul className="mt-3 flex flex-col gap-2">
            {PRICE_OPTIONS.map(({ value, label }) => (
              <li key={value}>
                <label className="flex items-center gap-2 text-[13px] text-navy">
                  <input
                    type="radio"
                    name="priceOption"
                    checked={option === value}
                    onChange={() => setOption(value)}
                    className="h-4 w-4 accent-[#1C2A5E]"
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
                        className="w-16 border-b border-navy bg-transparent text-center text-base outline-none"
                      />
                      원 ]
                    </span>
                  )}
                </label>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-5 text-center text-xs text-mute">
          {plusInterest
            ? "관심 남겼어요 ✓ 응답은 언제든 바꿀 수 있어요"
            : "🎁 관심을 남기면 '첫 발견' 특별 도장을 바로 드려요!"}
        </p>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={!canSubmit || submitting}
          className="mt-2 w-full h-12 rounded-xl bg-navy text-base font-bold text-brass cursor-pointer disabled:opacity-40"
        >
          {submitting
            ? "저장하는 중..."
            : plusInterest
              ? "응답 바꾸기"
              : "관심 있어요"}
        </button>
      </div>
    </div>
  );
}