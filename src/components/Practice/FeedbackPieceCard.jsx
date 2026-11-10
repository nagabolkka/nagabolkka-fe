import Badge from "../common/Badge/Badge";

export default function FeedbackPieceCard({ name, regionName, color, isNew }) {
  return (
    <div className="flex items-center gap-4 rounded-lg border-2 border-[#15121F] bg-[#F4EAD5] px-4 py-3">
      <div
        className="ml-1 h-6 w-6 shrink-0 rotate-45 border-2 border-[#15121F]"
        style={{ backgroundColor: color }}
      />
      <div>
        <div className="flex items-center gap-2">
          <p className="font-pixel text-base text-[#15121F]">{name} 획득</p>
          {isNew && (
            <Badge size="sm" bgColor={color} textColor="#2B2340">
              NEW
            </Badge>
          )}
        </div>
        <p className="mt-0.5 text-[11px] text-[#6B5E4A]">
          {regionName} · 도감에 기록됐어요
        </p>
      </div>
    </div>
  );
}
