import { getUnvisitedNeighbors, resetNode } from '../algorithms/commonMethods';

export function astar(grid, startNode, finishNode) {
    const visitedNodesInOrder = [];
    const unvisitedNodes = getAllNodesWithEuclideanDistance(grid, finishNode);
    startNode.distance = 0;
    while (!!unvisitedNodes.length) {
        sortNodesByDistance(unvisitedNodes);
        const closestNode = unvisitedNodes.shift();
        // If we encounter a wall, we skip it.
        if (closestNode.isWall) continue;
        // If the closest node is at a distance of infinity,
        // we must be trapped and should therefore stop.
        if (closestNode.distance === Infinity) return visitedNodesInOrder;
        closestNode.isVisited = true;
        visitedNodesInOrder.push(closestNode);
        if (closestNode === finishNode) return visitedNodesInOrder;
        updateUnvisitedNeighbors(closestNode, grid);
    }
}

function sortNodesByDistance(unvisitedNodes) {
    unvisitedNodes.sort((nodeA, nodeB) => (nodeA.distance - nodeB.distance) + (nodeB.euclideanDistance));
}

function updateUnvisitedNeighbors(node, grid) {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
    for (const neighbor of unvisitedNeighbors) {
        neighbor.distance = node.distance + 1;
        neighbor.previousNode = node;
    }
}

function getAllNodesWithEuclideanDistance(grid, finishNode) {
    const nodes = [];
    for (const row of grid) {
        for (const node of row) {
            resetNode(node)
            setEuclideanDistance(node, finishNode);
            nodes.push(node);
        }
    }
    return nodes;
}

function setEuclideanDistance(node, finishNode) {
    node.euclideanDistance = Math.sqrt(Math.pow(2, (node.row - finishNode.row)) + Math.pow(2, node.col - finishNode.col));
}

