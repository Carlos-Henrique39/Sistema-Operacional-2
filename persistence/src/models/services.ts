import { MariaDBDataSource } from "./data_source";
import {Venda} from "./venda";
import {Usuario} from "./usuario";
import { Like } from "typeorm";

export class Service{    
    start(){       
            MariaDBDataSource.initialize().then( ()=>{
                console.log("Inicializada a fonte de dados...");
            }).catch((err)=>{
                console.error("Erro de inicialização da fonte de dados!!");
            }) 
    }
    async AddVenda(venda: Venda){
        await MariaDBDataSource.manager.save(venda);        
    }
    async ListVendas(){
       let list = await MariaDBDataSource.manager.find(Venda);
       return list;
    }
    
    async ListVendasPorNome(nome){
        let list = await MariaDBDataSource.manager.findBy(Venda, {nome});
        return list;
    }
 
    async AddUsuario(usuario: Usuario){
        await MariaDBDataSource.manager.save(usuario);        
    }
    async ListUsuarios(){
       let list = await MariaDBDataSource.manager.find(Usuario);
       return list;
    }
    async Login(usuario, senha){
        let list = await MariaDBDataSource.manager.findOneBy(Usuario, {usuario, senha});
        return list;
    }
}

