import PlaceMarker from "./PlaceMarker";

// 내 위치가 없으면 성북구 중심
const DEFAULT_CENTER = { lat: 37.5894, lng: 127.0167 };

// 내 위치를 가운데에 두고 보여줄 범위 (위도 · 경도 차이)
const LAT_RANGE = 0.025;
const LNG_RANGE = 0.045;

const clamp = (value) => Math.min(95, Math.max(5, value));

export default function MockMap({ places, center }) {
  const origin = center ?? DEFAULT_CENTER;

  const toPosition = ({ lat, lng }) => ({
    x: clamp(((lng - (origin.lng - LNG_RANGE)) / (LNG_RANGE * 2)) * 100),
    y: clamp(((origin.lat + LAT_RANGE - lat) / (LAT_RANGE * 2)) * 100),
  });

  const me = toPosition(origin);

  return (
    <div className="relative h-[260px] w-full overflow-hidden bg-[#EAF1F6]">
      {/* 블록 · 공원 */}
      <div className="absolute left-[44%] top-[18%] h-[22%] w-[22%] bg-[#E3DCF2]" />
      <div className="absolute left-[74%] top-[18%] h-[22%] w-[24%] bg-[#E3DCF2]" />
      <div className="absolute left-[5%] top-[62%] h-[16%] w-[24%] rounded-lg bg-[#D6EBC8]" />
      <div className="absolute left-[74%] top-[62%] h-[16%] w-[24%] rounded-lg bg-[#D6EBC8]" />

      {/* 도로 */}
      <div className="absolute left-0 top-[12%] h-[5%] w-full bg-white" />
      <div className="absolute left-0 top-[48%] h-[7%] w-full bg-white" />
      <div className="absolute left-[33%] top-0 h-full w-[4%] bg-white" />
      <div className="absolute left-[64%] top-0 h-full w-[3%] bg-white" />

      {/* 하천 */}
      <div className="absolute bottom-0 left-0 h-[8%] w-full bg-[#CDE7F5]" />

      {/* 장소 마커 */}
      {places.map((place) => {
        const { x, y } = toPosition(place);
        return <PlaceMarker key={place.placeId} category={place.category} x={x} y={y} />;
      })}

      {/* 내 위치 */}
      <div
        className="absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-white bg-[#3FAED6] shadow-[0_0_0_6px_rgba(63,174,214,0.25)]"
        style={{ left: `${me.x}%`, top: `${me.y}%` }}
      />
    </div>
  );
}