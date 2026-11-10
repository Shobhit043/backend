const express = require('express')

const app = express()

app.get('/',(req, res) => {
  return res.send("Home page")
});

app.get('/about', (req, res) => {
  return res.send("About Page")
})

app.listen(3000, () => console.log("Server Started"))
