import express from "express"
import db from "../db.js"
import jwt from "jsonwebtoken"

const router = express.Router()

async function logar(req,res) {
    try {
        const {email,senha} = req.body
        const [resultado] = await db.query("SELECT * FROM usuarios WHERE email = ? AND senha = ?", [email,senha])
        if (resultado.length > 0) {
            const acesso = jwt.sign({
                id: resultado.id,
                email: email},
            "segredo",
            { expiresIn : "1h"})
            return res.status(200).json({message: "logado com sucesso",token: acesso})
        } else {
            return res.status(401).json({message: "Usuario inexistente"})
        }
    } catch (erro) {
        console.error(erro)

    }
}


async function cadastrar(req,res) {
    try {
        const {email,senha,nome} = req.body
        const [resultado] = await db.query("INSERT INTO usuarios(nome,email,senha) VALUES(?,?,?)", [nome,email,senha])
        if (resultado.affectedRows > 0) {
            res.status(201).json({message: "Cadastrado com sucessso"})
        }
    } catch (erro) {
        console.error(erro)
        res.send(400).json({message: "Erro ao cadastrar"})
    }
}

router.post('/login', logar)
router.post('/cadastro', cadastrar)

export default router