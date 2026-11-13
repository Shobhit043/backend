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
  // Only allow access if user is owner or admin
  if (req.user?.role === 'admin') {
    // admin can see all

  } else if (req.user && url.owner && url.owner.toString() === req.user._id.toString()) {
    // owner can see
  } else {
    return res.status(403).json({"error": "Forbidden: Not authorized to view this URL's analytics"});
  }
  console.log(typeof url);
  console.log(url);
  res.status(200).json({"clickCount": url.visitHistory.length});
}

async function getUserURLs(req, res) {
  try {
    if (req.user.role === 'admin') {
      return res.redirect('/admin/urls');
    }
    const urls = await URL.find({owner: req.user._id}).sort({createdAt: -1});
    res.status(200).render('home', {
      urls: urls,
      shortID: '',
      redirectURL: '',
      clickCount: 0,
      isAdmin: false
    });
  } catch (error) {
    res.status(500).json({"error": error});
  }
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
  const urlData = {
    shortID: shortID,
    redirectURL: redirectURL,
    visitHistory: []
  };
  if (req.user) {
    urlData.owner = req.user._id;
  }
  await URL.create(urlData);

  const urlDoc = await URL.findOne({shortID: shortID});
  const clickCount = urlDoc ? urlDoc.visitHistory.length : 0;

  const urls = req.user ? await URL.find({owner: req.user._id}).sort({createdAt: -1}) : [];

  res.status(200).render('home', {
    shortID,
    redirectURL,
    clickCount,
    urls,
    isAdmin: req.user?.role === 'admin'
  });
}

module.exports = {
  generateShortID,
  redirectRequest,
  getAnalytics,
  getUserURLs
}

