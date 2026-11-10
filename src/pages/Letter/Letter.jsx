import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import LetterHeader from "../../components/Letter/LetterHeader";
import LetterPaper from "../../components/Letter/LetterPaper";
import LetterEmpty from "../../components/Letter/LetterEmpty";
import { getLatestLetter } from "../../mocks/letter";
import { loadUser } from "../../utils/userStorage";

export default function Letter() {
  const navigate = useNavigate();
  const letter = useMemo(() => getLatestLetter(), []);
  const { nickname } = loadUser();

  return (
    <div className="flex flex-1 flex-col bg-bg-page px-4 pb-8 pt-[27px]">
      <LetterHeader onBack={() => navigate(-1)} />

      <div className="mt-6">
        {letter ? (
          <LetterPaper
            letter={letter}
            nickname={nickname}
            onSelectPlace={(placeId) => navigate(`/map/${placeId}`)}
          />
        ) : (
          <LetterEmpty />
        )}
      </div>
    </div>
  );
}
