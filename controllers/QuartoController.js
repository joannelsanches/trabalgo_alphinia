import Quarto from '../models/Quarto.js'
import Tipquarto from '../models/Tipquarto.js'

export default class QuartoController{

    constructor(caminhoBase='quarto/'){
        this.caminhoBase = caminhoBase
    
        this.openAdd = async(req, res)=>{
            const tipos = await Tipquarto.find({});
            res.render(this.caminhoBase + "add", {Tipquartos: tipos})
        }
        
        this.add = async(req, res)=>{
            var ptipquarto = null;
           
            if(req.body.tipquarto != null) {
                ptipquarto = await Tipquarto.findById(req.body.tipquarto)
            }

            await Quarto.create({
                diaria: req.body.diaria,
                numero: req.body.numero,
                capacidade: req.body.capacidade,
                andar: req.body.andar,
                tipquarto: ptipquarto
            });
            res.redirect('/'+this.caminhoBase + 'lst');
        }
        
        this.list = async(req, res)=>{
            const resultado = await Quarto.find({}).populate('tipquarto')
            const tipos = await Tipquarto.find({})
            res.render(this.caminhoBase + 'lst', {Quartos: resultado, Tipquartos: tipos})
        }
        
       this.find = async(req, res)=>{
                   const filtro = req.body.filtro;
                   const resultado = await Quarto.find({ 
                       numero: { $regex: filtro, $options: "i" }
                   })
                   res.render(this.caminhoBase + 'lst', {Quartos: resultado})
               }

        this.openEdt = async(req, res)=>{
            const id = req.params.id
            const quarto = await Quarto.findById(id)
            const tipos = await Tipquarto.find({})
            res.render(this.caminhoBase + "edt", {Quarto: quarto, Tipquartos: tipos})
        }

        this.edt = async(req, res)=>{
            var ptipquarto = null;
            if(req.body.tipquarto != null) {
                ptipquarto = await Tipquarto.findById(req.body.tipquarto)
            }

            await Quarto.findByIdAndUpdate(req.body.id, {
                diaria: req.body.diaria,
                numero: req.body.numero,
                capacidade: req.body.capacidade,
                andar: req.body.andar,
                tipquarto: ptipquarto
            });
            res.redirect('/'+this.caminhoBase + 'lst');
        }

        this.del = async(req, res)=>{
            await Quarto.findByIdAndDelete(req.params.id)
            res.redirect('/'+this.caminhoBase + 'lst');
        }
    }
}
