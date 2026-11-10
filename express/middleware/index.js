const express = require('express');
const app = express();
PORT = 8000;

// this is a middleware that fills req.body with the json content when content type is application/json
app.use(express.json());

// custom middlware which have req, res, next(next middleware or route)
app.use((req, res, next) => {
  console.log("request = ", req);
  console.log("response = ", res);
  console.log("next = ", next);
});

app.get('/',(req, res) => {
  console.log('request completed');
  res.set(
    {
      'Content-Type': 'text/plain',
      'Content-Length': '123',
       ETag: '12345',
    }
  );
  res.status(200).send("OK");
  res.end();
})



app.listen(PORT,() => {
  console.log(`server started http://localhost:${PORT}/`);
});
