export default function LetterEmpty() {
  return (
    <div className="rounded-lg border-2 border-[#15121F] bg-[#2B2340] px-5 py-8 text-center">
      <p className="font-pixel text-base text-[#F4EAD5]">
        아직 도착한 편지가 없어요
      </p>
      <p className="mt-2 text-xs leading-5 text-[#B9B0D0] break-keep">
        편지는 매주 월요일 아침에 도착해요.
        <br />
        이번 주 모험을 마치면 루미가 편지를 써줄 거예요.
      </p>
    </div>
  );
}
