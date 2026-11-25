import salute from "../../../assets/lumi/lumi-salute.svg";
import wave from "../../../assets/lumi/lumi-wave.svg";
import cheer from "../../../assets/lumi/lumi-cheer.svg";
import thumb from "../../../assets/lumi/lumi-thumb.svg";
import worried from "../../../assets/lumi/lumi-worried.svg";
import sleepy from "../../../assets/lumi/lumi-sleepy.svg";
import stamp from "../../../assets/lumi/lumi-stamp.svg";
import fly from "../../../assets/lumi/lumi-fly.svg";
import letter from "../../../assets/lumi/lumi-letter.svg";
import passenger from "../../../assets/lumi/lumi-passenger.svg";
import saluteBust from "../../../assets/lumi/lumi-salute-bust.svg";
import passengerBust from "../../../assets/lumi/lumi-passenger-bust.svg";

// 기장 루미 포즈
const POSES = {
  salute: { src: salute, bust: saluteBust, label: "경례하는 기장 루미" },
  wave: { src: wave, label: "손 흔드는 기장 루미" },
  cheer: { src: cheer, label: "기뻐하는 기장 루미" },
  thumb: { src: thumb, label: "응원하는 기장 루미" },
  worried: { src: worried, label: "걱정하는 기장 루미" },
  sleepy: { src: sleepy, label: "쉬고 있는 기장 루미" },
  stamp: { src: stamp, label: "도장을 든 기장 루미" },
  fly: { src: fly, label: "비행 중인 기장 루미" },
  letter: { src: letter, label: "엽서를 든 기장 루미" },
  passenger: { src: passenger, bust: passengerBust, label: "루미" },
};

export default function Lumi({ pose = "salute", size = 120, bust = false, decorative = false, className = "" }) {
  const item = POSES[pose] ?? POSES.salute;
  const useBust = bust && item.bust;
  const src = useBust ? item.bust : item.src;
  const height = Math.round(size * (useBust ? 154 / 140 : 220 / 200));

  return (
    <img
      src={src}
      alt={decorative ? "" : item.label}
      width={size}
      height={height}
      draggable={false}
      className={`select-none ${className}`}
    />
  );
}