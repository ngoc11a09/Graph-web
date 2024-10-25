import { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TSPPage from "./pages/TSPPage";
import DijkstraPage from "./pages/DijkstraPage";
import DFSPage from "./pages/DFSPage";
import Layout from "./pages/Layout";
import About from "./pages/About";
import More from "./pages/More";
import MSTPage from "./pages/MSTPage";
import BranchAndBound from "./pages/about_algorithms/BranchAndBound";
import Dfs from "./pages/about_algorithms/Dfs";
import Dijkstra from "./pages/about_algorithms/Dijkstra";
import Kruskal from "./pages/about_algorithms/Kruskal";

const App = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="tsp" element={<TSPPage />} />
          <Route path="dijkstra" element={<DijkstraPage />} />
          <Route path="dfs" element={<DFSPage />} />
          <Route path="mst" element={<MSTPage />} />
          <Route path="about" element={<About />} />
          <Route path="about/bab" element={<BranchAndBound />}></Route>
          <Route path="about/dijkstra" element={<Dijkstra />}></Route>
          <Route path="about/dfs" element={<Dfs />}></Route>
          <Route path="about/kruskal" element={<Kruskal />}></Route>
          <Route path="more" element={<More />} />

          <Route path="*" element={<div>404</div>} />
        </Route>
      </Routes>
    </Suspense>
  </Router>
);

export default App;
