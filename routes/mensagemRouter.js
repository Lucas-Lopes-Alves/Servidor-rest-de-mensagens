import express from "express"
import db from  "../db.js"

const router = express.Router()

async function enviarMensagem(req,res,next) {
    const token = req.headers.authorization.split(" ")[1]
    console.log(token)
}

export default router