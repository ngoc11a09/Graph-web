import { ReactFlow, useNodesState, useEdgesState } from "@xyflow/react";
import FloatingEdge from "../edges/FloatingEdge";
import FloatingConnectionLine from "../edges/FloatingConnectionLine";
import { createNodesAndEdges } from "../utils/edge.util";
import { InputType } from "../types/InputType";

// eslint-disable-next-line react-refresh/only-export-components
export enum AlgorithmsEnum {
  TSP = "TSP",
  Dijkstra = "Dijkstra",
  DFS = "DFS",
  MST = "MST",
}

export type Algorithms = "TSP" | "Dijkstra" | "DFS" | "MST";
interface GraphProps {
  inputValue?: InputType;
  outputValue?: Array<number> | number[][];
  algo?: Algorithms;
  isDigraph?: boolean;
}

const Graph: React.FC<GraphProps> = ({
  inputValue,
  outputValue,
  algo,
  isDigraph,
}) => {
  const isRes: boolean = !!outputValue;
  const { nodes: initialNodes, edges: initialEdges } = createNodesAndEdges(
    inputValue as InputType,
    isRes as boolean,
    isDigraph as boolean,
    outputValue as Array<number>,
    algo as Algorithms
  );

  const edgeTypes = {
    floating: FloatingEdge,
  };
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);
  return (
    <ReactFlow
      className="h-full floatingedges"
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      fitView
      edgeTypes={edgeTypes}
      connectionLineComponent={FloatingConnectionLine}
      edgesFocusable={false}
      nodesFocusable={false}
      nodesConnectable={false}
      elementsSelectable={false}
    ></ReactFlow>
  );
};
export default Graph;
