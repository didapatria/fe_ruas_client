import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import WelcomePage from "./pages/WelcomePage";
import DetectPage from "./pages/DetectPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/detect" element={<DetectPage />} />
      </Routes>
    </Router>
  );
};

export default App;
