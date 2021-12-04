const { readFile } = require("fs");
const main = () => {
  try {
    readFile("./input.txt", "utf8", (err, data) => {
      if (err) throw err;

      const values = {};
      let gammaRate = "";
      let epsilonRate = "";
      const dataArray = data.split("\n");

      for (const val of dataArray) {
        val.split("").forEach((bit, i) => {
          if (!values[i] || !values[i][bit]) {
            return values[i] = { ...values[i], [bit]: 1} 
          }

          return values[i] = { ...values[i], [bit]: values[i][bit] + 1 }
        });
      }

      Object.values(values).forEach((bit) => {
        if (bit["0"] > bit["1"]) {
          gammaRate += "0";
          epsilonRate += "1";
        } else {
          gammaRate += "1";
          epsilonRate += "0";
        }
      });

      console.log(
        "Power consumption is %s",
        parseInt(gammaRate, 2) * parseInt(epsilonRate, 2)
      );
    });
  } catch (err) {
    console.error(err);
  }
};


main();


