const { readFile } = require('fs');
const { performance } = require("perf_hooks")


// Slow execution time :(
const main = () => {
  try {
    readFile('./input.txt', 'utf8', (err, data) => {
      if (err) throw err;
      let start = performance.now();
      const dataArray = data.split("\n")
      const coordinates = dataArray.map(x => x.split("->").map(y => y.trim().split(",")))
      let coordinatesArray = []

      for (const path of coordinates) {
        coordinatesArray = printPath(path, coordinatesArray)
      }

      const dangerAreas = coordinatesArray.reduce((sum, list) => {
        return sum += list.reduce((itemSum, item) => {
          if (item > 1) return itemSum +=  1
          return itemSum
        }, 0)
      }, 0)

      console.log("Total danger areas", dangerAreas)
      let end = performance.now()
      console.log("Time in ms:", end - start)
    })
  } catch (err) {
    console.error(err)
  }
}



const printPath = (values, coordinatesArray) => {
  let [ [ x1, y1 ], [ x2, y2 ] ] = values

  let startX = Number(x1), endX = Number(x2)
  let startY = Number(y1), endY = Number(y2)

  let [ lowY, highY ] = setLowHigh(startY, endY)
  let [ lowX, highX ] = setLowHigh(startX, endX);

  if (x1 === x2 || y1 === y2) { // Horizontal or Vertical
    for (let i = 0; i <= highY; i++ ) {
      if (!coordinatesArray[i]) coordinatesArray[i] = []
  
      for (let j = 0; j <= highX; j++) {
        if (!coordinatesArray[i][j]) coordinatesArray[i][j] = 0
        if (j >= lowX && i >= lowY ) coordinatesArray[i][j] += 1
      }
    }
  } else { // Diagonal
    let active = true
    while (active) {
      if (startX === endX || startY === endY) active = false;

      if (!coordinatesArray[startY]) coordinatesArray[startY] = []
      if (!coordinatesArray[startY][startX]) coordinatesArray[startY][startX] = 1
      else coordinatesArray[startY][startX] += 1
      
      if (startY < endY) startY++
      if (startX < endX) startX++
      if (startY > endY) startY--
      if (startX > endX) startX--
    }
  }

  return coordinatesArray
} 

const setLowHigh = (val1, val2) => {
  return val1 > val2 ? [ val2, val1 ] : [ val1, val2 ]
}

main();
