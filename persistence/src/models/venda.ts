import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Venda {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nome: String

    @Column()
    foto: String

    @Column()
    descricao: String

    @Column()
    valorDeCompra: Number

    @Column()
    valorDeVenda: Number

    @Column()
    quantidadeDeEstoque: Number

    @Column()   
    estoqueMinimo: Number

    @Column()
    categoria: String

    @Column()
    localDoEstoque: String

    @Column()
    informacoes: String
}