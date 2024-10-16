import { type NodeTypes } from "@xyflow/react";

import { PositionLoggerNode } from "./PositionLoggerNode";
import { AppNode } from "./types";
import { InputType } from "../types/InputType";

const nodeDefaults = {
  style: {
    borderRadius: "100%",
    backgroundColor: "#fff",
    width: 30,
    height: 30,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

const initialNodes = (inputValue: InputType): AppNode[] => {
  const nodes: AppNode[] = [];
  if (inputValue) {
    for (let i = 0; i < inputValue.n; i++) {
      nodes.push({
        id: `${i}`,
        position: {
          x: Math.floor(Math.random() * 250),
          y: Math.floor(Math.random() * 250),
        },
        data: { label: `${i}` },
        ...nodeDefaults,
      });
    }
  }
  return nodes;
};

export default initialNodes;
export const nodeTypes = {
  "position-logger": PositionLoggerNode,
  // Add any of your custom nodes here!
} satisfies NodeTypes;
