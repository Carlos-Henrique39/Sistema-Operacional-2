
const express = require('express')
// const session = require('express-session')
const app = express();
const port = 3000;
const request = require('request');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json({ type: '*/*' }));

const axios = require('axios');

const modelo = require('./models/vendas');
var Venda = modelo.Venda;

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('public'));

app.get('/login', addLoginForm);

function addLoginForm(req,res){
    res.render('login/login.ejs'); 
}

app.get('/cadastrousuario', addCadastroUsuarioForm);

function addCadastroUsuarioForm(req,res){
    res.render('login/cadastroUsuario.ejs'); 
}

app.get('/home', home);

function home(req, resp){
    try{
    let vendas = [];
    request('http://localhost:5000/listVendas', 
            { json: true }, (err, res, body) => {
                if (err) { 
                    return console.log(err); 
                } else {                    
                    res.body.forEach((item)=>{
                        let venda = new Venda(item.nome, item.foto, item.descricao, item.valorDeVenda, item.categoria, item.informacoes);
                        vendas.push(venda);
                    }); 
                    resp.render('user/home.ejs',{lista_vendas: vendas});                    
                }               
    });    
    }
    catch(e){
        console.log(e)
    }
}

app.get('/cadastrovenda', addCadastroVenda);

function addCadastroVenda(req,res){
    res.render('user/cadastroVenda.ejs'); 
}

app.post('/busca', busca);

function busca(req, resp){
    var res_data_i = {
        "nome": req.body.nome  
    }   

    let vendas = [];
            
    axios.post('http://localhost:5000/listVendasPorNome', res_data_i)
    .then(function (response) {   
        if(response.data.nome){
            res.body.forEach((item)=>{
                let venda = new Venda(item.nome, item.foto, item.descricao, item.valorDeVenda, item.categoria, item.informacoes);
                vendas.push(venda);  
            });       
            resp.render('user/busca.ejs',{lista_vendas: vendas});   
        } else{ 
            resp.render('user/home.ejs',{lista_vendas: []});
        }          
    })
    .catch(function (error) {
        console.log(error); 
    });
}

app.use((req, res, next) => {
    if (req.hostname === 'localhost') {
        res.redirect('/login');
    } else {
        next();
    }
});

app.listen(port, listenHandler);

function listenHandler(){
    console.log(`Executando na porta ${port}!`);
}