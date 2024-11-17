import {
  BaseEdge,
  type Edge,
  type EdgeProps,
  getStraightPath,
  ReactFlowState,
  useInternalNode,
  useStore,
} from "@xyflow/react";

import { getEdgeParams } from "../utils/edge.util";
import { FC } from "react";

export type GetSpecialPathParams = {
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
};

export const getSpecialPath = (
  { sourceX, sourceY, targetX, targetY }: GetSpecialPathParams,
  offset: number
): string => {
  const centerX = (sourceX + targetX) / 2;
  const centerY = (sourceY + targetY) / 2;

  return `M ${sourceX} ${sourceY} Q ${centerX} ${
    centerY + offset
  } ${targetX} ${targetY}`;
};

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
  markerEnd,
}) => {
  const sourceNode = useInternalNode(source);
  const targetNode = useInternalNode(target);

  const isBiDirectionEdge = useStore((s: ReactFlowState) => {
    const edgeExists = s.edges.some(
      (e) =>
        (e.source === target && e.target === source) ||
        (e.target === source && e.source === target)
    );
    return edgeExists;
  });

  if (!sourceNode || !targetNode) {
    return null;
  }

  const { sx, sy, tx, ty } = getEdgeParams(sourceNode, targetNode);

  let edgePath = "";
  let labelX = 0;
  let labelY = 0;

  if (isBiDirectionEdge) {
    // Use a larger vertical offset for bidirectional edges
    edgePath = getSpecialPath(
      { sourceX: sx, sourceY: sy, targetX: tx, targetY: ty },
      sx < tx ? 30 : -30 // Adjust offset for separation
    );
    labelX = (sx + tx) / 2;
    labelY = (sy + ty) / 2 + (sx < tx ? 20 : -20); // Larger offset for clarity
  } else {
    [edgePath] = getStraightPath({
      sourceX: sx,
      sourceY: sy,
      targetX: tx,
      targetY: ty,
    });
    // Adjust label for straight edges
    labelX = (sx + tx) / 2 + 10; // Horizontal offset for straight edges
    labelY = (sy + ty) / 2 - 15; // Vertical offset for better separation
  }

  return (
    <>
      <BaseEdge id={id} path={edgePath} style={style} markerEnd={markerEnd} />
      {data?.label && (
        <text
          x={labelX}
          y={labelY}
          fill="#222"
          fontSize="12px"
          textAnchor="middle"
          dominantBaseline="central"
        >
          {data.label}
        </text>
      )}
    </>
  );
};

export default FloatingEdge;
