export default function ChoiceChips({ choices, onSelect, disabled = false }) {
  if (choices.length === 0) return null;

  return (
    <ul className="flex flex-wrap gap-x-2 gap-y-3">
      {choices.map((choice) => (
        <li key={choice}>
          <button
            type="button"
            onClick={() => onSelect(choice)}
            disabled={disabled}
            className="cursor-pointer rounded-full border border-dashed border-navy bg-white px-3 py-1.5 text-xs font-semibold text-navy disabled:cursor-not-allowed disabled:opacity-40"
          >
            {choice}
          </button>
        </li>
      ))}
    </ul>
  );
}