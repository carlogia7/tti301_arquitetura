require('dotenv').config()
const express = require('express')
const axios = require('axios')
const { PORT } = process.env
const {v4: uuidv4 } = require('uuid')
app = express()
app.use(express.json())


const observacoesPorLembreteId = {}

// GET - lembretes/idLembrete/observacoes
//exemplo: /lembretes/15/observacoes: isso dá acesso à coleção de observações apenas do lembrete de id igual a 15
app.get('/lembretes/:idLembrete/observacoes', (req, res) => {
    res.json(observacoesPorLembrete[req.params.idLembrete] || [])
})


// POST - lembretes/idLembrete/observacoes
app.post('/lembretes/:idLembrete/observacoes', async function(req, res){
    const idObservacacao = uuidv4()
    const { texto } = req.body
    const observacoesDoLembrete = observacoesPorLembrete[req.params.idLembrete] || []
    observacoesDoLembrete.push({id: idObservacacao, texto})
    //indexar a base geral de idLembrete e associar a coleção de observações
    observacoesPorLembrete[req.params.idLembrete] = observacoesDoLembrete
    // HATEOAS
    await axios.post("http://localhost:10000/eventos", {
      type: "ObservacaoCriada",
      payload: {
        id: idObservacacao, texto, lembreteId: req.params.idLembrete
      }
    })
    res.status(201).json(observacoesDoLembrete)
  
})
  
  
  app.post('/eventos', (req, res) => {
    console.log(req.body)
    res.status(200).json({mensagem: 'ok'})
})

app.listen(PORT, () => {
    console.log(`Observações. Porta ${PORT}`)
})