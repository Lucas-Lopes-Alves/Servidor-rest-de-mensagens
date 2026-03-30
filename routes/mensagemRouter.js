import express from "express"
import db from "./db.js"
import jwt from "jsonwebtoken"

const router = express.Router()


/*
    função que envia a mensagem do usuario para o banco de dados
    e caso o usúario não exista ou o token esteja expirado
    o envio da mensagem não será realizado
*/
async function enviarMensagem(req, res) {
    const bearer = req.headers.authorization
    const token = bearer.split(" ")[1]
    const webToken = jwt.verify(token, process.env.SECRET)

    const message = req.body.mensagem

    const [query] = await db.execute("SELECT * FROM usuarios WHERE email = ?", [webToken.email])
    if (query.length > 0) {
        const id = query[0].id
        const insert = await db.execute("INSERT INTO mensagens(id_usuario,mensagem) VALUES(?,?)", [id, message])
        res.status(201).json({ message: "Mensagem enviada" })
    } else {
        res.status(401).json({ message: "Usuario inexistente" })
    }
    
}

router.post('/enviar', enviarMensagem)

export default router