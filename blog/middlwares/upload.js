const fs = require('node:fs');
const path = require('node:path');
const multer = require('multer');

const uploadDir = path.join(__dirname, '..', 'public', 'uploads');
fs.mkdirSync(uploadDir, { recursive: true });

const EXTENSION_BY_MIME = {
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/gif': '.gif',
  'image/webp': '.webp',
  'image/avif': '.avif',
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = EXTENSION_BY_MIME[file.mimetype] || '.img';
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 3 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!EXTENSION_BY_MIME[file.mimetype]) {
      return cb(new Error('Only JPEG, PNG, GIF, WebP or AVIF images are allowed.'));
    }
    cb(null, true);
  },
});

const uploadCoverImage = (req, res, next) => {
  const multerMiddleware = upload.single('coverImage');
  return multerMiddleware(req, res, (err) => {
    if (err) {
      const message =
        err.code === 'LIMIT_FILE_SIZE' ? 'Image is too large (max 3 MB).' : err.message;
      return res.status(400).send(message);
    }
    next();
  });
};

module.exports = uploadCoverImage;
