const dotenv = require('dotenv')
dotenv.config()
const axios = require('axios')

const PROTOCOL = process.env.PROTOCOL
const BASE_URL = process.env.BASE_URL
const Q = process.env.Q
const APP_ID = process.env.APP_ID
const LANG = process.env.LANG
const UNITS = process.env.UNITS


// Delimitar com crase para depois poder usar operador de interpolação
// Pacote dotenv = leitura do arquivo .env, configura os valores como variáveis de ambiente e acessar usando objeto global 'process'
const url = `${PROTOCOL}://${BASE_URL}?q=${Q}&appid=${APP_ID}&units=${UNITS}&lang=${LANG}`

axios
    .get(url)
    .then(res => {
        console.log(res)
        return res.data
    })
    .then(res => {
        console.log(res.cnt)
        return res
    })
    .then(res => {
        console.log(res["list"])
        return res.list
    })
    .then(res => {
        //pegar somente algumas informações
        for(let previsao of res){
            console.log(`
                ${new Date(previsao.dt * 1000).toLocaleString()},
                ${'Min: ' + previsao.main.temp_min}\u00B0C,
                ${'Max: ' + previsao.main.temp_max}\u00B0C,
                ${'Umid: ' + previsao.main.humidity}%,
                ${previsao.weather[0].description}
                `)

        }
        return res
    })
    .then(res => {
        //verifica quantas previsões tem sensação térmica acima de 30 graus
        const lista = res.filter(r => r.main.feels_like >= 30 )
        console.log(`${lista.length} previsões tem sensação térmica acima de 30 graus`)
    })
    .catch(err => console.log(err))