export default function QuestMap({ mission }) {
  const guide = mission.isIndoor
    ? "집 안에서 할 수 있어요."
    : `${mission.placeName}까지 다녀와요.`;

  return (
    <section className="relative mx-3 mt-3 h-[145px] rounded-xl border-[3px] border-[#15121F] bg-[#3D3A4E] overflow-hidden">
      {/* 위치 점 */}
      <div className="absolute left-[30%] top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#5B8FD6]/30 flex items-center justify-center">
        <div className="w-4 h-4 rounded-full bg-[#4A92D0] border-[3px] border-white" />
      </div>

      {/* 안내 문구 */}
      <p className="absolute right-3 bottom-2.5 text-[#B9B0D0] text-sm font-medium font-sans">
        {guide}
      </p>
    </section>
  );
}
