import dados from "../models/dados.js"
const {barbies} = dados;

const getAllbarbies = (req,res)=> {
    res.status(200).json({
        total: barbies.length,
        barbie:barbies
    })
}
const getBarbieByid = (req,res)=>{
    let id = req.params.id;
    id = parseInt(id)
    const barbie = barbies.find(b => b.id === id)

    if (!barbie){
        res.status(404).json({
            sucess:false,
            message:"Não existe barbie com esse id"
        })
    }
    res.status(200).json ({
        total: barbie.length,
        barbie:barbie
    })
}
const createBarbie = (req, res) =>{
    const {nome,profissao,anoLancamento}= req.body
    if(!nome || anoLancamento){
        return res.status(400).json({
            sucess: false,
            message:"Nome e ano de lançamento são obrigatorios"
        })
    }
    const novabarbie = {
        id: barbies.length+1,
        nome:nome,
        profissao: profissao,
        anoLancamento:parseInt(anoLancamento),
    }
    barbies.push(novabarbie)
    res.status(201).json({
        sucess:true,
        message:"Seu personagem foi criado com sucesso",
        barbie:novabarbie
    })
}
const deleteBarbie = (req,res) =>{
    const id = parseInt(req.params.id)
    if (isNaN(id)){
        return res.status(400).json({
            sucess:false,
            message:"O id deve ser valido"
        })
    }
    const barbiePararemover = barbies.find(b => b.id === id);
    if(!barbiePararemover){
        return res.status(404).json({
            sucess:false,
            message: `Pesonagem com id ${id} não existe`
        })
    }
    const barbieFiltrados = barbies.filter(barbies => barbies.id !== id)
    barbies.splice(0, barbies.length, ...barbieFiltrados)
    return res.status(200).json({
            sucess:true,
            message: `O personagem ${id} foi removido com sucesso`
        })
}

const updateBarbie = (req,res) =>{
    const id = parseInt(req.params.id);
    const {nome, profissao, anoLancamento} = req.body;
    const idParaEditar = id;
    if(isNaN(idParaEditar)){
        return res.status(400).json({
            sucess: false,
            message: "O id deve ser válido"
        })
    }
    const barbieExiste = barbies.find(barbie => barbie.id === idParaEditar)
    if(!barbieExiste){
        return res.status(404).json({
            sucess: false,
            message: `Esse id ${idParaEditar} não existe`
        })
    }
    const barbiesAtualizadas = barbies.map(b => 
        b.id === idParaEditar ?{
            ...b,
            ...(nome && {nome}),
            ...(profissao && {profissao}),
            ...(anoLancamento && {anoLancamento})
        }
        :b
    );
    barbies.slice(0, barbies.length, ...barbiesAtualizadas);
    
    const barbieEditada = barbies.find(b => b.id === idParaEditar);
    res.status(200).json({
        sucess: true,
        message:"Os dados foram atualizados com sucesso",
        barbie: barbieEditada
    })
}
export {getAllbarbies,getBarbieByid, createBarbie,deleteBarbie,updateBarbie}