const { readFile } = require('fs');
const { performance } = require('perf_hooks');

const main = () => {
  try {
    readFile('./input.txt', 'utf8', (err, data) => {
      if (err) throw err;
      const dataArray = data.split("\n")
      const status = {
        position: 0,
        depth: 0
      }

      for (const val of dataArray) {
        const [command, value] = val.split(/\s+/)
        Object.assign(status, callCommand(command, Number(value), status))
      }  
      console.log("Final depth is %s", (status.position * status.depth))
    })
  } catch (err) {
    console.error(err)
  }
}

const callCommand = (command, value, status) => {
  switch (command) {
    case "forward":
      return status.position = status.position + value;
    case "down":
      return status.depth = status.depth + value
    case "up":
      return status.depth = status.depth - value
    default:
      return;
  }
}

main();


