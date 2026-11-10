export default function ChatBubble({ role, text }) {
  const isUser = role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <p
        className={`max-w-[75%] rounded-lg border-2 border-[#15121F] px-3 py-2 text-xs leading-5 text-[#15121F] break-keep ${
          isUser ? "bg-[#E8C06A]" : "bg-[#F4EAD5]"
        }`}
      >
        {text}
      </p>
    </div>
  );
}
