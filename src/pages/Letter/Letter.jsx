import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LetterHeader from "../../components/Letter/LetterHeader";
import LetterPaper from "../../components/Letter/LetterPaper";
import LetterEmpty from "../../components/Letter/LetterEmpty";
import PageLoading from "../../components/common/PageLoading/PageLoading";
import { getLatestLetter } from "../../api/letters";

export default function Letter() {
  const navigate = useNavigate();
  // undefined = 불러오는 중 · null = 편지 없음 (204)
  const [letter, setLetter] = useState(undefined);
  const [error, setError] = useState(false);

  useEffect(() => {
    let ignore = false;
    getLatestLetter()
      .then((data) => {
        if (!ignore) setLetter(data);
      })
      .catch((e) => {
        if (ignore) return;
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
  }, [navigate]);

  if (letter === undefined) return <PageLoading error={error} />;

  return (
    <div className="flex flex-1 flex-col bg-bg-page px-4 pb-8 pt-[27px]">
      <LetterHeader onBack={() => navigate(-1)} />

      <div className="mt-6">
        {letter ? (
          <LetterPaper
            letter={letter}
            nickname={letter.nickname}
            onSelectPlace={(placeId) => navigate(`/map/${placeId}`)}
          />
        ) : (
          <LetterEmpty />
        )}
      </div>
    </div>
  );
}