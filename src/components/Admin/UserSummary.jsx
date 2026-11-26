import StatTile from "./StatTile";

export default function UserSummary({ summary }) {
  return (
    <section className="grid grid-cols-3 gap-2">
      <StatTile en="PASSENGERS" label="탑승객" value={summary.totalUsers} unit="명" />
      <StatTile en="ARRIVAL" label="평균 도착률" value={summary.avgAchievementRate} unit="%" />
      <StatTile en="PLUS" label="플러스 관심" value={summary.plusInterest.total} unit="명" />
    </section>
  );
}