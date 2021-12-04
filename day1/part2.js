const { readFile } = require('fs');

const main = () => {
  try {
    readFile('./depth.txt', 'utf8', (err, data) => {
      if (err) throw err;
      const dataArray = data.split("\n")
      let finalSum = 0;
      let previous = null

      for (let i = 0; i < dataArray.length; i++) {
        const val1 = Number(dataArray[i])
        const val2 = Number(dataArray[i + 1])
        const val3 = Number(dataArray[i + 2])

        if (!val2 || !val3)  break;

        const sum = val1 + val2 + val3

        if (previous && previous < sum) finalSum++;

        previous = sum
      }

      console.log("Final depth is %s", finalSum)
    })
  } catch (err) {
    console.error(err)
  }
}

main();

