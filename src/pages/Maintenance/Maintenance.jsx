import { useNavigate } from "react-router-dom";
import Button from "../../components/common/Button/Button";
import lumi from "../../assets/icons/lumi_start_check.png";

export default function Maintenance() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <img
        src={lumi}
        className="h-25 w-25 drop-shadow-[0_0_16px_rgba(255,214,120,0.45)] animate-float opacity-80"
      />

      <p className="mt-12 font-pixel font-normal text-sm text-[#F2C14E]">
        잠시 점검 중
      </p>
      <h1 className="mt-4 text-center font-pixel font-normal text-xl leading-8 text-[#F4EAD5]">
        루미가 세상을
        <br />
        손보고 있어요
      </h1>
      <p className="mt-[11px] text-center text-xs font-normal font-sans text-[#B9B0D0]">
        곧 다시 열려요. 모은 조각과 기록은 그대로 안전하게 보관돼 있어요.
      </p>

      <div className="mt-6 w-full flex justify-center">
        <Button
          title="다시 시도"
          onClick={() => navigate("/home", { replace: true })}
        />
      </div>
    </div>
  );
}
