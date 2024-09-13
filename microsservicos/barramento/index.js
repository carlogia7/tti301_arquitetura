require('dotenv').config()
const express = require('express')
const axios = require('axios')
const app = express()
app.use(express.json())

const { PORT } = process.env


//Endpoint = POST /eventos
app.post('/eventos', (req, res) => {
    //1. pega corpo da req 
    const evento = req.body
    //2. envia para o mss de observações na 4000 (post /eventos)
    axios.post('http:localhost:4000/eventos', evento)
    //2. envia para o mss de lembretes na 5000 (post /eventos)
    axios.post('http:localhost:5000/eventos', evento)
    // envia para o mss de consultas na porta 6000 (post /eventos)
    axios.post('http://localhost:6000/eventos', evento)
    //2. encerra com code 200
    res.status(200).json({mensagem: 'ok'})
})




app.listen(PORT, () => console.log(`Barramento. Porta ${PORT}.`))