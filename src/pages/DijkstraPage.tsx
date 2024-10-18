import FormInput from "../components/FormInput";
import Graph from "../components/Graph";
import { useEffect, useRef, useState } from "react";
import { OptionalInputType } from "../types/InputType";
import { Dijkstra } from "../algorithms/Dijkstra";

export default function DijkstraPage() {
  const [inputValue, setInputValue] = useState<OptionalInputType>();
  const [outputValue, setOutputValue] = useState<Array<number>>();
  const [totalCost, setTotalCost] = useState(0);
  const [isDigraph, setIsDigraph] = useState(false);

  const temp = useRef<number>(0);

  useEffect(() => {
    if (inputValue) {
      const dijkstra = new Dijkstra(
        inputValue.n,
        inputValue.start,
        inputValue.arr
      );
      const res = dijkstra.dijkstra();
      setOutputValue(res.path);
      setTotalCost(res.totalCost);
    }
  }, [inputValue]);

  const handleInputChange = (value: OptionalInputType) => {
    setInputValue(value);
    temp.current++;
  };

  return (
    <>
      <div
        onClick={() => {
          setIsDigraph(!isDigraph);
        }}
      >
        {isDigraph ? "Co huong" : "Vo huong"}
      </div>
      <FormInput
        setInputValue={handleInputChange}
        setIsDigraph={setIsDigraph}
        isDigraph={isDigraph}
      />
      <div>The result is {totalCost}</div>
      {inputValue && (
        <div className="input-graph" key={temp.current}>
          <Graph inputValue={inputValue} isDigraph={isDigraph} />
          <Graph
            inputValue={inputValue}
            outputValue={outputValue}
            isDigraph={isDigraph}
            algo="Dijkstra"
          />
        </div>
      )}
    </>
  );
}
