import { useEffect, useState } from "react";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import PlaceHero from "../../components/Map/PlaceHero";
import PlaceTags from "../../components/Map/PlaceTags";
import PlaceInfoTable from "../../components/Map/PlaceInfoTable";
import LumiMessage from "../../components/common/LumiMessage/LumiMessage";
import Button from "../../components/common/Button/Button";
import ConfirmModal from "../../components/common/ConfirmModal/ConfimModal";
import PageLoading from "../../components/common/PageLoading/PageLoading";
import { getLocation } from "../../utils/location";
import { getCategory } from "../../constants/placeCategory";
import { getPlaces, savePlace } from "../../api/places";
import { getTodayQuest } from "../../api/quests";

export default function PlaceDetail() {
  const navigate = useNavigate();
  const { placeId } = useParams();
  const { state } = useLocation();

  // 목록에서 넘겨받은 장소 → 없으면(새로고침 · 주소 직접 입력) 목록을 다시 받아 찾기
  const [place, setPlace] = useState(state?.place ?? null);
  const [notFound, setNotFound] = useState(false);

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [toast, setToast] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (place) return;
    let ignore = false;
    getLocation()
      .then((location) => getPlaces(location))
      .then((places) => {
        if (ignore) return;
        const found = places.find((p) => p.placeId === Number(placeId));
        if (found) setPlace(found);
        else setNotFound(true); // 없는 장소 · 기간이 끝난 프로그램
      })
      .catch(() => {
        if (!ignore) setNotFound(true);
      });
    return () => {
      ignore = true;
    };
  }, [place, placeId]);

  if (notFound) return <Navigate to="/map" replace />;
  if (!place) return <PageLoading />;

  const { label, color } = getCategory(place.category);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(""), 2000);
  };

  // 담기 → 오늘 교체면 홈, 내일 예약이면 안내
  const save = async () => {
    if (saving) return;
    setSaving(true);
    setIsConfirmOpen(false);
    try {
      const location = await getLocation();
      const { result } = await savePlace(place.placeId, location);
      if (result === "REPLACED_TODAY") {
        navigate("/home");
        return;
      }
      showToast("오늘 퀘스트는 끝났어요. 내일 퀘스트로 담아둘게요.");
    } catch (e) {
      if (!e.response || e.response.status >= 500) {
        navigate("/maintenance", { replace: true });
        return;
      }
      if (e.response.status === 404) {
        showToast("지금은 담을 수 없는 장소예요.");
        return;
      }
      showToast("잠시 후 다시 시도해 주세요.");
    } finally {
      setSaving(false);
    }
  };

  // 진행 중인 퀘스트가 있으면 확인창 먼저 (누를 때 오늘 퀘스트 상태 확인)
  const handleSave = async () => {
    if (saving) return;
    try {
      const quest = await getTodayQuest();
      if (quest.status === "IN_PROGRESS") {
        setIsConfirmOpen(true);
        return;
      }
    } catch {
      // 상태를 못 가져와도 담기는 시도 (서버가 판단)
    }
    save();
  };

  return (
    <div className="relative flex flex-1 flex-col bg-bg-page pb-[110px]">
      <PlaceHero place={place} color={color} onBack={() => navigate(-1)} />

      <section className="px-4 pt-5">
        <p className="font-pixel text-sm text-[#E8C06A]">{label}</p>
        <h1 className="mt-1 font-pixel text-2xl text-[#F4EAD5]">
          {place.name}
        </h1>
        <div className="mt-3">
          <PlaceTags place={place} />
        </div>
      </section>

      <div className="px-4 pt-4">
        <PlaceInfoTable place={place} />
      </div>

      {place.description && (
        <p className="px-5 pt-4 text-sm leading-6 text-[#F4EAD5] break-keep">
          {place.description}
        </p>
      )}

      <LumiMessage message="여기 조각이 숨어있대. 담으면 오늘 퀘스트야!" />

      <div className="flex justify-center mt-35">
        <Button
          title={saving ? "담는 중…" : "퀘스트로 담기"}
          onClick={handleSave}
          disabled={saving}
        />
      </div>

      {isConfirmOpen && (
        <ConfirmModal
          title="진행 중인 퀘스트를 바꿀까요?"
          description={
            "지금 하던 퀘스트 대신\n담은 장소가 오늘의 퀘스트가 돼요."
          }
          confirmText="바꾸기"
          onCancel={() => setIsConfirmOpen(false)}
          onConfirm={save}
        />
      )}

      {toast && (
        <div className="fixed bottom-24 left-1/2 z-50 w-[300px] -translate-x-1/2 rounded-full bg-[#15121F]/90 px-6 py-2 text-center text-xs text-[#F4EAD5]">
          {toast}
        </div>
      )}
    </div>
  );
}
