import { useState } from "react";
import { useNavigate } from "react-router-dom";
import OptionButton from "../../components/StartCheck/OptionButton";
import QuestionHeader from "../../components/StartCheck/QuestionHeader";
import ProgressBar from "../../components/StartCheck/ProgressBar";
import { START_CHECK_QUESTIONS } from "../../constants/startCheck";

const LABELS = ["A", "B", "C", "D"];
const TOTAL = START_CHECK_QUESTIONS.length;

export default function StartCheck() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [isFading, setIsFading] = useState(false);

  const current = START_CHECK_QUESTIONS[step];

  const handleSelect = (index) => {
    if (isFading) return;

    const next = [...answers];
    next[step] = index;
    setAnswers(next);

    // 마지막 문항 → 결과 화면으로
    if (step === TOTAL - 1) {
      navigate("/start-check/result", { state: { answers: next } });
      return;
    }

    setIsFading(true);
    setTimeout(() => {
      setStep((s) => s + 1);
      setIsFading(false);
    }, 200);
  };

  const handleBack = () => {
    if (isFading) return;

    if (step === 0) {
      navigate(-1);
      return;
    }
    setStep((s) => s - 1);
  };

  return (
    <div className="flex flex-col">
      <ProgressBar step={step + 1} total={TOTAL} onBack={handleBack} />

      <div
        key={step}
        className={`flex flex-col animate-fade-in transition-opacity duration-200 ${
          isFading ? "opacity-0" : "opacity-100"
        }`}
      >
        <QuestionHeader step={step + 1} question={current.question} />

        <div className="flex flex-col gap-[17px] pl-[25px]">
          {current.options.map((option, index) => (
            <OptionButton
              key={index}
              label={LABELS[index]}
              text={option}
              selected={answers[step] === index}
              onClick={() => handleSelect(index)}
            />
          ))}
        </div>
      </div>

      {/* 안내 문구 */}
      <div className="mt-[366px] flex justify-center text-xs font-medium font-sans leading-4 text-[#B9B0D0]">
        정답은 없어요. 지금 모습 그대로 골라줘.
      </div>
    </div>
  );
}