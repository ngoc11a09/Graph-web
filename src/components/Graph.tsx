import { ReactFlow, useNodesState, useEdgesState } from "@xyflow/react";
import FloatingEdge from "../edges/FloatingEdge";
import FloatingConnectionLine from "../edges/FloatingConnectionLine";
import { createNodesAndEdges } from "../utils/edge.util";
import { InputType } from "../types/InputType";
import { generatePathDijkstra, generatePathTSP } from "../edges";

enum AlgorithmsEnum {
  TSP = "TSP",
  Dijkstra = "Dijkstra",
}

type Algorithms = "TSP" | "Dijkstra";
interface GraphProps {
  inputValue?: InputType;
  outputValue?: Array<number>;
  algo?: Algorithms;
}

const Graph: React.FC<GraphProps> = ({ inputValue, outputValue, algo }) => {
  const isRes: boolean = !!outputValue;
  const { nodes: initialNodes, edges: initialEdges } = createNodesAndEdges(
    inputValue as InputType,
    isRes as boolean
  );

  if (outputValue) {
    initialEdges.length = 0;

    if (algo === AlgorithmsEnum.TSP) {
      initialEdges.push(
        ...generatePathTSP(outputValue, inputValue as InputType)
      );
    }

    if (algo === AlgorithmsEnum.Dijkstra) {
      initialEdges.push(
        ...generatePathDijkstra(outputValue, inputValue as InputType)
      );
    }
  }

  const edgeTypes = {
    floating: FloatingEdge,
  };
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);
  return (
    <div className="floatingedges">
      <ReactFlow
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
    </div>
  );
};
export default Graph;
