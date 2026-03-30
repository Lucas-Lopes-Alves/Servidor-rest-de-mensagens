import express from "express"
import db from "./db.js"
import jwt from "jsonwebtoken"

const router = express.Router()


/*
    função que autoriza o acesso do usúario
    e envia o token de acesso se esse login
    existir no banco de dados
*/
async function logar(req,res) {
    try {
        const {email,senha} = req.body
        const [resultado] = await db.execute("SELECT * FROM usuarios WHERE email = ? AND senha = ?", [email,senha])
        if (resultado.length > 0) {
            const acesso = jwt.sign({
                email: resultado[0].email},
            process.env.SECRET,
            { expiresIn : "1h"})
            return res.status(200).json({message: "Logado com sucesso",token: acesso})
        } else {
            return res.status(401).json({message: "Usuario inexistente"})
        }
    } catch (erro) {
        console.error(erro)
    }
}

/*
    função que cria um cadastro de usúario no banco de dados
    e retorna o codigo de status 201 indicando sucesso 
    e caso o email já exista, retornará a mensagem dizendo que 
    o nome ou email está indisponivel com o codigo de status
    401 indicando falha
*/
async function cadastrar(req,res) {
    try {
        const {email,senha,nome} = req.body
        const [resultado] = await db.execute("INSERT INTO usuarios(nome,email,senha) VALUES(?,?,?)", [nome,email,senha])
        if (resultado.affectedRows > 0) {
            return res.status(201).json({message: "Cadastrado com sucessso"})
        } else {
            return res.status(401).json({message: "Erro ao cadastrar"})
        }
    } catch (erro) {
        console.error(erro)
        if (erro.code === "ER_DUP_ENTRY"){
            res.status(400).json({message: "Email ou nome de usuario indisponivel"})
        }
    }
}

router.post('/login', logar)
router.post('/cadastro', cadastrar)

export default router