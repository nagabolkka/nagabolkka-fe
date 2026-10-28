import checkIcon from "../../assets/icons/check_icon.png";

export default function CheckBox({ checked, onChange, label }) {
  return (
    <label className="flex items-center gap-[7px] cursor-pointer select-none">

      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />

      <span
        className={`flex size-5 items-center justify-center rounded-sm border border-black ${
          checked ? 'bg-[#F2C14E]' : 'bg-white'
        }`}
      >
        {checked && (
          <img src={checkIcon} />
        )}
      </span>

      {label && <span className="font-pixel text-sm text-[#2B2340]">{label}</span>}
    </label>
  )
}