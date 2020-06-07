const express = require('express')
const server = express()

const db = require("./database/db")

server.use(express.static("public")) //Interpreta as requisições do source a arquivos da pasta public
server.use(express.urlencoded({extended: true})) //Habilita o uso do req.body na aplicação

const nunjucks = require("nunjucks") //Importando template engine
nunjucks.configure("source/views", {
    express: server,
    noCache: true
})

server.get('/', (req, res) => {
    return res.render("index.html")
}) //Envia o arquivo index.html renderizado pela engine como resposta à requisição da página localhost:3000/

server.get('/create-point', (req, res) => {
    //req.query //Query strings da url
    return res.render("create-point.html")
})

server.post('/savepoint', (req, res) => {
    //req.body //Corpo do formulário
    const query = `
    INSERT INTO places (
        name,
        image,
        address,
        address2,   
        state,
        city,
        items
    ) VALUES (?, ?, ?, ?, ?, ?, ?);
    `

    let values = [
        req.body.name,
        req.body.image,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function after_insert_data(err){
        if(err){
            return res.send("Erro no cadastro", {erro: true})
        }
        return res.render("create-point.html", {saved: true})
    }

    db.run(query, values, after_insert_data)

})

server.get('/search', (req, res) => {

    const search = req.query.search

    if(search == ""){
        return res.render("search.html", {totalPoints: 0})
    }

    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows){
        if(err){
            return console.log(err)
        }
        let total_points = rows.length
        return res.render("search.html", {places: rows, totalPoints: total_points})
    })//São retornados os dados do banco de dados na página html
})


server.listen(3000) //Liga o servidor no modo listen na porta 3000