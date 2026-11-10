const http = require("http")

const server = http.createServer((req, res)=>{
  console.log("request header - ", req.headers)
  res.writeHead(200, { 'content-type':'text/plain' });
  userAgent = req.headers['user-agent']
  accept = req.headers['accept']
  //res.end("hello world\n")
  res.end(`User-Agent: ${userAgent}\nAccept-Language: ${accept}\n`);
});

const PORT = 3000;

server.listen(PORT, 'localhost', () => {
  console.log(`server running at http://localhost:${PORT}/`)
})

