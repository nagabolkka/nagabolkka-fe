export default function ChoiceChips({ choices, onSelect, disabled = false }) {
  if (choices.length === 0) return null;

  return (
    <ul className="flex flex-wrap gap-2">
      {choices.map((choice) => (
        <li key={choice}>
          <button
            type="button"
            onClick={() => onSelect(choice)}
            disabled={disabled}
            className="cursor-pointer rounded-full border-2 border-[#F2C14E] px-3 py-1.5 text-[11px] text-[#F2C14E] disabled:cursor-not-allowed disabled:opacity-40"
          >
            {choice}
          </button>
        </li>
      ))}
    </ul>
  );
}
