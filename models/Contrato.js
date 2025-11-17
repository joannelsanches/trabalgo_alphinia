import conexao from '../config/conexao.js'

const Contrato = conexao.Schema({
   cliente: {
        type:conexao.Types.ObjectId, 
        ref: 'Cliente',
        required:true
    },
    quarto: {
        type:conexao.Types.ObjectId,
        ref: 'Quarto',
        required: true
    },
    data_inicio: {
        type: Date,
        required: true
    },
    data_fim: {
        type: Date,
        required: true
    },
    valor: {
        type: Number,
        required: true
    }
});

export default conexao.model('Contrato',Contrato)