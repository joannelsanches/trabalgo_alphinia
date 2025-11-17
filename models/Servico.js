import conexao from '../config/conexao.js'

const Servico = conexao.Schema({
    descricao: {
        type: String,
        required: true,
    },
    valor: {
        type: Number,
        required: true,
    }
});

export default conexao.model('Servico',Servico)