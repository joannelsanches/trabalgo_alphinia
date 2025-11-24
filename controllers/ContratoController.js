import Contrato from '../models/Contrato.js'
import Cliente from '../models/Cliente.js'
import Quarto from '../models/Quarto.js'

export default class ContratoController{

    constructor(caminhoBase='contrato/'){
        this.caminhoBase = caminhoBase
    
        this.openAdd = async(req, res)=>{
            const clientes = await Cliente.find({});
            const quartos = await Quarto.find({})
            res.render(caminhoBase + "add",{clientes: clientes, quartos: quartos})
        }

        this.add = async(req, res)=>{
            try {
                await Contrato.create({
                    cliente: req.body.cliente,
                    quarto: req.body.quarto,
                    data_inicio: req.body.data_inicio,
                    data_fim: req.body.data_fim,
                    valor: req.body.valor
                });
                res.redirect('/'+caminhoBase + 'lst');
            } catch (error) {
                console.error('Erro ao criar contrato:', error);
                res.redirect('/'+caminhoBase + 'add');
            }
        }

        this.list = async(req, res)=>{
            try {
                const contratos = await Contrato.find({})
                    .populate('cliente')
                    .populate('quarto');
                
                res.render(caminhoBase + 'lst', {Contratos: contratos})
            } catch (error) {
                console.error('Erro ao listar contratos:', error);
                res.render(caminhoBase + 'lst', {Contratos: []})
            }
        }

       this.find = async(req, res)=>{
    try {
        const filtro = req.body.filtro;
        
        const clientesEncontrados = await Cliente.find({ 
            nome: { 
                $regex: filtro, 
                $options: "i" 
            }
        });
        
        const clienteIds = clientesEncontrados.map(cliente => cliente._id);
        
        const contratos = await Contrato.find({ 
            cliente: { $in: clienteIds }
        })
        .populate('cliente')
        .populate('quarto');
        
        res.render(caminhoBase + 'lst', {Contratos: contratos})
    } catch (error) {
        console.error('Erro na pesquisa:', error);
        res.render(caminhoBase + 'lst', {Contratos: []})
    }
}

        this.openEdt = async(req, res)=>{
            try {
                const id = req.params.id
                const contrato = await Contrato.findById(id)
                    .populate('cliente')
                    .populate('quarto');
                
                const clientes = await Cliente.find({}); 
                const quartos = await Quarto.find({})
                
                res.render(caminhoBase + "edt", {
                    contrato: contrato, 
                    clientes: clientes, 
                    quartos: quartos
                })
            } catch (error) {
                console.error('Erro ao abrir edição:', error);
                res.redirect('/'+caminhoBase + 'lst');
            }
        }

        this.edt = async(req, res)=>{
            try {
                const id = req.params.id || req.body.id;
                
                await Contrato.findByIdAndUpdate(id, {
                    cliente: req.body.cliente,
                    quarto: req.body.quarto,
                    data_inicio: req.body.data_inicio,
                    data_fim: req.body.data_fim,
                    valor: req.body.valor
                });
                
                res.redirect('/'+caminhoBase + 'lst');
            } catch (error) {
                console.error('Erro ao editar contrato:', error);
                res.redirect('/'+caminhoBase + 'lst');
            }
        }

        this.del = async(req, res)=>{
            try {
                await Contrato.findByIdAndDelete(req.params.id)
                res.redirect('/'+caminhoBase + 'lst');
            } catch (error) {
                console.error('Erro ao excluir contrato:', error);
                res.redirect('/'+caminhoBase + 'lst');
            }
        }
    }
};