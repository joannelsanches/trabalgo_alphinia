import conexao from '../config/conexao.js'

const Quarto = conexao.Schema({
diaria: {
        type: Number,
        required: true,
    },
    numero: {
        type: String,
        required: true,
    },
    capacidade: {
        type: Number,
        required: true,
    },
    andar: {
        type: Number,
        required: true,
    },
    tipquarto: {
        type: conexao.Types.ObjectId,
        ref: "Tipquarto",
        required: true,
    }
});

export default conexao.model('Quarto',Quarto)