class Projeto{
    
    constructor(numeroRegistro, titulo, assunto, autor, dataDePublicacao){
        this.numeroRegistro = numeroRegistro;
        this.titulo = titulo,
        this.assunto = assunto;
        this.autor = autor;
        this.dataDePublicacao = dataDePublicacao;
    }
}

module.exports = {
    Projeto: Projeto
}  