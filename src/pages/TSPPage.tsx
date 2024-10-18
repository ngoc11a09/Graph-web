import FormInput from "../components/FormInput";
import Graph from "../components/Graph";
import { useEffect, useRef, useState } from "react";
import { OptionalInputType } from "../types/InputType";
import { TSP } from "../algoritm/TSP";

export default function TSPPage() {
  const [inputValue, setInputValue] = useState<OptionalInputType>();
  const [outputValue, setOutputValue] = useState<Array<number>>();
  const [totalCost, setTotalCost] = useState(0);
  const temp = useRef<number>(0);

  useEffect(() => {
    if (inputValue) {
      const tsp = new TSP(inputValue.n, inputValue.start, inputValue.arr);
      const res = tsp.solver();
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
