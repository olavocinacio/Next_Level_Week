const sqlite3 = require('sqlite3').verbose() //Importando sqlite3 com um método que printa no teminal um relatório de ações
const db = new sqlite3.Database("./Source/database/database.db") //Cria o objeto responsável pelas operações no banco de dados

module.exports = db //Exporta o objeto db para que possa ser utilizado pela aplicação

//db.serialize(() => {

//     db.run(`
//         CREATE TABLE IF NOT EXISTS places (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             name TEXT,
//             image TEXT,
//             address TEXT,
//             address2 TEXT,
//             state TEXT,
//             city TEXT,
//             items TEXT
//         );
//     `)//Se a tabela places não existe, ela é criada

//     const query = `
//         INSERT INTO places (
//             name,
//             image,
//             address,
//             address2,
//             state,
//             city,
//             items
//         ) VALUES (?, ?, ?, ?, ?, ?, ?);
//     ` //Inserindo dados na tabela. O caracter "?" possibilita a troca dinâmica dos valores (Como se fossem variáveis)
    
//     let values = [
//         "Papersider",
//         "https://images.unsplash.com/photo-1516992654410-9309d4587e94?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60",
//         "Guilherme Gemballa, Jardim América",
//         "Nº 260",
//         "Santa Catarina",
//         "Rio do Sul",
//         "Papéis e papelão"
//     ]

//     function after_insert_data(err){
//         if(err){
//             return console.log(err)
//         }
        
//         console.log("Cadastrado com sucesso")
//         console.log(this)
//    }//Função que retorna erro no console caso o cadastro não tenha sido bem sucedido

    //db.run(query, values, after_insert_data)//O array fará a troca das interrogações pelos valores correspondentes

    // db.all(`SELECT * FROM places`, function(err, rows) {
    //     if(err){
    //         return console.log(err)
    //     }
    //     console.log("Aqui está seu registo")
    //     console.log(rows)
    // })//Consultar dados da tabela

    // db.run(`DELETE FROM places WHERE id = ?`, [6], function(err){
    //     if(err){
    //         return console.log(err)
    //     }
    //     console.log("Registro deletado com sucesso")
    // })//Deleta o item de id desejado

//}) //utilizando o objeto nas operações