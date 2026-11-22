const { Schema, model } = require('mongoose');
const jwt = require('jsonwebtoken');

const { createHmac, randomBytes } = require('node:crypto');
const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    salt: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    profileImageURL: {
      type: String,
      default: './images/default.png',
    },
    role: {
      type: String,
      enum: ['USER', 'ADMIN'],
      default: 'USER',
    },
  },
  { timestamps: true },
);

userSchema.pre('save', function () {
  const user = this;
  if (!user.isModified('password')) {
    return;
  }
  const salt = randomBytes(16).toString();
  const hashedPassword = createHmac('sha256', salt).update(user.password).digest('hex');
  this.salt = salt;
  this.password = hashedPassword;
});

userSchema.static('findUserAndGenerateToken', async function (email, password) {
  // findOne() returns a Query, not a document - it must be awaited.
  const user = await this.findOne({ email });
  if (!user) {
    throw new Error('user not found');
  }
  const hashedPassword = createHmac('sha256', user.salt).update(password).digest('hex');
  if (user.password !== hashedPassword) {
    throw new Error('invalid username or password');
  }
  const token = jwt.sign(
    {
      id: user._id,
      name: user.fullName,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
  );
  return token;
});
const User = model('user', userSchema);
module.exports = User;
