import Lumi from "../common/Lumi/Lumi";

export default function ChatBubble({ role, text }) {
  const isUser = role === "user";

  return (
    <div className={`flex items-end gap-1.5 ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && <Lumi pose="salute" bust size={30} decorative className="shrink-0" />}
      <p
        className={`max-w-[75%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-5 break-keep ${
          isUser ? "bg-navy text-white rounded-br-md" : "bg-white text-navy border border-line rounded-bl-md"
        }`}
      >
        {text}
      </p>
    </div>
  );
}