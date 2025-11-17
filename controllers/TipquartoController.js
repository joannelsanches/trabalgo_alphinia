import Tipquarto from '../models/Tipquarto.js'
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage });

export default class TipquartoController{

    constructor(caminhoBase='tipquarto/'){
        this.caminhoBase = caminhoBase
        this.upload = upload
    
        this.openAdd = async(req, res)=>{
            res.render(this.caminhoBase + "add")
        }
        
        this.add = async(req, res)=>{
            await Tipquarto.create({
                nome: req.body.nome,
                descricao: req.body.descricao,
                img: req.file ? req.file.buffer : null
            });
            res.redirect('/'+this.caminhoBase + 'lst');
        }
        
        this.list = async(req, res)=>{
            const resultado = await Tipquarto.find({})
            const resposta = resultado.map(tipo => ({
                id: tipo._id,
                nome: tipo.nome,
                descricao: tipo.descricao,
                img: tipo.img
            }));
            res.render(this.caminhoBase + 'lst', {Tipquartos: resposta})
        }
        
        this.find = async(req, res)=>{
            const filtro = req.body.filtro;
            const resultado = await Tipquarto.find({ 
                nome: { $regex: filtro, $options: "i" }
            })
            res.render(this.caminhoBase + 'lst', {Tipquartos: resultado})
        }

        this.openEdt = async(req, res)=>{
            const id = req.params.id
            const tipquarto = await Tipquarto.findById(id)
            res.render(this.caminhoBase + "edt", {Tipquarto: tipquarto})
        }

        this.edt = async(req, res)=>{
            const updateData = {
                nome: req.body.nome,
                descricao: req.body.descricao
            };
            
            if(req.file) {
                updateData.img = req.file.buffer;
            }

            await Tipquarto.findByIdAndUpdate(req.body.id, updateData);
            res.redirect('/'+this.caminhoBase + 'lst');
        }

        this.del = async(req, res)=>{
            await Tipquarto.findByIdAndDelete(req.params.id)
            res.redirect('/'+this.caminhoBase + 'lst');
        }
    }
}
