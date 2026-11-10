function add(a, b){
  return a + b;
}
function sub(a, b){
  return a - b
}
module.exports = {
  add,
  sub
};

// another way to export is using exports.name = arrow_function

// exports.add = (a, b) => a+b;
