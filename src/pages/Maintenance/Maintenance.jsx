import { useNavigate } from "react-router-dom";
import Button from "../../components/common/Button/Button";
import Lumi from "../../components/common/Lumi/Lumi";

export default function Maintenance() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-sky-paper px-6">
      <Lumi pose="sleepy" size={130} className="animate-drift" />

      <h1 className="mt-3 text-center font-serif text-[22px] font-bold leading-8 text-navy">
        기장 루미가
        <br />
        비행기를 정비하고 있어요
      </h1>
      <p className="mt-2 text-center text-[13px] text-mute break-keep">
        곧 다시 열려요. 모은 도장과 기록은 그대로 안전하게 보관돼 있어요.
      </p>

      <div className="mt-6 w-full flex justify-center">
        <Button title="다시 시도" onClick={() => navigate("/home", { replace: true })} />
      </div>
    </div>
  );
}