import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true
    })
)

// common middleware
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded( {extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

// bring in routes
import healtcheckRouter from "./routes/healthcheck.routes.js"

// routes
app.use("/api/v1/healthCheck", healtcheckRouter)

export { app }