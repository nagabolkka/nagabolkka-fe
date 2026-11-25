import InkStamp from "../common/Stamp/InkStamp";

const SHAPES = ["circle", "rect", "star"];
const SLAM_START = 350; // 화면이 뜨고 잠깐 뒤에 쾅
const SLAM_GAP = 450; // 도장이 여러 개면 하나씩 차례로

// 여권 페이지에 찍힌 입국 도장 (잉크 = 기분 색)
export default function PieceFound({ pieces, color, islandName, moodLabel }) {
  const today = new Date();
  const date = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, "0")}.${String(today.getDate()).padStart(2, "0")}`;

  return (
    <section className="flex flex-col items-center pt-14">
      <p className="label-en text-sm text-brass tracking-[0.3em]">STAMPED!</p>
      <h1 className="mt-1 font-serif text-[26px] font-bold text-white">{islandName} 입국 완료</h1>

      <div
        className="relative mt-5 w-full max-w-[300px] rounded-xl bg-paper px-4 py-6 shadow-[0_10px_24px_rgba(0,0,0,0.4)] animate-paper-thud motion-reduce:animate-none"
        style={{ animationDelay: `${SLAM_START}ms` }}
      >
        <div className="flex flex-wrap items-center justify-center gap-1">
          {pieces.map(({ id, name }, i) => (
            <InkStamp
              key={id}
              top={islandName}
              title={name}
              sub={date}
              color={color}
              shape={SHAPES[i % SHAPES.length]}
              rotate={i % 2 ? 8 : -10}
              size={pieces.length > 1 ? 120 : 190}
              slam
              delay={SLAM_START + i * SLAM_GAP}
            />
          ))}
        </div>
        {pieces.some((p) => p.isNew) && (
          <span className="absolute right-3 top-3 rounded-full bg-stamp-red px-2 py-0.5 text-[10px] font-bold text-white">
            NEW
          </span>
        )}
      </div>

      {moodLabel && (
        <p className="mt-3 text-sm text-mute-on-navy">쾅! 「{moodLabel}」 색으로 찍혔어요</p>
      )}
    </section>
  );
}