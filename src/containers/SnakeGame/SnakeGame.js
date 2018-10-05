import React, { Component } from 'react';
import _ from 'lodash';
import flow from 'lodash/flow';
import * as PropTypes from 'prop-types';
import Easystarjs from 'easystarjs';

import GridCell from './GridCell';
import Direction from './util/Direction';
import Position from './util/Position';
import techTheme from '../../common/techTheme';
import withWindowSize from '../../components/Home/GridBackground/withWindowSize';

import './SnakeGame.css';

const FOOD_TIMEOUT = 7000;
const MOVE_SNAKE_TIMEOUT = 90;
const BOX_SIZE = 80;

const INITIAL_STATE = {
  snake: [{ ...techTheme.java, ...Position(5, 5) }],
  food: { ...techTheme.nodeJs, ...Position(4, 2) },
  direction: Direction.RIGHT,
  score: 0,
};

const FOOD_THEMES = _.keys(_.omit(techTheme, ['others', 'java']));

const aStar = new Easystarjs.js();

class SnakeGame extends Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
    this.pathfindInstanceId = null;
    this.isWithinPlayArea = this.isWithinPlayArea.bind(this);
    this.moveFood = this.moveFood.bind(this);
    this.checkIfAteFood = this.checkIfAteFood.bind(this);
    this.startGame = this.startGame.bind(this);
    this.endGame = this.endGame.bind(this);
    this.moveSnake = this.moveSnake.bind(this);
    this.ateItself = this.ateItself.bind(this);
    this.inputDirection = this.inputDirection.bind(this);
    this.removeTimers = this.removeTimers.bind(this);
    this.pathfind = this.pathfind.bind(this);
  }
  componentDidMount() {
    this.startGame();
  }
  componentWillUnmount() {
    this.removeTimers();
  }

  checkIfAteFood(snake) {
    const { food } = this.state;
    if (food.x !== snake[0].x || food.y !== snake[0].y) {
      return false;
    }
    const lastSection = snake[snake.length - 1];

    let newSection;
    const possibleNewPositions = [
      Position(lastSection.x - 1, lastSection.y),
      Position(lastSection.x, lastSection.y - 1),
      Position(lastSection.x + 1, lastSection.y),
      Position(lastSection.x, lastSection.y + 1),
    ];
    for (const position of possibleNewPositions) {
      if (this.isWithinPlayArea(position) && !this.isColliding(position, snake)) {
        newSection = { ...food, ...position };
        // absorb the food's style
        break;
      }
    }
    const catSnake = snake.concat(newSection).slice(1);
    const newSnake = [];
    for (let i = catSnake.length-1; i >=0; i -= 1) {
      if (i === 0) {
        const catBlock = catSnake[i];
        newSnake.push({
          ...newSection,
          x: catBlock.x,
          y: catBlock.y,
        });
      } else {
        const catBlock = catSnake[i];
        const prevBlock = catSnake[i - 1] || {};
        newSnake.push({
          ...catBlock,
          ...prevBlock,
          x: catBlock.x,
          y: catBlock.y,
        });
      }
    }
    // newSnake.push(catSnake[0]);
    newSnake.reverse();
    const newAssembledSnake = [snake[0], ...newSnake];
    this.setState({
      snake: newAssembledSnake,
      score: this.state.score + 1,
    });
    this.moveFood();
    return true;
  }

  endGame() {
    console.info(`Ended game with score ${this.state.score}`);
    if (this.pathfindInstanceId) {
      aStar.cancelPath(this.pathfindInstanceId);
    }
    this.setState(INITIAL_STATE);
    this.startGame();
  }

  isColliding(position, snake) {
    for (const snakeLocation of snake) {
      if (this.isSamePosition(snakeLocation, position)) {
        return true;
      }
    }
    return false;
  }

  isSamePosition(position1, position2) {
    return position1.x === position2.x && position1.y === position2.y;
  }

  // is the cell's position inside the grid?
  isWithinPlayArea(cell) {
    return cell.x > -1 && cell.y > -1 && cell.x < this.numCols && cell.y < this.numRows;
  }

  // todo this implementation is terrible
  inputDirection({ keyCode }) {
    // if it's the same direction or simply reversing, ignore
    let changeDirection = true;
    [[38, 40], [37, 39]].forEach(dir => {
      if (dir.indexOf(this.state.direction) > -1 && dir.indexOf(keyCode) > -1) {
        changeDirection = false;
      }
    });

    if (changeDirection) this.setState({ direction: keyCode });
  }

  // randomly place snake food
  moveFood() {
    if (this.moveFoodTimeout) clearTimeout(this.moveFoodTimeout);
    let position = {};
    do {
      const x = _.random(1, this.numCols - 2);
      const y = _.random(1, this.numRows - 2);
      // don't put food along the very edge of the play surface
      position = Position(x, y);
    } while (this.isColliding(position, this.state.snake));
    const theme = techTheme[FOOD_THEMES[_.random(0, FOOD_THEMES.length)]];
    this.setState({
      food: {
        ...this.state.food,
        ...theme,
        ...position,
      },
    });
    this.moveFoodTimeout = setTimeout(this.moveFood, FOOD_TIMEOUT);
    this.pathfind(this.state.snake);
  }

  moveSnake() {
    const newSnake = [];
    // set in the new "head" of the snake
    const snakeHead = this.state.snake[0];
    switch (this.state.direction) {
      case Direction.DOWN:
        newSnake[0] = { ...snakeHead, y: snakeHead.y + 1 };
        break;
      case Direction.UP:
        newSnake[0] = { ...snakeHead, y: snakeHead.y - 1 };
        break;
      case Direction.RIGHT:
        newSnake[0] = { ...snakeHead, x: snakeHead.x + 1 };
        break;
      case Direction.LEFT:
        newSnake[0] = { ...snakeHead, x: snakeHead.x - 1 };
        break;
      default:
        break;
    }
    // now shift each "body" segment to the previous segment's position
    [].push.apply(
      newSnake,
      this.state.snake.slice(1).map((s, i) => {
        // since we're starting from the second item in the list,
        // just use the index, which will refer to the previous item
        // in the original list
        const movedState = this.state.snake[i];
        const previousState = this.state.snake[i + 1];
        if (previousState) {
          return {
            ...movedState,
            style: previousState.style,
            icon: previousState.icon,
          };
        }
        return movedState;
      }),
    );

    this.setState({ snake: newSnake });
    this.checkIfAteFood(newSnake);
    if (!this.isWithinPlayArea(newSnake[0]) || this.ateItself(newSnake)) {
      this.endGame();
    } else {
      this.pathfind(newSnake);
    }
  }

  createSurroundingNodes(x, y, grid) {
    const newGrid = _.map(grid, _.clone);
    if (newGrid[y + 1] && Number.isInteger(newGrid[y + 1][x])) {
      newGrid[y + 1][x] = newGrid[y + 1][x] === 0 ? 1 : newGrid[y + 1][x];
    }
    if (newGrid[y + 1] && Number.isInteger(newGrid[y + 1][x + 1])) {
      newGrid[y + 1][x + 1] = newGrid[y + 1][x + 1] === 0 ? 1 : newGrid[y + 1][x + 1];
    }
    if (newGrid[y] && Number.isInteger(newGrid[y][x + 1])) {
      newGrid[y][x + 1] = newGrid[y][x + 1] === 0 ? 1 : newGrid[y][x + 1];
    }
    if (newGrid[y - 1] && Number.isInteger(newGrid[y - 1][x + 1])) {
      newGrid[y - 1][x + 1] = newGrid[y - 1][x + 1] === 0 ? 1 : newGrid[y - 1][x + 1];
    }
    if (newGrid[y - 1] && Number.isInteger(newGrid[y - 1][x - 1])) {
      newGrid[y - 1][x - 1] = newGrid[y - 1][x - 1] === 0 ? 1 : newGrid[y - 1][x - 1];
    }
    if (newGrid[y] && Number.isInteger(newGrid[y][x - 1])) {
      newGrid[y][x - 1] = newGrid[y][x - 1] === 0 ? 1 : newGrid[y][x - 1];
    }
    return newGrid;
  }

  pathfind(newSnake) {
    if (!newSnake[0]) {
      return;
    }
    const head = newSnake[0];
    const grid = _.map(_.range(this.numRows), () => _.map(_.range(this.numCols), () => 0));
    const newGrid = _.reduce(
      newSnake,
      (accGrid, snake) => {
        const cloned = _.map(accGrid, _.clone);
        cloned[snake.y][snake.x] = 2;
        return this.createSurroundingNodes(snake.x, snake.y, cloned);
      },
      grid,
    );
    aStar.setGrid(newGrid);
    const allowedStates = [0, 1];
    aStar.setAcceptableTiles(allowedStates);
    aStar.setTileCost(1, 5);
    this.pathfindInstanceId = aStar.findPath(
      newSnake[0].x,
      newSnake[0].y,
      this.state.food.x,
      this.state.food.y,
      path => {
        if (path === null || !path.length) {
          let randomX;
          let randomY;
          do {
            randomX = _.random(1, this.numCols - 1);
            randomY = _.random(1, this.numRows - 1);
          } while (!allowedStates.includes(grid[randomY][randomX]));
          this.pathfindInstanceId = aStar.findPath(
            newSnake[0].x,
            newSnake[0].y,
            randomX,
            randomY,
            newPath => {
              if (newPath === null || !newPath.length) {
                console.debug(`Ramdom fallback failed to (${randomX}, ${randomY})`);
              } else {
                const firstMove = newPath[1] || newPath[0]; // todo this hack
                let directionToMove = null;
                if (firstMove.x !== head.x) {
                  if (firstMove.x < head.x) {
                    directionToMove = Direction.LEFT;
                  } else {
                    directionToMove = Direction.RIGHT;
                  }
                } else if (firstMove.y !== head.y) {
                  if (firstMove.y < head.y) {
                    directionToMove = Direction.UP;
                  } else {
                    directionToMove = Direction.DOWN;
                  }
                }
                if (directionToMove) {
                  console.debug(`Ramdom fallback successful to (${randomX}, ${randomY})`);
                  this.inputDirection({ keyCode: directionToMove });
                } else {
                  console.warn('Path is noop somehow');
                }
              }
            },
          );
          aStar.calculate();
        } else {
          // alert("Path was found. The first Point is " + path[0].x + " " + path[0].y);
          const firstMove = path[1] || path[0]; // todo this hack
          let directionToMove = null;
          if (firstMove.x !== head.x) {
            if (firstMove.x < head.x) {
              directionToMove = Direction.LEFT;
            } else {
              directionToMove = Direction.RIGHT;
            }
          } else if (firstMove.y !== head.y) {
            if (firstMove.y < head.y) {
              directionToMove = Direction.UP;
            } else {
              directionToMove = Direction.DOWN;
            }
          }
          if (directionToMove) {
            this.inputDirection({ keyCode: directionToMove });
          } else {
            console.log('Path is noop somehow');
          }
        }
      },
    );
    aStar.calculate();
  }

  ateItself(snake) {
    const head = snake[0];
    for (const bodyPiece of snake.slice(1)) {
      if (this.isSamePosition(head, bodyPiece)) {
        return true;
      }
    }
    return false;
  }

  startGame() {
    this.removeTimers();
    this.moveSnakeInterval = setInterval(this.moveSnake, MOVE_SNAKE_TIMEOUT);
    this.moveFood();

    // this.setState({
    //   snake: [[5, 5]],
    //   food: [10, 10],
    // });
    // need to focus so keydown listener will work!
    // this.el.focus();
  }

  removeTimers() {
    if (this.moveSnakeInterval) clearInterval(this.moveSnakeInterval);
    if (this.moveFoodTimeout) clearTimeout(this.moveFoodTimeout);
  }

  render({ innerHeight, innerWidth } = this.props) {
    // each cell should be approximately 15px wide, so calculate how many we need
    this.numCols = Math.floor(innerWidth / BOX_SIZE);
    this.numRows = Math.floor(innerHeight / BOX_SIZE);

    // const cellSize = Math.floor(size / numCells);
    // const cellIndexes = Array.from(Array(numCells).keys());
    const cells = _.map(_.range(this.numRows), y =>
      _.map(_.range(this.numCols), x => {
        const foodCell =
          this.state.food.x === x && this.state.food.y === y ? this.state.food : false;
        const snakeCells = this.state.snake.filter(s => s.x === x && s.y === y);
        const snakeCell = snakeCells.length && snakeCells[0] ? snakeCells[0] : false;

        return (
          <GridCell foodCell={foodCell} snakeCell={snakeCell} size={BOX_SIZE} key={`${x} ${y}`} />
        );
      }),
    );

    return (
      <div
        className="SnakeGame"
        onKeyDown={this.inputDirection}
        role="presentation"
        style={{
          width: `${innerWidth}px`,
          height: `${innerHeight}px`,
        }}
        // ref={el => (this.el = el)}
        tabIndex={-1}
      >
        <div
          className="grid"
          style={{
            width: `${innerWidth}px`,
            height: `${innerHeight}px`,
          }}
        >
          {cells}
        </div>
      </div>
    );
  }
}
SnakeGame.propTypes = {
  innerHeight: PropTypes.number,
  innerWidth: PropTypes.number,
};

SnakeGame.defaultPropTypes = {
  innerHeight: 0,
  innerWidth: 0,
};

const decorators = flow([withWindowSize]);

export default decorators(SnakeGame);