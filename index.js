const express = require('express');
const expressMongoDb = require('express-mongo-db');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(expressMongoDb('mongodb://localhost/estacaohack'));
app.use(bodyParser());
app.use(cors());

app.get('/eventos', function(req, res){
    req.db.collection('eventos').find().toArray(function(erro, dados){
        if(erro){
            res.status(500).send('Um erro ocorreu!');
            return;
        }

        res.send(dados);
    });
});

app.post('/newsletter', function(req, res){
    req.db.collection('newsletter').insert(req.body, function(erro, dados){
        if(erro){
            res.status(500).send('Um erro ocorreu!');
            return;
        }
        
        res.send('Dados inseridos!');
    });
});

app.listen(3000, function(){
    console.log('Servidor inicializado na porta 3000');
});