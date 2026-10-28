const VARIANTS = {
  primary: 'bg-gold text-bg-base outline-bg-base',
  kakao: 'bg-[#FEE500] text-bg-base outline-bg-base',
}

const DISABLED = 'bg-bg-raised text-sub/60 outline-transparent cursor-not-allowed'

export default function Button({ variant = 'primary', title, onClick, disabled = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`w-[351px] h-[50px] rounded-[10px] font-pixel font-bold text-base outline-2 ${
        disabled ? DISABLED : `${VARIANTS[variant]} cursor-pointer`
      }`}
    >
      {title}
    </button>
  )
}