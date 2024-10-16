import { ReactFlow, useNodesState, useEdgesState } from "@xyflow/react";
import FloatingEdge from "../edges/FloatingEdge";
import FloatingConnectionLine from "../edges/FloatingConnectionLine";
import { createNodesAndEdges } from "../utils/edge.util";
import { InputType } from "../types/InputType";
import { generatePath } from "../edges";

interface GraphProps {
  inputValue?: InputType;
  outputValue?: Array<number>;
}

const Graph: React.FC<GraphProps> = ({ inputValue, outputValue }) => {
  const { nodes: initialNodes, edges: initialEdges } = createNodesAndEdges(
    inputValue as InputType
  );

  if (outputValue) {
    initialEdges.length = 0;
    initialEdges.push(...generatePath(outputValue, inputValue as InputType));
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
      ></ReactFlow>
    </div>
  );
};
export default Graph;
