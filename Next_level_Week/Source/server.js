const express = require('express')
const server = express()

server.use(express.static("public")) //Interpreta as requisições do source a arquivos da pasta public

const nunjucks = require('nunjucks') //Importando template engine
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

server.get('/', (req, res) => {
    return res.render("index.html")
}) //Envia o arquivo index.html renderizado pela engine como resposta à requisição da página localhost:3000/

server.get('/create-point', (req, res) => {
    return res.render("create-point.html")
})


server.listen(3000) //Liga o servidor no modo listen na porta 3000