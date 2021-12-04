const { readFile } = require('fs');

const main = () => {
  try {
    readFile('./input.txt', 'utf8', (err, data) => {
      if (err) throw err;
      const dataArray = data.split("\n")
      const status = {
        position: 0,
        depth: 0,
        aim: 0
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
  const { position, aim, depth } = status;

  switch (command) {
    case "forward":
      return { 
        position: position + value, 
        depth: depth + (aim * value)
      }
    case "down":
      return { aim: aim + value }
    case "up":
      return { aim: aim - value }
    default:
      return;
  }
}

main();


