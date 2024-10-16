import { type Edge, type EdgeTypes } from "@xyflow/react";
import { InputType } from "../types/InputType";

const initialEdges = (inputValue: InputType): Edge[] => {
  const edges: Edge[] = [];
  if (inputValue) {
    const dataArr: number[][] = inputValue?.arr;
    for (let i = 0; i < inputValue.n; i++) {
      for (let j = 0; j < inputValue.n; j++) {
        if (dataArr[i][j] !== 0 && i != j) {
          edges.push({
            id: `${i}${j}`,
            source: `${i}`,
            target: `${j}`,
            data: { label: `${dataArr[i][j]}` },
            type: "floating",
          });
        }
      }
    }
  }
  return edges;
};

export const generatePath = (
  outputValue: Array<number>,
  inputValue: InputType
): Edge[] => {
  const edges: Edge[] = [];
  if (outputValue) {
    const dataArr: number[][] = inputValue?.arr;

    for (let i = 0; i < outputValue.length - 1; i++) {
      edges.push({
        id: `${outputValue[i]}${outputValue[i + 1]}`,
        source: `${outputValue[i]}`,
        target: `${outputValue[i + 1]}`,
        data: { label: `${dataArr[outputValue[i]][outputValue[i + 1]]}` },
        type: "floating",
      });
    }
  }

  return edges;
};
export default initialEdges;
export const edgeTypes = {} satisfies EdgeTypes;
