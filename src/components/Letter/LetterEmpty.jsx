import Lumi from "../common/Lumi/Lumi";

export default function LetterEmpty() {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-line bg-ticket px-5 py-8 text-center">
      <Lumi pose="letter" size={110} />
      <p className="mt-3 font-serif text-lg font-bold text-navy">아직 도착한 엽서가 없어요</p>
      <p className="mt-2 text-[13px] leading-6 text-mute break-keep">
        엽서는 매주 월요일 아침에 도착해요.
        <br />
        이번 주 여행을 마치면 루미가 엽서를 보내줄 거예요.
      </p>
    </div>
  );
}