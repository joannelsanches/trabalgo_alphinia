import Cliente from '../models/Cliente.js'

export default class ClienteController{

    constructor(caminhoBase='cliente/'){
        this.caminhoBase = caminhoBase
    
        this.openAdd = async(req, res)=>{
            res.render(this.caminhoBase + "add")
        }
        
        this.add = async(req, res)=>{
            await Cliente.create({
                nome: req.body.nome,
                dataNascimento: req.body.dataNascimento,
                endereco: req.body.endereco,
                telefone: req.body.telefone,
                cpf: req.body.cpf,
                senha: req.body.senha
            });
            res.redirect('/'+this.caminhoBase + 'lst');
        }
        
        this.list = async(req, res)=>{
            const resultado = await Cliente.find({})
            res.render(this.caminhoBase + 'lst', {Clientes: resultado})
        }
        
        this.find = async(req, res)=>{
            const filtro = req.body.filtro;
            const resultado = await Cliente.find({ 
                nome: { $regex: filtro, $options: "i" }
            })
            res.render(this.caminhoBase + 'lst', {Clientes: resultado})
        }

        this.openEdt = async(req, res)=>{
            const id = req.params.id
            const cliente = await Cliente.findById(id)
            res.render(this.caminhoBase + "edt", {Cliente: cliente})
        }

        this.edt = async(req, res)=>{
            await Cliente.findByIdAndUpdate(req.body.id, {
                nome: req.body.nome,
                dataNascimento: req.body.dataNascimento,
                endereco: req.body.endereco,
                telefone: req.body.telefone,
                cpf: req.body.cpf,
                senha: req.body.senha
            });
            res.redirect('/'+this.caminhoBase + 'lst');
        }

        this.del = async(req, res)=>{
            await Cliente.findByIdAndDelete(req.params.id)
            res.redirect('/'+this.caminhoBase + 'lst');
        }
    }
}
