import { Edge, InternalNode, Node, Position } from "@xyflow/react";
import initialNodes from "../nodes";
import initialEdges, {
  generatePathDFS,
  generatePathDijkstra,
  generatePathTSP,
} from "../edges";
import { InputType } from "../types/InputType";
import { Algorithms, AlgorithmsEnum } from "../components/Graph";

// this helper function returns the intersection point
// of the line between the center of the intersectionNode and the target node
function getNodeIntersection(
  intersectionNode: InternalNode<Node>,
  targetNode: InternalNode<Node>
) {
  // https://math.stackexchange.com/questions/1724792/an-algorithm-for-finding-the-intersection-point-between-a-center-of-vision-and-a
  const { width: intersectionNodeWidth, height: intersectionNodeHeight } =
    intersectionNode?.measured || { width: 0, height: 0 };
  const intersectionNodePosition =
    intersectionNode?.internals?.positionAbsolute;
  const targetPosition = targetNode?.internals.positionAbsolute;

  const w = (intersectionNodeWidth ?? 0) / 2;
  const h = (intersectionNodeHeight ?? 0) / 2;

  const x2 = intersectionNodePosition?.x + w;
  const y2 = intersectionNodePosition?.y + h;
  const x1 = targetPosition?.x + (targetNode?.measured.width ?? 0) / 2;
  const y1 = targetPosition?.y + (targetNode?.measured.height ?? 0) / 2;

  const xx1 = (x1 - x2) / (2 * w) - (y1 - y2) / (2 * h);
  const yy1 = (x1 - x2) / (2 * w) + (y1 - y2) / (2 * h);
  const a = 1 / (Math.abs(xx1) + Math.abs(yy1));
  const xx3 = a * xx1;
  const yy3 = a * yy1;
  const x = w * (xx3 + yy3) + x2;
  const y = h * (-xx3 + yy3) + y2;

  return { x, y };
}
// returns the position (top,right,bottom or right) passed node compared to the intersection point
function getEdgePosition(
  node: InternalNode<Node>,
  intersectionPoint: { x: number; y: number }
) {
  const n = { ...node?.internals.positionAbsolute, ...node };
  const nx = Math.round(n.x);
  const ny = Math.round(n.y);
  const px = Math.round(intersectionPoint?.x);
  const py = Math.round(intersectionPoint?.y);

  if (px <= nx + 1) {
    return Position.Left;
  }
  if (px >= nx + (n.measured?.width ?? 0) - 1) {
    return Position.Right;
  }
  if (py <= ny + 1) {
    return Position.Top;
  }
  if (py >= ny + (n.measured?.height ?? 0) - 1) {
    return Position.Bottom;
  }

  return Position.Top;
}

// returns the parameters (sx, sy, tx, ty, sourcePos, targetPos) you need to create an edge
export function getEdgeParams(
  source: InternalNode<Node>,
  target: InternalNode<Node>
) {
  const sourceIntersectionPoint = getNodeIntersection(source, target);
  const targetIntersectionPoint = getNodeIntersection(target, source);

  const sourcePos = getEdgePosition(source, sourceIntersectionPoint);
  const targetPos = getEdgePosition(target, targetIntersectionPoint);

  return {
    sx: sourceIntersectionPoint.x,
    sy: sourceIntersectionPoint.y,
    tx: targetIntersectionPoint.x,
    ty: targetIntersectionPoint.y,
    sourcePos,
    targetPos,
  };
}

export function createNodesAndEdges(
  inputValue: InputType,
  isRes: boolean,
  isDigraph: boolean,
  outputValue: Array<number>,
  algo: Algorithms
) {
  const nodes = initialNodes(inputValue, isRes);
  let edges: Edge[] = [];
  if (isRes) {
    if (outputValue) {
      if (algo === AlgorithmsEnum.TSP) {
        edges = generatePathTSP(outputValue, inputValue as InputType);
      } else if (algo === AlgorithmsEnum.Dijkstra) {
        edges = generatePathDijkstra(
          outputValue,
          inputValue as InputType,
          isDigraph as boolean
        );
      } else if (algo === AlgorithmsEnum.DFS) {
        edges = generatePathDFS(
          outputValue,
          inputValue as InputType,
          isDigraph as boolean
        );
      }
    }
  } else edges = initialEdges(inputValue, isDigraph);
  return { nodes, edges };
}
