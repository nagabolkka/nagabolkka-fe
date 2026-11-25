export default function TypingBubble() {
  return (
    <div className="flex justify-start pl-9">
      <div
        className="flex items-center gap-1 rounded-2xl rounded-bl-md border border-line bg-white px-3.5 py-3"
        aria-label="답변 입력 중"
      >
        {[0, 150, 300].map((delay) => (
          <span
            key={delay}
            className="h-1.5 w-1.5 animate-bounce rounded-full bg-mute"
            style={{ animationDelay: `${delay}ms` }}
          />
        ))}
      </div>
    </div>
  );
}