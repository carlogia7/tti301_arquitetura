require('dotenv').config()
const express = require('express')
const app = express()
app.use(express.json())
const { PORT } = process.env
// Endpoint = tripla (método, padrão de acesso e funcionalidade)

/*
{
  1: {
    id: 1,
    texto: 'Fazer café'
  },
  2: {
    id: 2,
    texto: 'ir à feira
  }
}
*/
const lembretes = {}
let id = 0

// GET - lembretes
app.get('/lembretes', (req, res) => {
    res.json(lembretes)
})

// POST - lembretes
app.post('/lembretes', (req, res) => {
    //identificador gerado com contador id++
    id++
    //gerar um identificador e pegar um obj da req {texto: 'fazer café'}
    const lembrete = {id, texto: req.body.texto}
    //adicionar à base, assim: {15: {id: 15, texto: fazer café}}
    lembretes[id] = lembrete
    //devolver o recurso criado e, mais ainda, ajustar o código de status para 201
    res.status(201).json(lembretes[id])
})

app.listen(PORT, () => console.log(`Lembrete. Porta ${PORT}`))