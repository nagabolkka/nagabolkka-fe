export default function GuideLumi({ message }) {
  return (
    <div className="relative mt-8">
      <span className="absolute -top-3 left-[19px] rounded-[5px] border border-bg-base bg-gold px-[11px] py-[3px] font-pixel text-sm text-bg-base">
        루미
      </span>
      <div className="rounded-[10px] border-2 border-cream bg-bg-dialog px-[19px] pb-4 pt-5">
        <p className="font-sans text-sm font-medium leading-5 text-cream break-keep">
          {message}
        </p>
      </div>
    </div>
  );
}