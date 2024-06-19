/*
Exemplo simples de um serviço web para inserção e listagem de dados em um
SGBD relacional, utilizando typeORM.
Autor: Fabrício G. M. de Carvalho, Ph.D
*/

/* importando o express */
const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');
const app = express();

/* Em uma mesma máquina, aplicações web diferentes devem ser executadas
em portas diferentes.*/
const port = 5000;

/* importando o modelo */
import { Venda} from "./models/venda"
import { Usuario} from "./models/usuario"
/* importanto o data source inicializado */
import { Service} from "./models/services"



/* Configuração para leitura de parâmetros em requisição do tipo post em form */
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json({ type: '*/*' }));
/* Habilitação de requisições partindo de outras aplicações */
app.use(cors({
    oringin: '*',
    credentials: true
})); 

/* Inicializando a fonte de dados via serviço: */
var service = new Service();
service.start();

/* Criação das rotas para o serviço. */
app.get('/listVendas', listVendas);
app.post('/addVenda', addVenda);
app.post('/listVendasPorNome', ListVendasPorNome);
app.get('/listUsuarios', listUsuarios);
app.post('/addUsuario', addUsuario);
app.post('/login', Login);



/* Execução do servidor */

/* Tratadores de requisição */

/* Tratador de listagem */
async function listVendas(req, res){ 
    console.log("Requisição de listagem recebida."); //Para debug somente.
    let venda = await service.ListVendas();  
    let vnd_list = JSON.stringify(venda);
    res.setHeader('Content-Type', 'application/json');
    res.end(vnd_list);     
}

/* Tratador de adição */
async function addVenda(req,res){
    try{
        console.log("Requisição de inserção recebida.."); // Para debug somente.
        let nova_venda = new Venda();  
        for(let key in req.body){
            nova_venda[key] = req.body[key];
        } 
        await service.AddVenda(nova_venda);
        let nova_venda_i = JSON.stringify(nova_venda);
        res.setHeader('Content-Type', 'application/json');
        res.end(nova_venda_i);     
    } catch {
        res.end("Venda não cadastrada!");
    } 
}


async function ListVendasPorNome(req, res){ 
    let nome_venda = req.body.nome;
    let venda = await service.ListVendasPorNome(nome_venda);  
    let venda_list = JSON.stringify(venda);
    res.setHeader('Content-Type', 'application/json');     
    if(venda == null){
        console.log("Venda não existe");
        res.send("Venda não existe"); 
    } else{
        console.log("Listagem concluida."); 
        res.end(venda_list);   
    }         
}

async function listUsuarios(req, res){ 
    console.log("Requisição de listagem recebida."); //Para debug somente.
    let usuario = await service.ListUsuarios();  
    let usr_list = JSON.stringify(usuario);
    res.setHeader('Content-Type', 'application/json');
    res.end(usr_list);     
}

/* Tratador de adição */
async function addUsuario(req,res){
    try{
        console.log("Requisição de inserção recebida.."); // Para debug somente.
        let novo_usuario = new Usuario();  
        for(let key in req.body){
            novo_usuario[key] = req.body[key];
        } 
        await service.AddUsuario(novo_usuario);
        let novo_usuario_i = JSON.stringify(novo_usuario);
        res.setHeader('Content-Type', 'application/json');
        res.end(novo_usuario_i);   
    }  
    catch{
        res.end("Cadastro não realizado!");
    } 
}

async function Login(req, res){ 
    try{    
        let usuario = req.body.usuario;
        let senha = req.body.senha
        let usuario_d = await service.Login(usuario, senha);  
        let usr_list = JSON.stringify(usuario_d);
        res.setHeader('Content-Type', 'application/json');  
        if(usuario_d == null){
            console.log("Usuário não existe!");
            res.send("Usuário não existe!"); 
        } else{
            console.log("Listagem concluida."); 
            res.end(usr_list);   
        } 
    } catch{
        res.end("login não realizado!");
    }    
}

app.listen(port, listenHandler);

function listenHandler(){
    console.log(`Escutando na porta ${port}!`);
}