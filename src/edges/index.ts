import { MarkerType, type Edge, type EdgeTypes } from "@xyflow/react";
import { InputType } from "../types/InputType";

const initialEdges = (inputValue: InputType, isDigraph: boolean): Edge[] => {
  const edges: Edge[] = [];
  if (inputValue) {
    const dataArr: number[][] = inputValue?.arr;
    for (let i = 0; i < inputValue.n; i++) {
      for (let j = 0; j < inputValue.n; j++) {
        if (dataArr?.[i][j] !== 0 && i != j) {
          const edge: Edge = {
            id: `${i}${j}`,
            source: `${i}`,
            target: `${j}`,
            data: { label: `${dataArr?.[i][j]}` },
            type: "floating",
          };
          if (isDigraph) {
            edge.markerEnd = {
              type: MarkerType.ArrowClosed,
              width: 20,
              height: 20,
            };
          }

          edges.push(edge);
        }
      }
    }
  }
  return edges;
};

export const generatePathTSP = (
  outputValue: Array<number>,
  inputValue: InputType
): Edge[] => {
  const edges: Edge[] = [];

  if (outputValue) {
    const dataArr: number[][] = inputValue.arr;

    for (let i = 0; i < outputValue.length - 1; i++) {
      edges.push({
        id: `${outputValue[i]}${outputValue[i + 1]}`,
        source: `${outputValue[i]}`,
        target: `${outputValue[i + 1]}`,
        data: {
          label: `${dataArr?.[outputValue?.[i]]?.[outputValue?.[i + 1]]}`,
        },
        type: "floating",
        style: {
          strokeWidth: 2,
          stroke: "#FF0072",
        },
      });
    }
  }

  return edges;
};

export const generatePathDijkstra = (
  outputValue: Array<number>,
  inputValue: InputType,
  isDigraph: boolean
): Edge[] => {
  const edges: Edge[] = [];

  if (outputValue) {
    const dataArr: number[][] = inputValue.arr;

    for (let i = 0; i < outputValue.length; i++) {
      if (outputValue[i] === -1 || outputValue[i + 1] === 999999) {
        continue;
      }
      const edge: Edge = {
        id: `${outputValue[i]}${i}`,
        source: `${i}`,
        target: `${outputValue[i]}`,
        data: {
          label: `${dataArr?.[outputValue?.[i]]?.[i]}`,
        },
        type: "floating",
        style: {
          strokeWidth: 2,
          stroke: "#FF0072",
        },
      };
      if (isDigraph) {
        edge.markerEnd = {
          type: MarkerType.ArrowClosed,
          width: 10,
          height: 10,
          color: "#FF0072",
        };
      }
      edges.push(edge);
    }
  }
  return edges;
};

export default initialEdges;
export const edgeTypes = {} satisfies EdgeTypes;
