import express from "express"
import acesso from "./routes/acessoRouter.js"
import cors from "cors"
import mensagem from "./routes/mensagemRouter.js"

const app = express()
const porta = 3000

app.use(express.json())
app.use(cors())

app.use("/",acesso)
app.use("/logged/", mensagem)

app.listen(porta, ()=>{
    console.log(`Servidor rodando na porta ${porta}`)
})