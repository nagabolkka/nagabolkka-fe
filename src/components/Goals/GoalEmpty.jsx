export default function GoalEmpty({ onGoMyPage }) {
  return (
    <div className="rounded-lg border-2 border-[#15121F] bg-[#2B2340] px-5 py-8 text-center">
      <p className="font-pixel text-base text-[#F4EAD5]">아직 고른 목표가 없어요</p>
      <p className="mt-2 text-xs leading-5 text-[#B9B0D0] break-keep">
        마이페이지에서 목표를 하나 고르면
        <br />
        루미가 4단계로 나눠줄게요.
      </p>
      <button
        type="button"
        onClick={onGoMyPage}
        className="mt-4 cursor-pointer rounded-md border-2 border-[#15121F] bg-[#E8C06A] px-4 py-2 font-pixel text-sm text-[#15121F]"
      >
        목표 고르러 가기
      </button>
    </div>
  );
}