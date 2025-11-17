import mongoose from "mongoose";
//const url = "mongodb+srv://marcelosiedler:ifsul@ifsul.fify4.mongodb.net/"
const url = "mongodb+srv://aluno:aluno@cluster0.luoxr.mongodb.net/?appName=Cluster0"
const conexao = await mongoose.connect(url)

export default conexao