import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import MapHeader from "../../components/Map/MapHeader";
import MockMap from "../../components/Map/MockMap";
import CategoryTabs from "../../components/Map/CategoryTabs";
import FilterChips from "../../components/Map/FilterChips";
import PlaceList from "../../components/Map/PlaceList";
import { getPlaces } from "../../mocks/places";
import { NEAR_DISTANCE_M } from "../../constants/placeCategory";

export default function Map() {
  const allPlaces = useMemo(() => getPlaces(), []);
  const [category, setCategory] = useState("ALL");
  const [filters, setFilters] = useState({
    free: false,
    solo: false,
    near: false,
  });

  const navigate = useNavigate();

  const places = useMemo(
    () =>
      allPlaces.filter(
        (place) =>
          (category === "ALL" || place.category === category) &&
          (!filters.free || place.isFree) &&
          (!filters.solo || place.soloOk) &&
          (!filters.near || place.distanceM <= NEAR_DISTANCE_M),
      ),
    [allPlaces, category, filters],
  );

  const toggleFilter = (key) =>
    setFilters((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="flex flex-col pb-6">
      <MapHeader />
      <MockMap places={places} />

      <div className="flex flex-col gap-2 px-4 pt-4">
        <CategoryTabs value={category} onChange={setCategory} />
        <FilterChips filters={filters} onToggle={toggleFilter} />
      </div>

      <div className="px-4 pt-4">
        <PlaceList
          places={places}
          onSelect={(placeId) => navigate(`/map/${placeId}`)}
        />
      </div>
    </div>
  );
}
