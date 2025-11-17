import Servico from '../models/Servico.js'

export default class ServicoController{

    constructor(caminhoBase='servico/'){
        this.caminhoBase = caminhoBase
    
        this.openAdd = async(req, res)=>{
            res.render(this.caminhoBase + "add")
        }
        
        this.add = async(req, res)=>{
            await Servico.create({
                descricao: req.body.descricao,
                valor: req.body.valor
            });
            res.redirect('/'+this.caminhoBase + 'lst');
        }
        
        this.list = async(req, res)=>{
            const resultado = await Servico.find({})
            res.render(this.caminhoBase + 'lst', {Servicos: resultado})
        }
        
        this.find = async(req, res)=>{
            const filtro = req.body.filtro;
            const resultado = await Servico.find({ 
                descricao: { $regex: filtro, $options: "i" }
            })
            res.render(this.caminhoBase + 'lst', {Servicos: resultado})
        }

        this.openEdt = async(req, res)=>{
            const id = req.params.id
            const servico = await Servico.findById(id)
            res.render(this.caminhoBase + "edt", {Servico: servico})
        }

        this.edt = async(req, res)=>{
            await Servico.findByIdAndUpdate(req.body.id, {
                descricao: req.body.descricao,
                valor: req.body.valor
            });
            res.redirect('/'+this.caminhoBase + 'lst');
        }

        this.del = async(req, res)=>{
            await Servico.findByIdAndDelete(req.params.id)
            res.redirect('/'+this.caminhoBase + 'lst');
        }
    }
}
