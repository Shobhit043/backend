// const {add, sub} = require("./math")
//
// There are also many built in packages for example "fs", "http" etc.
const math = require("./math")


console.log("hello world")
// console.log(window) window and other ui related features have been removed from node and only core functionalities are kept
// mainly server side needed functionalities are being kept


// whenever we start a node project, we should do npm init which initialize the directory and create package.json which is like config file
//
// we can add scripts in this config to start our project

console.log("sum of a and b = ",math.add(2, 5))
