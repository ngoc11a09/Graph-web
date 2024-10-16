import {
  BaseEdge,
  type Edge,
  type EdgeProps,
  getBezierPath,
  useInternalNode,
} from "@xyflow/react";

import { getEdgeParams } from "../utils/edge.util";
import { FC } from "react";

type FloatingEdge = Edge<{
  id: string;
  source: string;
  target: string;
  markerEnd: string;
  style: object;
  label: string;
}>;

const FloatingEdge: FC<EdgeProps<FloatingEdge>> = ({
  id,
  source,
  target,
  style,
  data,
}) => {
  const sourceNode = useInternalNode(source);
  const targetNode = useInternalNode(target);

  if (!sourceNode || !targetNode) {
    return null;
  }

  const { sx, sy, tx, ty, sourcePos, targetPos } = getEdgeParams(
    sourceNode,
    targetNode
  );

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX: sx,
    sourceY: sy,
    sourcePosition: sourcePos,
    targetX: tx,
    targetY: ty,
    targetPosition: targetPos,
  });

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        style={style}
        label={data?.label}
        labelX={labelX}
        labelY={labelY}
      />
    </>
  );
};

export default FloatingEdge;
