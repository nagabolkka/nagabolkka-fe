import { BrowserRouter, Routes, Route } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import Intro from "./pages/Intro/Intro";
import Terms from "./pages/Terms/Terms";
import KakaoCallback from "./pages/KakaoCallback/KakaoCallback";
import StartCheck from "./pages/StartCheck/StartCheck";
import StartCheckResult from "./pages/StartCheck/StartCheckResult";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home/Home";
import QuestDetail from "./pages/Quest/QuestDetail";
import QuestSplit from "./pages/Quest/QuestSplit";
import QuestProgress from "./pages/Quest/QuestProgress";
import QuestRecord from "./pages/Quest/QuestRecord";
import QuestResult from "./pages/Quest/QuestResult";
import Maintenance from "./pages/Maintenance/Maintenance";
import Admin from "./pages/Admin/Admin";
import Records from "./pages/Records/Records";

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
          <Route path="/quest" element={<QuestDetail />} />
          <Route path="/quest/progress" element={<QuestProgress />} />
          <Route path="/quest/split" element={<QuestSplit />} />
          <Route path="/quest/record" element={<QuestRecord />} />
          <Route path="/quest/result" element={<QuestResult />} />
          <Route path="/maintenance" element={<Maintenance />} />
          <Route path="/admin" element={<Admin />} />
          <Route element={<MainLayout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/records" element={<Records />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
