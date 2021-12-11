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

      const x = coordinatesArray.reduce((sum, list) => {
        return sum += list.reduce((itemSum, item) => {
          if (item > 1) return itemSum +=  1
          return itemSum
        }, 0)
      }, 0)

      console.log("Total danger areas", x)
      let end = performance.now()
      console.log("Time in ms:", end - start)
    })
  } catch (err) {
    console.error(err)
  }
}



const printPath = (values, coordinatesArray) => {
  let [ [ x1, y1 ], [ x2, y2 ] ] = values
  if (x1 !== x2 && y1 !== y2) return coordinatesArray

  const [ lowY, highY ] = setLowHigh(y1, y2)
  const [ lowX, highX ] = setLowHigh(x1, x2);
  for (let i = 0; i <= highY; i++ ) {
    if (!coordinatesArray[i]) coordinatesArray[i] = []

    for (let j = 0; j <= highX; j++) {
      if (!coordinatesArray[i][j]) coordinatesArray[i][j] = 0

      if (j >= lowX && i >= lowY ) coordinatesArray[i][j] += 1
    }
  }

  return coordinatesArray
} 

const setLowHigh = (val1, val2) => {
  val1 = Number(val1)
  val2 = Number(val2)
  return val1 > val2 ? [ val2, val1 ] : [ val1, val2 ]
}

/* Different and way slower solution 

  const printPath = (values, coordinatesArray) => {
  let [ [ x1, y1 ], [ x2, y2 ] ] = values
  if (x1 !== x2 && y1 !== y2) return { result: coordinatesArray, updated: false }

  if (x1 === x2) { // Creating vertical line coordinates
    const [ lowY, highY ] = setLowHigh(y1, y2)
    for (let i = lowY; i <= highY; i++) {
      const obj = { x: Number(x1), y: i, hit: 1}

      if (coordinatesArray.length !== 0) {
        const { result, exists } = checkExistingCoordinates(coordinatesArray, obj)
        if (exists) {
          coordinatesArray = result
          continue;
        }
      }

      coordinatesArray.push(obj)
    }

  } else if (y1 === y2) { // Creating horizontal line coordinates
    const [ lowX, highX ] = setLowHigh(x1, x2);
    for (let i = lowX; i <= highX; i++) {
      const obj = { x: i, y: Number(y1), hit: 1 }

      if (coordinatesArray.length !== 0) {
        const { result, exists } = checkExistingCoordinates(coordinatesArray, obj)
        if (exists) {
          coordinatesArray = result
          continue;
        }
      }

      coordinatesArray.push(obj)
    }
  }

  return { result: coordinatesArray, updated: true }
} 

const checkExistingCoordinates = (list, item) => {
  let exists = true;
  const listLength = list.length
  let i = 0
  while (i < listLength) {
    const point = list[i];

    if (point.x === item.x && point.y === item.y) {
      list[i] = { ...point, hit: (point.hit + 1) }
      break;
    }
    if (i === listLength - 1) exists = false;
    i++
  }

  return { result: list, exists }
}


 */
main();
