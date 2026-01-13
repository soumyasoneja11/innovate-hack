import express, { Request, Response } from "express"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.get("/api/health", (_req: Request, res: Response) => {
  res.json({ status: "ok" })
})

const PORT: number = Number(process.env.PORT) || 3000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})