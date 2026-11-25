import Lumi from "../common/Lumi/Lumi";

export default function GuideLumi({ message, pose = "salute" }) {
  return (
    <div className="mt-6 flex items-center gap-2">
      <Lumi pose={pose} size={62} decorative className="shrink-0" />
      <div className="flex-1 rounded-2xl bg-navy px-4 py-3">
        <p className="text-sm font-semibold leading-5 text-white break-keep">{message}</p>
      </div>
    </div>
  );
}