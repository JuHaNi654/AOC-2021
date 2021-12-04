const { readFile } = require("fs");

const main = () => {
  try {
    readFile("./input.txt", "utf8", (err, data) => {
      if (err) throw err;
      let dataArray = data.split("\n");
      const oxygen = getRating(dataArray)
      const co2 = getRating(dataArray, true)

      console.log("Life support rating %s", (parseInt(oxygen, 2) * parseInt(co2, 2)))
    });
  } catch (err) {
    console.error(err);
  }
};

const getRating = (data, reverse = false) => {
  let rating = data
  let running = true
  let index = 0

  do {
    let regex = `(^\\d{${index}})`
    let x = rating.filter(bin => bin.match(new RegExp(`${regex}[1]`, "gm")))
    let y = rating.filter(bin => bin.match(new RegExp(`${regex}[0]`, "gm")))


    if (x.length > y.length) {
      rating = reverse ? y : x
    } else if (x.length < y.length) {
      rating = reverse ? x : y
    } else {
      rating = reverse ? y : x
    }
    index++
    if (rating.length <= 1) running = false
  } while (running)

  return rating[0]
}

main();