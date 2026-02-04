import argon2 from 'argon2'
import mongoose from 'mongoose'
const { Schema } = mongoose

const userSchema = new Schema({
  fullName: { type: String, required: true},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true},
  createdAt: { type: Date, default: Date.now },
})

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next()

  try {
    this.password = await argon2.hash(this.password)
    next()
  } catch (error) {
    return next(error)
  }
})

export const User = mongoose.model('User', userSchema)