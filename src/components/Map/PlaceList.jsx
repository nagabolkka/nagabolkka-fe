import PlaceCard from "./PlaceCard";

export default function PlaceList({ places }) {
  if (places.length === 0) {
    return (
      <p className="py-10 text-center text-xs text-[#B9B0D0]">
        조건에 맞는 장소가 없어요.
        <br />
        필터를 하나씩 풀어볼까요?
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-[17px]">
      {places.map((place) => (
        <li key={place.placeId}>
          <PlaceCard place={place} />
        </li>
      ))}
    </ul>
  );
}