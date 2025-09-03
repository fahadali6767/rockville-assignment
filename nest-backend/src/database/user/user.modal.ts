import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
export const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      lowercase: true,
      trim: true,
      required: true,
      unique: true,
      sparse: true,
    },

    address: { type: mongoose.Schema.Types.Mixed },
    name: {
      type: String,
    },
    dateOfBirth: {
      type: String,
      required: false,
    },

    profileImage: { type: String },
    role: {
      type: String,
      enum: ['ADMIN', 'USER'],
      required: true,
      default: 'USER',
    },

    password: {
      type: String,
    },
    favoriteCategories: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'categories' },
    ],
  },
  { timestamps: true },
);
// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
  if (!enteredPassword || !this.password) {
    throw new Error('Missing data for password comparison');
  }
  return await bcrypt.compare(enteredPassword, this.password);
};

// Encrypt password using bcrypt
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

userSchema.pre(
  /updateOne|findByIdAndUpdate|findOneAndUpdate/,
  async function (next) {
    const data = (this as any).getUpdate();
    if (data.password) {
      const salt = await bcrypt.genSalt(10);
      data.password = await bcrypt.hash(data.password, salt);
    }

    next();
  },
);

export interface User {
  matchPassword(password: any): unknown;
  _id: string;
  email: string;
  address?: any;
  name?: string;
  dateOfBirth?: string;
  profileImage?: string;
  role: 'ADMIN' | 'USER';
  password?: string;
}
