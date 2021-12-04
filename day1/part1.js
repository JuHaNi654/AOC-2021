const { readFile } = require('fs');
const main = () => {
  try {
    readFile('./depth.txt', 'utf8', (err, data) => {
      if (err) throw err;
      const dataArray = data.split("\n")
      let finalSum = 0;
      let previous = null

      for ( const val of dataArray) {
        const current = Number(val)
        if (previous && previous < current) finalSum++
        previous = current
      }  

      console.log("Final depth is %s", finalSum)
    })
  } catch (err) {
    console.error(err)
  }
}

main();

