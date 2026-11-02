import lumi from "../../../assets/icons/lumi_start_check.png";

export default function LumiMessage({ message }) {
  return (
    <div className="flex items-center gap-[9px] pl-[14px] mt-2.5">
      <img
        src={lumi}
        className="w-[33px] h-[33px] rounded-full drop-shadow-[0_0_16px_rgba(255,214,120,0.45)]"
      />
      {/* 루미의 메세지 */}
      <div className="w-[312px] h-[34px] bg-[#221E3A] rounded-[5px] border-2 border-[#4A4370] flex items-center pl-[11px] py-2">
        <p className="text-[#F4EAD5] text-xs font-semibold font-sans">
          {message}
        </p>
      </div>
    </div>
  );
}
