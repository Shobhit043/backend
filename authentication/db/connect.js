const mongoose = require('mongoose');

async function connectToDB(urlDB){
  return mongoose.connect(urlDB);
}

module.exports = {
  connectToDB
};
