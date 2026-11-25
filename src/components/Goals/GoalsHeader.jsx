import BackHeader from "../common/BackHeader/BackHeader";

export default function GoalsHeader({ onBack, title = "나의 꿈 준비", label = "DREAM · 꿈의 섬" }) {
  return <BackHeader title={title} label={label} onBack={onBack} />;
}