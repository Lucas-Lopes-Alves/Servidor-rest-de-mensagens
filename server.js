import express from "express"
import acesso from "./routes/acessoRouter.js"
import cors from "cors"
import mensagem from "./routes/mensagemRouter.js"
import get from "./routes/getRouter.js"

const app = express()
const porta = 3000

app.use(express.json())
app.use(cors())

app.use("/",acesso)
app.use("/logged/", mensagem)
app.use(get)

// app.listen(porta, ()=>{
//     console.log(`Servidor rodando na porta ${porta}`)
// })

export default app