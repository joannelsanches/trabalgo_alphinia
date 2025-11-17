import conexao from '../config/conexao.js'

const Tipquarto = conexao.Schema({
    nome: {
        type: String,
        required: true,
    },
    descricao: {
        type: String,
        required: true
    },
    img: {
        type: Buffer,
        required: false,
         get: (valor) => {
           if (!valor) return null;
             return `data:image/png;base64,${valor.toString('base64')}`;
    }}
});


export default conexao.model('Tipquarto',Tipquarto)