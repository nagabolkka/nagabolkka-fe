import { useEffect, useRef } from "react";
import ChatBubble from "./ChatBubble";
import TypingBubble from "./TypingBubble";

export default function ChatList({ messages, isTyping }) {
  const endRef = useRef(null);

  // 새 말풍선 · 입력 중 표시가 생기면 맨 아래로
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4">
      <ul className="flex flex-col gap-3">
        {messages.map((message, i) => (
          <li key={i}>
            <ChatBubble role={message.role} text={message.text} />
          </li>
        ))}
        {isTyping && (
          <li>
            <TypingBubble />
          </li>
        )}
      </ul>
      <div ref={endRef} />
    </div>
  );
}
