import { BrowserRouter, Routes, Route } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import Intro from "./pages/Intro/Intro";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Intro />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}