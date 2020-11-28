// Backtracks from the finishNode to find the shortest path.
// Only works when called *after* the dijkstra method above.
export function getNodesInShortestPathOrder(finishNode) {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
        nodesInShortestPathOrder.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
}

export function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    getAllNeighbors(node, neighbors, grid);
    return neighbors.filter(neighbor => !neighbor.isVisited);
}


function getAllNeighbors(node, neighbors, grid) {
    const { col, row } = node;
    if (row > 0)
        neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1)
        neighbors.push(grid[row + 1][col]);
    if (col > 0)
        neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1)
        neighbors.push(grid[row][col + 1]);
}

export function resetNode(node) {
    node.distance = Infinity;
    node.isVisited = false;
    node.previousNode = null;
}