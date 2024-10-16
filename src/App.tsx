import "@xyflow/react/dist/style.css";

import "./index.css";
// import BaBTree from "./components/BaBTree";
import FormInput from "./components/FormInput";
import Graph from "./components/Graph";
import { useEffect, useRef, useState } from "react";
import { InputType } from "./types/InputType";
import { TSP } from "./algoritm/TSP";

export default function NodeAsHandleFlow() {
  const [inputValue, setInputValue] = useState<InputType>();
  const [outputValue, setOutputValue] = useState<Array<number>>();
  const [totalCost, setTotalCost] = useState(0);
  const temp = useRef<number>(0);

  useEffect(() => {
    if (inputValue) {
      if (inputValue) {
        const tsp = new TSP(inputValue.n, inputValue.start, inputValue.arr);
        const res = tsp.solver();
        setOutputValue(res.path);
        setTotalCost(res.totalCost);
      }
    }
  }, [inputValue]);

  const handleInputChange = (value: InputType) => {
    setInputValue(value);
    temp.current++;
  };

  return (
    <>
      <FormInput setInputValue={handleInputChange} />
      <div>The result is {totalCost}</div>
      {inputValue && (
        <div className="input-graph" key={temp.current}>
          <Graph inputValue={inputValue} />
          <Graph inputValue={inputValue} outputValue={outputValue} />
        </div>
      )}
    </>
  );
}
