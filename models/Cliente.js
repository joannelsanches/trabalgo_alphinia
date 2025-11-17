import conexao from '../config/conexao.js'

const Cliente = conexao.Schema({
        nome: {
        type: String,
        required: true,
    },
    dataNascimento: { 
        type: Date,
        required: true,
    },
    endereco: {
        type: String,
        required: true,
    },
    telefone: {
        type: String,
        required: true,
    },
    cpf: {
        type: String,
        required: true,
    },
    senha: {
        type: String,
        required: true,
    }
});

export default conexao.model('Cliente',Cliente)