import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      {/* TODO: Create custom not found page */}
      <Route path="*" element={<div>Not found</div>} />
    </Routes>
  );
}
