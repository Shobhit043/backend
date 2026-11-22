const express = require('express');
const multer = require('multer');
const crypto = require('crypto')
const path = require('path');

const app = express();

app.use(express.urlencoded({extended: false}));
app.set("view engine", "ejs");
app.set("views", path.resolve('./views'));


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    crypto.randomBytes(16, function (err, raw) {
      if (err) return cb(err)
      cb(null, file.fieldname + '-' + raw.toString('hex'))
    })
  }
});
const upload = multer({storage: storage});

app.get('/', (req, res) => {
  res.render('homepage');
})
app.post('/upload', upload.single('profileImage'), (req, res) => {
  console.log(req.file);
  res.render('homepage');
});


app.listen(8000, () => {
  console.log('Server is running on http://localhost:8000');
});
