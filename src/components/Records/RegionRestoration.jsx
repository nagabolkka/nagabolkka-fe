import { getRegion } from "../../mocks/regions";

export default function RegionRestoration({ regions }) {
  return (
    <section className="rounded-lg border-2 border-[#15121F] bg-[#2B2340] p-4">
      <h2 className="font-pixel text-sm text-[#F4EAD5]">지역 복원도</h2>

      <ul className="mt-3 flex flex-col gap-3">
        {regions.map(({ stageNo, name, restoration }) => (
          <li key={stageNo} className="grid grid-cols-[5.5rem_1fr_2.5rem] items-center gap-2">
            <span className="text-xs text-[#F4EAD5]">{name}</span>
            <div className="h-3 w-full border-2 border-[#15121F] bg-[#1E1A2E]">
              <div
                className="h-full"
                style={{ width: `${restoration}%`, backgroundColor: getRegion(stageNo).color }}
              />
            </div>
            <span className="text-right font-pixel text-xs text-[#F4EAD5]/60">{restoration}%</span>
          </li>
        ))}
      </ul>
    </section>
  );
}