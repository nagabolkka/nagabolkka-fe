import { BrowserRouter, Routes, Route } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import Intro from "./pages/Intro/Intro";
import Terms from "./pages/Terms/Terms";
import KakaoCallback from "./pages/KakaoCallback/KakaoCallback";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Intro />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/oauth/kakao" element={<KakaoCallback />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}