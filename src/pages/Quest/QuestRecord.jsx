import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MoodSelector from "../../components/Quest/MoodSelector";
import ReflectionInput from "../../components/Quest/ReflectionInput";
import Button from "../../components/common/Button/Button";
import backButton from "../../assets/images/backButton.svg";
import useTodayQuest from "../../hooks/useTodayQuest";
import {
  completeTodayQuest,
  canGetRestPiece,
} from "../../utils/adventureStorage";
import useQuest from "../../hooks/useQuest";

export default function QuestRecord() {
  const navigate = useNavigate();
  const { mission, defaultMissionId } = useTodayQuest();
  const { mission: serverMission } = useQuest();
  const [mood, setMood] = useState(null);
  const [reflection, setReflection] = useState("");

  const handleSubmit = () => {
    completeTodayQuest(defaultMissionId, { mood, reflection });
    navigate("/quest/result", { replace: true }); // 뒤로가기로 기록 화면에 다시 안 오도록
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* 상단 */}
      <header className="mt-6 flex items-center gap-2 pl-2.5">
        <img
          src={backButton}
          onClick={() => navigate(-1)}
          className="cursor-pointer"
        />
        <p className="text-[#F4EAD5] text-sm font-normal font-pixel">
          모험 기록
        </p>
      </header>

      <section className="flex flex-col mt-2.5 pl-[22px]">
        <p className="text-[#F2C14E] text-xs font-normal leading-8 font-pixel">
          {serverMission?.title ?? mission.title}
        </p>
        <h1 className="text-[#F4EAD5] text-xl font-normal leading-8 font-pixel">
          다녀와서 기분이 어땠어?
        </h1>
      </section>

      <div className="pl-[22px] pr-[26px]">
        <MoodSelector selected={mood} onSelect={setMood} />
      </div>

      <ReflectionInput
        value={reflection}
        onChange={setReflection}
        showRestPieceGuide={canGetRestPiece()}
      />

      {/* 하단 버튼 */}
      <div className="mt-auto pt-6 pb-8 flex justify-center">
        <Button
          title="기록하고 조각 받기"
          disabled={!mood}
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
}
