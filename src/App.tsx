import { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TSPPage from "./pages/TSPPage";
import DijkstraPage from "./pages/DijkstraPage";

const App = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tsp" element={<TSPPage />} />
        <Route path="/dijkstra" element={<DijkstraPage />} />
      </Routes>
    </Suspense>
  </Router>
);

export default App;
