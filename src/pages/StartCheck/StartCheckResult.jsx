import { useState } from "react";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import Button from "../../components/common/Button/Button";
import Ticket from "../../components/common/Ticket/Ticket";
import Lumi from "../../components/common/Lumi/Lumi";
import { getStartIsland } from "../../utils/startCheckScore";
import { startAdventure } from "../../utils/adventureStorage";
import { submitStartCheck } from "../../api/onboarding";

const SEONGBUK_DISTRICT_ID = 1;

// 시작 체크 결과 = 첫 섬 탑승권 (목표는 나 탭에서 나중에)
export default function StartCheckResult() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const answers = state?.answers;
  if (!answers) return <Navigate to="/start-check" replace />;

  const { score, island } = getStartIsland(answers);

  const handleStart = async () => {
    if (submitting) return;
    setSubmitting(true);
    try {
      const data = await submitStartCheck({
        answers,
        districtId: SEONGBUK_DISTRICT_ID,
      });

      startAdventure({
        stageNo: data.region.stageNo,
        goalId: data.goal?.goalId ?? null,
      });
      navigate("/guide?first=1", { replace: true }); // 첫 모험 → 사용법 안내 → 홈
    } catch (error) {
      const code = error.response?.data?.code;
      if (code === "ONBOARDING_ALREADY_DONE") {
        // 이미 시작 체크를 마친 계정은 홈으로 이동
        navigate("/home", { replace: true });
        return;
      }
      alert("저장하지 못했어요. 잠시 후 다시 시도해 주세요.");
      setSubmitting(false);
    }
  };

  return (
    <div className="relative flex-1 flex flex-col bg-navy pb-10">
      <div className="flex items-center gap-2 px-5 pt-6">
        <Lumi pose="salute" size={48} decorative />
        <div>
          <p className="label-en text-[11px] text-brass">BOARDING PASS ISSUED</p>
          <h1 className="font-serif text-[22px] font-bold text-white">첫 여행지가 정해졌어요</h1>
        </div>
      </div>

      <Ticket
        className="mx-4 mt-4"
        color={island.color}
        accent={island.dark}
        flight={island.flight}
        badge="1st FLIGHT"
        from={{ code: "ROOM", label: "내 방" }}
        to={{ code: island.code, label: island.name }}
        stub={
          <div>
            <p className="label-en text-[11px] text-navy">
              {island.flight} · ROOM → {island.code}
            </p>
            <p className="mt-1 text-[11px] text-mute">이 표 한 장이면 충분해요</p>
            <svg width="300" height="40" aria-hidden className="mt-2 max-w-full">
              {Array.from({ length: 60 }, (_, i) => (
                <rect key={i} x={i * 5} y="0" width={[1, 2, 1, 3, 1, 2, 2][i % 7]} height="40" fill="#1C2A5E" />
              ))}
            </svg>
          </div>
        }
      >
        <dl className="mt-3 pt-3 border-t border-line grid grid-cols-3 gap-y-3 gap-x-2">
          <Info label="PASSENGER / 탑승객" value="새 모험가" />
          <Info label="ISLAND / 섬" value={island.name} />
          <Info label="POWER / 힘" value={island.power} />
          <Info label="CHECK / 점수" value={`${score}점`} />
          <Info label="BOARDING / 탑승" value="오늘" />
          <Info label="SEAT / 좌석" value="1A" />
        </dl>
        <p
          className="mt-3 rounded-xl px-3 py-2.5 text-xs leading-5 break-keep"
          style={{ backgroundColor: `${island.color}2E`, color: island.dark }}
        >
          {island.lumiLine}
        </p>
      </Ticket>

      <p className="mt-4 px-6 text-center text-xs text-mute-on-navy break-keep">
        섬은 지금 안개에 덮여 있어요. 다녀올 때마다 불이 하나씩 켜져요.
        <br />
        꿈 준비(목표)는 나 탭에서 언제든 정할 수 있어요.
      </p>

      <div className="mt-auto pt-6 flex justify-center">
        <Button
          variant="gold"
          title={submitting ? "탑승 준비 중…" : "✈  탑승하기"}
          disabled={submitting}
          onClick={handleStart}
        />
      </div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className="min-w-0">
      <dt className="text-[9px] text-mute">{label}</dt>
      <dd className="mt-0.5 text-[14px] font-bold text-navy break-keep">{value}</dd>
    </div>
  );
}