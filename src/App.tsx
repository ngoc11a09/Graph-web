import { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TSPPage from "./pages/TSPPage";
import DijkstraPage from "./pages/DijkstraPage";
import DFSPage from "./pages/DFSPage";
import Layout from "./pages/Layout";
import About from "./pages/About";
import More from "./pages/More";

const App = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="tsp" element={<TSPPage />} />
          <Route path="dijkstra" element={<DijkstraPage />} />
          <Route path="dfs" element={<DFSPage />} />
          <Route path="about" element={<About />} />
          <Route path="more" element={<More />} />

          <Route path="*" element={<div>404</div>} />
        </Route>
      </Routes>
    </Suspense>
  </Router>
);

export default App;
