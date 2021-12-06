const { readFile, readFileSync } = require("fs");
const { performance } = require("perf_hooks");

const main = () => {
  try {
    const inputData = readFileSync("./input.txt", "utf8");
    const inputDataArray = inputData.split(",").map(Number);

    readFile("./boards.txt", "utf8", (err, data) => {
      if (err) throw err;
      let start = performance.now();
      let history = [];
      const boardArray = data.split("\n\n").map((board) => ({
        table: generateBoard(board),
        values: [],
      }));

      for (const input of inputDataArray) {
        let index = []
        for (let i = 0; i < boardArray.length; i++) {
          const board = boardArray[i];
          const { table, values, win } = checkBoardHits(input, board);
          const updatedBoard = Object.assign(board, { table, values }) 
          boardArray[i] = updatedBoard

          if (win) {
            index.push(i)
            history.push(updatedBoard)
          }
        }

        if (index.length > 0) {
          index.forEach(val => boardArray.splice(val, 1))
        }
      }

      const [ last ] = history.splice(-1)
      countUnHittedValues(last)

      let end = performance.now();
      console.log("Time in ms:", end - start);
    });
  } catch (err) {
    console.error(err);
  }
};

const countUnHittedValues = (board) => {
  const { table, values } = board;

  const [ lastHit ] = values.splice(-1)
  const finalSum = table.reduce((sum, row) => {
    return sum += row.reduce((rowSum, col) => {
      if (!col.hit) return rowSum += col.value
      return rowSum
    }, 0)
  }, 0)

  console.log(finalSum * lastHit)
}

const checkBoardHits = (value, board) => {
  const { table, values } = board;
  let hit = false;
  for (let i = 0; i < table.length; i++) {
    for (let j = 0; j < table[i].length; j++) {
      if (table[i][j].value === value) {
        table[i][j] = { ...table[i][j], hit: true }
        values.push(value)
        hit = true
      }
    }
    if (hit) break;
  }

  const isVerticalWin = checkVerticalWin(table)
  const isHorizontalWin = checkHorizontalWin(table)

  return {
    table,
    values,
    win: isVerticalWin || isHorizontalWin,
  };
};

const checkVerticalWin = (table) => {
  const convertedRows = []
  for (let i = 0; i < table[0].length; i++) {
    const convert = table.map(row => row[i])
    convertedRows.push(convert)
  }

  return checkHorizontalWin(convertedRows)
};

const checkHorizontalWin = (table) => {
  return table.some((row) => row.every((col) => col.hit));
};

const generateBoard = (board) => board.split("\n").map(generateRow);
const generateRow = (row) => row.trim().split(/\s+/gm).map((val) => ({ value: Number(val), hit: false }));

main();
