import FormInput from "../components/FormInput";
import Graph from "../components/Graph";
import { useEffect, useRef, useState } from "react";
import { OptionalInputType } from "../types/InputType";
import { DFS } from "../algorithms/DFS";

export default function DFSPage() {
  const [inputValue, setInputValue] = useState<OptionalInputType>();
  const [outputValue, setOutputValue] = useState<Array<number>>();
  const [isDigraph, setIsDigraph] = useState(false);

  const temp = useRef<number>(0);

  useEffect(() => {
    if (inputValue) {
      const dfs = new DFS(inputValue.n, inputValue.start, inputValue.arr);
      const res = dfs.solve();
      setOutputValue(res.path);
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
      {inputValue && (
        <div className="input-graph" key={temp.current}>
          <Graph inputValue={inputValue} isDigraph={isDigraph} />
          <Graph
            inputValue={inputValue}
            outputValue={outputValue}
            isDigraph={isDigraph}
            algo="DFS"
          />
        </div>
      )}
    </>
  );
}
