import { BrowserRouter, Routes, Route } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import Intro from "./pages/Intro/Intro";
import Terms from "./pages/Terms/Terms";
import KakaoCallback from "./pages/KakaoCallback/KakaoCallback";
import StartCheck from "./pages/StartCheck/StartCheck";
import StartCheckResult from "./pages/StartCheck/StartCheckResult";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home/Home";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Intro />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/oauth/kakao" element={<KakaoCallback />} />
          <Route path="/start-check" element={<StartCheck />} />
          <Route path="/start-check/result" element={<StartCheckResult />} />
          <Route element={<MainLayout />}>
            <Route path="/home" element={<Home />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
