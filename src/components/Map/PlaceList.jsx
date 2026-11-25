import PlaceCard from "./PlaceCard";

export default function PlaceList({ places, onSelect }) {
  if (places.length === 0) {
    return (
      <p className="py-10 text-center text-[13px] leading-6 text-mute">
        조건에 맞는 장소가 없어요.
        <br />
        필터를 하나씩 풀어볼까요?
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-2.5">
      {places.map((place) => (
        <li key={place.placeId}>
          <PlaceCard place={place} onClick={() => onSelect(place.placeId)} />
        </li>
      ))}
    </ul>
  );
}