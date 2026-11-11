const express = require('express');
const {nanoid} = require('nanoid');
const URL = require('../db/models/url');

function normalizeUrl(url) {
  if (!url) return url;
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return 'http://' + url;
  }
  return url;
}

async function redirectRequest(req, res) {
  const shortID = req.params.id;
  const url = await URL.findOneAndUpdate({
    shortID: shortID
  }, {
    $push: {
      visitHistory: {timestamp: Date.now()}
    }
  });

  if (!url) {
    res.status(404).send("URL not found");
    return;
  }
  res.redirect(normalizeUrl(url.redirectURL));
}

async function getAnalytics(req, res) {
  const shortID = req.params.id;
  const url = await URL.findOne({
    shortID: shortID
  });
  if (!url) {
    res.status(400).json({"error": "shortID not found in DB"});
    return;
  }
  console.log(typeof url);
  console.log(url);
  res.status(200).json({"clickCount": url.visitHistory.length});
}

async function generateShortID(req, res) {
  let redirectURL = normalizeUrl(req.body.url);
  if (!redirectURL) {
    res.status(400).json({
      "error": "body must contain url"
    });
    return;
  }
  let shortID = nanoid(8);
  await URL.create({
    shortID: shortID,
    redirectURL: redirectURL,
    visitHistory: []
  });

  const urlDoc = await URL.findOne({ shortID: shortID });
  const clickCount = urlDoc ? urlDoc.visitHistory.length : 0;

  res.status(200).render('home', {
    shortID,
    redirectURL,
    clickCount
  });
}

module.exports = {
  generateShortID,
  redirectRequest,
  getAnalytics
}

