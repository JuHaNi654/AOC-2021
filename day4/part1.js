const { readFile, readFileSync } = require("fs");
const { performance } = require("perf_hooks")

// Messy and not perfect solution, but got right answer.
const main = () => {
  try {
    const inputData = readFileSync("./input.txt", "utf8")
    const inputDataArray = inputData.split(",").map(Number);

    readFile("./boards.txt", "utf8", (err, data) => {
      if (err) throw err;
      let start = performance.now();
      let winningBoard = null;
      const boardArray = data.split("\n\n")
        .map(board => ({ 
          table: generateBoard(board), 
          hits: {
            y: {},
            x: {}, 
          },
          values: [] 
        }))

      for (const input of inputDataArray) {
        for (const board of boardArray) {
          const { table, hits, win, values, winningRow } = checkBoardHits(input, board)
          if (win) {
            winningBoard = { table, hits, values, winningRow }
            break;
          } 
          Object.assign(board, { table, hits, values })
        }
  
        if (winningBoard) break;
      }
      
      if (winningBoard) {
        const finalSum = winningBoard.table.reduce((sum, row) => {
          return sum += row.reduce((rowSum, value) => {
            if (!winningBoard.values.includes(value)) return rowSum += value
            return rowSum
          }, 0)
        }, 0)
  
        const [ winningNumber] = winningBoard.winningRow.slice(-1)
        
        console.log("We have winner")
        console.log(finalSum * winningNumber)
      }
      let end = performance.now()
      console.log("Time in ms:", end - start)
    })
  } catch (err) {
    console.error(err);
  }
};

const generateBoard = (board) => board.split("\n").map(generateRow)
const generateRow = (row) => row.trim().split(/\s+/gm).map(Number)

const checkBoardHits = (value, board) => {
  const { table, hits, values } = board
  let hit = null


  for (let i = 0; i < table.length; i++) {
    for (let j = 0; j < table[i].length; j++) {
      if (value === table[i][j]) {
        hit = [i, j]
        values.push(value)
        break;
      }
    }
  }

  // beautiful :)
  if (hit && !hits.x[hit[0]]) {
    hits.x = { ...hits.x, [hit[0]]: [ value] }
  } else if (hit) {
    hits.x = { ...hits.x, [hit[0]]: [ ...hits.x[hit[0]], value ]}
  }

  if (hit && !hits.y[hit[1]]) {
    hits.y = { ...hits.y, [hit[1]]: [value] }
  } else if (hit) {
    hits.y = { ...hits.y, [hit[1]]: [ ...hits.y[hit[1]], value ]}
  }

  let verticalRow = checkWinningRow(Object.values(hits.y))
  let horizontalRow = checkWinningRow(Object.values(hits.x))

  return { 
    table, 
    hits, 
    win: verticalRow.win || horizontalRow.win,
    winningRow: verticalRow.row || horizontalRow.row,
    values
  }
}

const checkWinningRow = (list) => {
  const row = list.find(row => row.length === 5)
  if (row) return { win: true, row }
  return { win: false, row: null}
}


main();


