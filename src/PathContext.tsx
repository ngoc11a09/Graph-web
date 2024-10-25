import { createContext, useContext, useState, FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface PathContextProps {
  path: number;
  setPath: (path: number) => void;
}

const PathContext = createContext<PathContextProps | undefined>(undefined);

export const PathProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [path, setPath] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    switch (path) {
      case 0:
        navigate("/");
        break;
      case 1:
        navigate("/about");
        break;
      case 2:
        navigate("/more");
        break;
      case 10:
        navigate("/tsp");
        break;
      case 11:
        navigate("/dijkstra");
        break;
      case 12:
        navigate("/dfs");
        break;
      case 13:
        navigate("/mst");
        break;
      case 20:
        navigate("/about/bab");
        break;
      case 21:
        navigate("/about/dijkstra");
        break;
      case 22:
        navigate("/about/dfs");
        break;
      case 23:
        navigate("/about/kruskal");
        break;
      default:
        break;
    }
  }, [path]);

  return (
    <PathContext.Provider value={{ path, setPath }}>
      {children}
    </PathContext.Provider>
  );
};

export const usePath = (): PathContextProps => {
  const context = useContext(PathContext);
  if (!context) {
    throw new Error("usePath must be used within a PathProvider");
  }
  return context;
};
