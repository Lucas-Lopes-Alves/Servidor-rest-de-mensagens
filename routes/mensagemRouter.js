import express from "express"
import db from  "../db.js"
import jwt from "jsonwebtoken"

const router = express.Router()

async function enviarMensagem(req,res,next) {
    const bearer = req.headers.authorization
    const token = bearer.split(" ")[1]
    const webToken = jwt.verify(token, "segredo")
}

router.post('/enviar',enviarMensagem)

export default router