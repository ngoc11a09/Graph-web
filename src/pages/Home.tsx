import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <Link to="/tsp">TSP solver</Link>
      <Link to="/dijkstra">Dijkstra solver</Link>
    </div>
  );
};
export default Home;
