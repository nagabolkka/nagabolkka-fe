import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import MapHeader from "../../components/Map/MapHeader";
import KakaoMap from "../../components/Map/KakaoMap";
import CategoryTabs from "../../components/Map/CategoryTabs";
import FilterChips from "../../components/Map/FilterChips";
import PlaceList from "../../components/Map/PlaceList";
import PageLoading from "../../components/common/PageLoading/PageLoading";
import { getPlaces } from "../../api/places";
import { NEAR_DISTANCE_M } from "../../constants/placeCategory";
import LocationBanner from "../../components/common/LocationBanner/LocationBanner";
import { getLocation, getLocationStatus } from "../../utils/location";

export default function Map() {
  const navigate = useNavigate();
  const [allPlaces, setAllPlaces] = useState(null);
  const [center, setCenter] = useState(null); // 내 위치 (없으면 지도가 성북구 중심)
  const [error, setError] = useState(false);
  const [locationStatus, setLocationStatus] = useState(null);
  const [category, setCategory] = useState("ALL");
  const [filters, setFilters] = useState({
    free: false,
    solo: false,
    near: false,
  });

  useEffect(() => {
    let ignore = false;
    getLocation()
      .then((location) => {
        if (!ignore) {
          setCenter(location);
          setLocationStatus(getLocationStatus());
        }
        return getPlaces(location);
      })
      .then((places) => {
        if (!ignore) setAllPlaces(places);
      })
      .catch((e) => {
        if (ignore) return;
        if (e.response?.data?.code === "ONBOARDING_REQUIRED") {
          navigate("/start-check", { replace: true });
          return;
        }
        // 응답 없음 · 500번대 → 점검 화면
        if (!e.response || e.response.status >= 500) {
          navigate("/maintenance", { replace: true });
          return;
        }
        setError(true);
      });
    return () => {
      ignore = true;
    };
  }, [navigate]);

  // 탭 · 필터 : 받은 목록에서 바로 거름 (요청 없음)
  const places = useMemo(
    () =>
      (allPlaces ?? []).filter(
        (place) =>
          (category === "ALL" || place.category === category) &&
          (!filters.free || place.isFree) &&
          (!filters.solo || place.soloOk) &&
          (!filters.near || place.distanceM <= NEAR_DISTANCE_M),
      ),
    [allPlaces, category, filters],
  );

  // 목록 · 지도 마커 공통 : 상세로 (장소 데이터를 같이 넘김)
  const openPlace = useCallback(
    (placeId) =>
      navigate(`/map/${placeId}`, {
        state: { place: allPlaces?.find((p) => p.placeId === placeId) },
      }),
    [navigate, allPlaces],
  );

  // 위치 다시 묻기 → 받으면 지도 가운데 · 장소 목록을 그 위치로
  const retryLocation = async () => {
    const location = await getLocation();
    setLocationStatus(getLocationStatus());
    if (!location) return;
    setCenter(location);
    try {
      setAllPlaces(await getPlaces(location));
    } catch {
      // 실패하면 지금 목록 그대로
    }
  };

  if (!allPlaces) return <PageLoading error={error} />;

  const toggleFilter = (key) =>
    setFilters((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="flex flex-col pb-6">
      <MapHeader />
      <LocationBanner status={locationStatus} onRetry={retryLocation} />
      <KakaoMap places={places} center={center} onSelect={openPlace} />

      <div className="flex flex-col gap-2 px-4 pt-4">
        <CategoryTabs value={category} onChange={setCategory} />
        <FilterChips filters={filters} onToggle={toggleFilter} />
      </div>

      <div className="px-4 pt-4">
        <PlaceList places={places} onSelect={openPlace} />
      </div>
    </div>
  );
}
