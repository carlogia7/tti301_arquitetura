require('dotenv').config()
const express = require('express')
const { PORT } = process.env
const {v4: uuidv4 } = require('uuid')
app = express()
app.use(express.json())


const observacoesPorLembreteId = {}

// GET - lembretes/idLembrete/observacoes
app.get('/lembretes/:id/observacoes', (req, res) => {
    res.status(200).send(observacoesPorLembreteId[req.params.id] || [])
})



// POST - lembretes/idLembrete/observacoes
app.post('/lembretes/:id/observacoes', (req, res) => {
    // gera o identificador
    const idObs = uuidv4()
    // "desestruturando" o conteúdo
    const { texto } = req.body
    // req.params da acesso à lista de parâmetros da URL
    //se retornar null gera um cara vazio, se exister retorna o número da id
    const observacoesDoLembreteId = 
        observacoesPorLembreteId[req.params.id] || []
    observacoesDoLembreteId.push({id: idObs, texto})
    observacoesPorLembreteId[req.params.id] = 
        observacoesDoLembreteId
    // RESUMO: gera um ID do texto que veio na requisição, manda pegar no vetor as obs que ja existiam la pra este determinado id e se 
    // n tiver cria = vazio ai depois adiciona um JSON com id gerado e o texto recebido, pega ele e coloca de volta na base 
    res.status(201).send(observacoesDoLembreteId)
}) 

app.listen(PORT, () => {
    console.log(`Observações. Porta ${PORT}`)
})