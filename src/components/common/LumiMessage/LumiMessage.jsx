import Lumi from "../Lumi/Lumi";

export default function LumiMessage({ message, pose = "salute", dark = false, className = "" }) {
  return (
    <div className={`flex items-center gap-2 px-4 mt-2.5 ${className}`}>
      <Lumi pose={pose} bust={pose === "salute" || pose === "passenger"} size={40} decorative className="shrink-0" />
      <div
        className={`relative flex-1 min-w-0 rounded-2xl px-3.5 py-2.5 ${
          dark ? "bg-navy-2 text-paper" : "bg-ticket text-navy border border-line"
        }`}
      >
        <p className="text-[13px] font-semibold leading-5 break-keep">{message}</p>
      </div>
    </div>
  );
}