import { useEffect } from "react";

// 입국 도장 (잉크 색 = 그날 기분) · shape : circle · rect · star · triangle · oval
const SHAPES = {
  circle: (c) => (
    <>
      <circle cx="60" cy="60" r="50" fill="none" stroke={c} strokeWidth="4" />
      <circle cx="60" cy="60" r="40" fill="none" stroke={c} strokeWidth="1.5" />
    </>
  ),
  rect: (c) => (
    <>
      <rect x="10" y="22" width="100" height="76" rx="8" fill="none" stroke={c} strokeWidth="4" />
      <rect x="18" y="30" width="84" height="60" rx="4" fill="none" stroke={c} strokeWidth="1.5" />
    </>
  ),
  triangle: (c) => (
    <>
      <path d="M60 10 L113 104 L7 104 Z" fill="none" stroke={c} strokeWidth="4" strokeLinejoin="round" />
    </>
  ),
  oval: (c) => (
    <>
      <ellipse cx="60" cy="60" rx="56" ry="40" fill="none" stroke={c} strokeWidth="4" />
      <ellipse cx="60" cy="60" rx="46" ry="30" fill="none" stroke={c} strokeWidth="1.5" />
    </>
  ),
  star: (c) => (
    <path
      d="M60 6 L74 30 L102 26 L94 54 L114 74 L86 82 L82 110 L60 94 L38 110 L34 82 L6 74 L26 54 L18 26 L46 30 Z"
      fill="none"
      stroke={c}
      strokeWidth="4"
      strokeLinejoin="round"
    />
  ),
};

export default function InkStamp({
  title,
  sub,
  top,
  color = "#E3A43A",
  shape = "circle",
  rotate = -8,
  size = 110,
  dashed = false,
  slam = false, // true면 쾅 찍히는 애니메이션
  delay = 0, // 여러 개를 차례로 찍을 때 (ms)
  className = "",
}) {
  const draw = SHAPES[shape] ?? SHAPES.circle;
  const dy = shape === "triangle" ? 16 : 0; // 세모는 아래쪽이 넓어서 글자를 조금 내림
  // 글자가 길면 작게
  const titleSize = title && title.length > 5 ? 12 : 16;

  // 찍히는 순간 짧게 진동 (안드로이드만 · 동작 줄이기 설정이면 생략)
  useEffect(() => {
    if (!slam) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setTimeout(() => navigator.vibrate?.(35), delay + 270);
    return () => clearTimeout(timer);
  }, [slam, delay]);

  const stamp = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      role="img"
      aria-label={[top, title, sub].filter(Boolean).join(" ")}
      className={className}
      style={{ opacity: 0.92 }}
    >
      <g transform={`rotate(${rotate} 60 60)`} strokeDasharray={dashed ? "7 6" : undefined}>
        {draw(color)}
        <g fill={color} fontFamily="Pretendard, sans-serif" textAnchor="middle" stroke="none">
          {top && (
            <text x="60" y={44 + dy} fontSize="7" letterSpacing="1.5" fontWeight="700">
              {top}
            </text>
          )}
          {title && (
            <text x="60" y={(top ? 66 : 62) + dy} fontSize={titleSize} fontWeight="800">
              {title}
            </text>
          )}
          {sub && (
            <text x="60" y={(top ? 82 : 80) + dy} fontSize="8">
              {sub}
            </text>
          )}
        </g>
      </g>
    </svg>
  );

  if (!slam) return stamp;

  return (
    <span className="relative inline-flex">
      <span
        aria-hidden
        className="absolute inset-[8%] rounded-full animate-stamp-ink motion-reduce:hidden"
        style={{ backgroundColor: color, animationDelay: `${delay}ms` }}
      />
      <span className="relative inline-flex animate-stamp-slam motion-reduce:animate-none" style={{ animationDelay: `${delay}ms` }}>
        {stamp}
      </span>
    </span>
  );
}