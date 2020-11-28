
import { getUnvisitedNeighbors, resetNode } from '../algorithms/commonMethods';


export function dijkstra(grid, startNode, finishNode) {
  console.log(startNode)
  const visitedNodesInOrder = [];
  const unvisitedNodes = getAllNodes(grid);
  startNode.distance = 0;
  var i = 0
  for (i = 0; unvisitedNodes.length; i++) {
    sortNodesByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();
    if (closestNode.isWall) continue; // Ignore wall
    if (closestNode.distance === Infinity) return visitedNodesInOrder; // If distance === infinity we are trapped
    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);
    if (closestNode === finishNode) return visitedNodesInOrder;
    updateUnvisitedNeighbors(closestNode, grid);
  }
}

function sortNodesByDistance(unvisitedNodes) {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function updateUnvisitedNeighbors(node, grid) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + 1 + neighbor.cost;
    neighbor.previousNode = node;
  }
}

function getAllNodes(grid) {
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      resetNode(node);
      nodes.push(node);
    }
  }
  return nodes;
}


