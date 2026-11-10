export default function CollectionHeader({ foundCount, total }) {
  return (
    <header className="flex items-end justify-between">
      <div>
        <p className="font-pixel text-xs text-[#F2C14E]">세상의 조각</p>
        <h1 className="mt-1 font-pixel text-xl text-[#F4EAD5]">조각 도감</h1>
      </div>
      <p className="font-pixel font-normal text-sm text-[#B9B0D0]">
        <span className="text-sm font-bold text-[#F4EAD5]">{foundCount}</span> /{" "}
        {total}
      </p>
    </header>
  );
}
