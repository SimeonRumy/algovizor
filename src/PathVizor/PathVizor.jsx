import React, { Component } from 'react';
import Node from './Node/Node';
import { getNodesInShortestPathOrder } from '../algorithms/commonMethods';
import { dijkstra } from '../algorithms/dijkstra';
import { astar } from '../algorithms/astar';
import NavBar from '../NavBar/NavBar'
import ButtonBar from '../ButtonBar/ButtonBar'

import './PathVizor.css';

export default class PathVizor extends Component {

  constructor() {
    super();
    this.state = {
      grid: [],
      mouseIsPressed: false,
      setWallsButtonIsPressed: false,
      setStartButtonIsPressed: false,
      setFinishButtonIsPresed: false,
      setCostButtonIsPressed: false,
      startNodeRow: 10,
      startNodeColumn: 15,
      finishNodeRow: 10,
      finishNodeColumn: 35,
      shortestPathDistance: 0
    };
  }

  componentDidMount() {
    const { startNodeRow, startNodeColumn, finishNodeColumn, finishNodeRow } = this.state;
    const grid = setupIntialGrid(startNodeRow, startNodeColumn, finishNodeColumn, finishNodeRow);
    this.setState({ grid });
  }

  handleMouseDown(row, col) {
    const newGrid = this.reactToMouseAction(row, col);
    this.setState({ grid: newGrid, mouseIsPressed: true });
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;
    const newGrid = this.reactToMouseAction(row, col);
    this.setState({ grid: newGrid });
  }

  handleMouseUp() {
    this.setState({ mouseIsPressed: false });
  }

  reactToMouseAction(row, col) {
    var newGrid = this.state.grid;
    if (this.state.setWallsButtonIsPressed) {
      newGrid = toggleWallInGrid(this.state.grid, row, col);
    } else if (this.state.setStartButtonIsPressed) {
      this.resetGoalNodes(true, false)
      newGrid = this.state.grid
      newGrid = toggleStartNodeInGrid(newGrid, row, col);
      this.setState({ startNodeRow: row });
      this.setState({ startNodeColumn: col });
    } else if (this.state.setFinishButtonIsPresed) {
      this.resetGoalNodes(false, true)
      newGrid = this.state.grid
      newGrid = toggleFinishNodeInGrid(newGrid, row, col);
      this.setState({ finishNodeRow: row });
      this.setState({ finishNodeColumn: col });
    } else if (this.state.setCostButtonIsPressed) {
      newGrid = updateNodeCostInGrid(newGrid, row, col);
    }
    return newGrid;
  }

  animateAlgorithm(visitedNodesOrdered, nodesOfTheShortestPathOrdered) {
    for (let i = 0; i <= visitedNodesOrdered.length; i++) {
      if (i === visitedNodesOrdered.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesOfTheShortestPathOrdered);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesOrdered[i];
        document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-visited';
      }, 10 * i);
    }
  }

  animateShortestPath(nodesOfTheShortestPathOrdered) {
    this.setState({ shortestPathDistance: nodesOfTheShortestPathOrdered.length });
    for (let i = 0; i < this.state.shortestPathDistance; i++) {
      setTimeout(() => {
        const node = nodesOfTheShortestPathOrdered[i];
        document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-shortest-path';
      }, 50 * i);
    }
  }

  resetGoalNodes(start, end) {
    var newGrid = this.state.grid;
    newGrid = this.searchAndReplace(start, newGrid, end);
    this.setState({ grid: newGrid });
  }

  searchAndReplace(start, newGrid, end) {
    for (const row of this.state.grid) {
      for (const node of row) {
        if (node.isStart && start) {
          newGrid = toggleStartNodeInGrid(this.state.grid, node.row, node.col);
          return;
        } else if (node.isFinish && end) {
          newGrid = toggleFinishNodeInGrid(this.state.grid, node.row, node.col);
          return;
        }
      }
    }
    return newGrid;
  }


  visualizeAlgorithm(algo) {
    this.setState({ setStartButtonIsPressed: false, setFinishButtonIsPresed: false, setWallsButtonIsPressed: false })
    const { grid } = this.state;
    const { startNodeRow, startNodeColumn, finishNodeColumn, finishNodeRow } = this.state;
    const startNode = grid[startNodeRow][startNodeColumn];
    const finishNode = grid[finishNodeRow][finishNodeColumn];
    const visitedNodesInOrder = algo(grid, startNode, finishNode);
    console.log(visitedNodesInOrder.length)
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    console.log(nodesInShortestPathOrder.length)
    this.animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  resetGrid() {
    for (const row of this.state.grid) {
      for (const node of row) {
        if (node.isStart) {
          document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-start';
        } else if (node.isFinish) {
          document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-finish';
        } else if (node.isWall) {
          document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-wall';
        } else if (node.cost > 1) {
          document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-costly1';
        }
        else {
          document.getElementById(`node-${node.row}-${node.col}`).className = 'node node';
        }
      }
    }
  }

  render() {
    const { grid, mouseIsPressed } = this.state;
    const { startNodeRow, startNodeColumn, finishNodeColumn, finishNodeRow } = this.state;

    return (
      <>
        <NavBar
          onDijkstra={() => this.visualizeAlgorithm(dijkstra)}
          onAstar={() => this.visualizeAlgorithm(astar)}
          onBFS={() => this.visualizeAlgorithm(dijkstra)}
          onReset={() => this.resetGrid()}>
        </NavBar>

        <ButtonBar
          onSetStartButtonClick={() => this.setState({ setStartButtonIsPressed: true, setFinishButtonIsPresed: false, setWallsButtonIsPressed: false, setCostButtonIsPressed: false })}
          onSetFinishButtonClick={() => this.setState({ setStartButtonIsPressed: false, setFinishButtonIsPresed: true, setWallsButtonIsPressed: false, setCostButtonIsPressed: false })}
          onSetWAllsButtonClick={() => this.setState({ setStartButtonIsPressed: false, setFinishButtonIsPresed: false, setWallsButtonIsPressed: true, setCostButtonIsPressed: false })}
          onSetCostlyNodes={() => this.setState({ setStartButtonIsPressed: false, setFinishButtonIsPresed: false, setWallsButtonIsPressed: false, setCostButtonIsPressed: true })}
        ></ButtonBar>

        <h3 className="distanceLabel">Shortest distance: {this.state.shortestPathDistance}</h3>

        <div className="grid">
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const { row, col, isFinish, isStart, isWall, cost } = node;
                  return (
                    <Node
                      key={nodeIdx}
                      col={col}
                      isFinish={isFinish}
                      isStart={isStart}
                      isWall={isWall}
                      cost={cost}
                      mouseIsPressed={mouseIsPressed}
                      onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                      onMouseEnter={(row, col) => this.handleMouseEnter(row, col)}
                      onMouseUp={() => this.handleMouseUp()}
                      row={row}>
                    </Node>
                  );
                })}
              </div>
            );
          })}
        </div>

      </>
    );
  }
}

// win.innerWidth || docElem.clientWidth || body.clientWidth
// win.innerHeight || docElem.clientHeight || body.clientHeight
// body = doc.getElementsByTagName('body')[0],
// win = window

function setupIntialGrid(startNodeRow, startNodeColumn, finishNodeColumn, finishNodeRow) {
  const grid = [];
  for (let row = 0; row < calculateRowNumber(); row++) {
    const currentRow = [];
    for (let col = 0; col < calculateColumnNumber(); col++) {
      currentRow.push(initNode(col, row, startNodeRow, startNodeColumn, finishNodeColumn, finishNodeRow));
    }
    grid.push(currentRow);
  }
  return grid;
}

const calculateColumnNumber = () => {
  var doc = document,
    docElem = doc.documentElement,
    width = docElem.clientWidth,
    numberOfColumns = Math.round((width - 0.05 * width) / 25);
  return numberOfColumns;
}

const calculateRowNumber = () => {
  var doc = document,
    docElem = doc.documentElement,
    height = docElem.clientHeight,
    numberOfRows = Math.round((height - (0.1 * height) - 120) / 25);
  return numberOfRows;
}

const initNode = (col, row, startNodeRow, startNodeColumn, finishNodeColumn, finishNodeRow) => {
  return {
    col,
    row,
    isStart: row === startNodeRow && col === startNodeColumn,
    isFinish: row === finishNodeRow && col === finishNodeColumn,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
    cost: 0
  };
};

const updateNodeCostInGrid = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newCost = (node.cost === 0) ? 1 : (node.cost === 1) ? 2 : (node.cost === 2) ? 3 : (node.cost === 3) ? 0 : 0
  const newNode = {
    ...node,
    cost: newCost,
  };
  newGrid[row][col] = newNode;
  return newGrid;

}

const toggleStartNodeInGrid = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: false,
    isStart: !node.isStart,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};

const toggleFinishNodeInGrid = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: false,
    isFinish: !node.isFinish,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};

const toggleWallInGrid = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};
