const mongoose = require('mongoose');
const {timeStamp} = require('node:console');

const urlSchema = new mongoose.Schema(
  {
    shortID : { type: String, unique: true },
    redirectURL : { type: String, required: true },
    visitHistory: [
      {
        timestamp: {
          type: Number
        }
      }
    ],
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false
    }
  },
  { timeStamp: true }
);

const URL = mongoose.model(
  "url",
  urlSchema
);

module.exports = URL;


