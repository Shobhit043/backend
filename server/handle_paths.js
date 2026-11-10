const http = require('http')
const url = require('url')

server = http.createServer((req, res) => {
  const path = req.url
  switch (path){
    case "/":
      res.end("home page")
      break
    case "/about":
      res.end("About page")
      break
  }
})
PORT = 3000
server.listen(PORT, () => {
  console.log(`the server has started at http://localhost:${PORT}`)
})
