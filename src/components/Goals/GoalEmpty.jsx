import FloatingIsland from "../common/Island/FloatingIsland";
import Button from "../common/Button/Button";

// 아직 꿈(목표)이 없을 때
export default function GoalEmpty({ onPick }) {
  return (
    <div className="flex flex-col items-center px-2 text-center">
      <FloatingIsland stageNo={5} locked size={170} />
      <p className="mt-2 font-serif text-[21px] font-bold text-navy">아직 방문 목적이 비어 있어요</p>
      <p className="mt-2 text-sm leading-6 text-mute break-keep">
        거창하지 않아도 괜찮아요.
        <br />
        ‘언젠가 해보고 싶은 것’ 하나면 충분해요.
      </p>
      <div className="mt-6">
        <Button title="방문 목적 적으러 가기" onClick={onPick} />
      </div>
    </div>
  );
}