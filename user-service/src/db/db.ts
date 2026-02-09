import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string)
    console.log('[user-service] MongoDB conectado com sucesso.')
  } catch (error) {
    console.error('[user-service] ERROR:', error.message)
    process.exit(1)
  }
}