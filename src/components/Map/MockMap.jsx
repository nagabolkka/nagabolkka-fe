import PlaceMarker from "./PlaceMarker";
import { MY_LOCATION } from "../../mocks/places";

// 내 위치를 가운데에 두고 보여줄 범위 (위도 · 경도 차이)
const LAT_RANGE = 0.025;
const LNG_RANGE = 0.045;

const clamp = (value) => Math.min(95, Math.max(5, value));

const toPosition = ({ lat, lng }) => ({
  x: clamp(((lng - (MY_LOCATION.lng - LNG_RANGE)) / (LNG_RANGE * 2)) * 100),
  y: clamp((((MY_LOCATION.lat + LAT_RANGE) - lat) / (LAT_RANGE * 2)) * 100),
});

export default function MockMap({ places }) {
  const me = toPosition(MY_LOCATION);

  return (
    <div className="relative h-[210px] w-full overflow-hidden bg-[#E9E4D4]">
      {/* 블록 · 공원 */}
      <div className="absolute left-[44%] top-[18%] h-[22%] w-[22%] bg-[#DDD3BE]" />
      <div className="absolute left-[74%] top-[18%] h-[22%] w-[24%] bg-[#DDD3BE]" />
      <div className="absolute left-[5%] top-[62%] h-[16%] w-[24%] rounded-sm bg-[#CFE3C2]" />
      <div className="absolute left-[74%] top-[62%] h-[16%] w-[24%] rounded-sm bg-[#CFE3C2]" />

      {/* 도로 */}
      <div className="absolute left-0 top-[12%] h-[5%] w-full bg-[#F7F3EA]" />
      <div className="absolute left-0 top-[48%] h-[7%] w-full bg-[#F7F3EA]" />
      <div className="absolute left-[33%] top-0 h-full w-[4%] bg-[#F7F3EA]" />
      <div className="absolute left-[64%] top-0 h-full w-[3%] bg-[#F7F3EA]" />

      {/* 하천 */}
      <div className="absolute bottom-0 left-0 h-[8%] w-full bg-[#BFD7E6]" />

      {/* 장소 마커 */}
      {places.map((place) => {
        const { x, y } = toPosition(place);
        return <PlaceMarker key={place.placeId} category={place.category} x={x} y={y} />;
      })}

      {/* 내 위치 */}
      <div
        className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-[#4A90E2] shadow"
        style={{ left: `${me.x}%`, top: `${me.y}%` }}
      />
    </div>
  );
}