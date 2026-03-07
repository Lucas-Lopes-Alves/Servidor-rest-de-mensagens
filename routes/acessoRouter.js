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
                email: resultado.email},
            "segredo",
            { expiresIn : "1h"})
            return res.status(200).json({status: "Logado com sucesso",token: acesso})
        } else {
            return res.status(401).json({status: "Usuario inexistente"})
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
            res.status(201).json({status: "Cadastrado com sucessso"})
        } else {
            res.status(401).json({status: "Erro ao cadastrar"})
        }
    } catch (erro) {
        if (erro.code === "ER_DUP_ENTRY"){
            res.status(400).json({status: "Email ou nome de usuario indisponivel"})
        }
    }
}

router.post('/login', logar)
router.post('/cadastro', cadastrar)

export default router