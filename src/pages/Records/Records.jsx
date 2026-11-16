import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import WeekOuting from "../../components/Records/WeekOuting";
import MonthCalendar from "../../components/Records/MonthCalendar";
import MoodFlow from "../../components/Records/MoodFlow";
import RegionRestoration from "../../components/Records/RegionRestoration";
import PageLoading from "../../components/common/PageLoading/PageLoading";
import { getRecords } from "../../api/records";
import { currentMonth, shiftMonth } from "../../utils/calendar";

export default function Records() {
  const navigate = useNavigate();
  const [month, setMonth] = useState(currentMonth);
  const [records, setRecords] = useState(null);
  const [error, setError] = useState(false);

  // 달이 바뀔 때마다 다시 조회 (이번 주 · 복원도는 같이 옴)
  useEffect(() => {
    let ignore = false;
    getRecords(month)
      .then((data) => {
        if (!ignore) setRecords(data);
      })
      .catch((e) => {
        if (ignore) return;
        const code = e.response?.data?.code;
        if (code === "ONBOARDING_REQUIRED") {
          navigate("/start-check", { replace: true });
          return;
        }
        // 응답 없음 (서버 꺼짐 · 15초 초과) · 500번대 → 점검 화면
        if (!e.response || e.response.status >= 500) {
          navigate("/maintenance", { replace: true });
          return;
        }
        setError(true);
      });
    return () => {
      ignore = true;
    };
  }, [month, navigate]);

  // 처음 불러올 때만 로딩 화면 (달 넘길 땐 이전 화면을 둔 채로 바꿈)
  if (!records) return <PageLoading error={error} />;

  const { thisWeek, month: monthDays, restoration } = records;

  return (
    <div className="flex flex-col gap-4 px-4 pb-6 pt-8">
      <header>
        <p className="font-pixel text-sm text-[#E8C06A]">모험 일지</p>
        <h1 className="mt-1 font-pixel text-2xl text-[#F4EAD5]">
          이번 주 {thisWeek.outingCount}번 다녀왔어요
        </h1>
      </header>

      <WeekOuting days={thisWeek.days} />
      <MonthCalendar
        month={month}
        days={monthDays}
        onPrev={() => setMonth((m) => shiftMonth(m, -1))}
        onNext={() => setMonth((m) => shiftMonth(m, 1))}
      />
      <MoodFlow days={thisWeek.days} />
      <RegionRestoration regions={restoration} />
    </div>
  );
}