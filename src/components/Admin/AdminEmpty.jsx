import Lumi from "../common/Lumi/Lumi";

export default function AdminEmpty({ title, description, children }) {
  return (
    <div className="flex flex-col items-center rounded-2xl border-[1.5px] border-dashed border-mute-on-navy/35 px-6 py-8 text-center">
      <Lumi pose="salute" size={70} decorative />
      <p className="label-en mt-2 text-[10px] text-brass">EMPTY GATE</p>
      <p className="mt-1 font-serif text-[17px] font-bold text-white">{title}</p>
      {description && (
        <p className="mt-1.5 whitespace-pre-line text-xs leading-[18px] text-mute-on-navy">{description}</p>
      )}
      {children}
    </div>
  );
}