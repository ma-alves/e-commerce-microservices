import express from 'express'
import connectDB from './src/db/db'

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

const startServer = async () => {
  try {
    // await connectDB()
    Promise.all([connectDB])
    // log aqui
    
    app.listen(port, () => {
      console.log(`[user-service] Servidor rodando em localhost:${port}`)
    })

  } catch (error) {
    console.error('[user-service] Erro ao iniciar servidor:', error.message)
    process.exit(1)
  }
}

startServer()