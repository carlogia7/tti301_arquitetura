require('dotenv').config()
const express = require('express')
app = express()
app.use(express.json())
const { PORT } = process.env

const baseConsulta = {}

const funcoes = {
    LembreteCriado: (lembrete) => {
        baseConsulta[lembrete.id] = lembrete
    },
    ObservacaoCriada: (observacao) => {
        const observacoes = baseConsulta[observacao.lembreteId]["observacoes"] || []
        observacoes.push(observacao)
        baseConsulta[observacao.lembreteId]["observacoes"] = observacoes
    }
}

app.get('/lembretes', (req, res) => {
    res.status(200).send(baseConsulta)
})

app.post('/eventos', (req, res) => {
    funcoes[req.body.type](req.body.payload)
    res.status(200).send(baseConsulta)
})

app.listen(PORT, () => {
    console.log(`Consultas. Porta ${PORT}`)
})