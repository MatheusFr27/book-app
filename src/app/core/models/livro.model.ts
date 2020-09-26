import { Autor } from './autor.model'

export interface Livro {
    _id: String,
    titulo: String,
    editora?: String,
    tipo: String,
    descricao: String,
    imagemF?: String,
    autor: Autor
}