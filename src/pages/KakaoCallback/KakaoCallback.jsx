import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { kakaoLogin } from "../../api/auth";
import { TOKEN_KEY } from "../../api/api";
import { KAKAO_REDIRECT_URI, takeConsents } from "../../utils/kakao";

export default function KakaoCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const requested = useRef(false); // StrictMode 에서 useEffect 가 두 번 돌아도 한 번만 요청 

  useEffect(() => {
    if (requested.current) return;
    requested.current = true;

    const code = searchParams.get("code");
    if (!code) {
      // 카카오 화면에서 "취소" 를 누른 경우 (?error=access_denied)
      navigate("/terms", { replace: true });
      return;
    }

    kakaoLogin({
      code,
      redirectUri: KAKAO_REDIRECT_URI,
      consents: takeConsents(),
    })
      .then((data) => {
        localStorage.setItem(TOKEN_KEY, data.accessToken);
        navigate("/home", { replace: true });
      })
      .catch((error) => {
        const errorCode = error.response?.data?.code;
        if (errorCode === "TERMS_REQUIRED") {
          alert("처음 오셨네요! 약관에 먼저 동의해 주세요.");
          navigate("/terms", { replace: true });
        } else {
          alert("로그인에 실패했어요. 다시 시도해 주세요.");
          navigate("/", { replace: true });
        }
      });
  }, [navigate, searchParams]);

  return (
    <div className="flex-1 flex items-center justify-center">
      <p className="font-pixel text-[#F4EAD5]">루미가 문을 여는 중...</p>
    </div>
  );
}