import { Livro } from './livro.model'

export interface Autor {
    _id: String
    nome: String
    idade?: Number
    biografia?: String
    imagemA?: String
    autoria?: Livro[]
}