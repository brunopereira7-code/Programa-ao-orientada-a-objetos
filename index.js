// IMPORTAÇOES NECESSARIAS

const express = require('express');
const cors=require('cors');
const {Sequelize,DataTypes, UniqueConstraintError}=require ('sequelize');

//configuraçao de bancos de dados
const sequelize =new Sequelize ('db_api','root','', {
    host:'localhost',
    dialect:'mysql'
});
// definindo modelos de dados
const Cliente=sequelize.define('Cliente',{
    nome: {
        type:DataTypes.STRING,
        allowNull:false

    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    telefone:{
        type:DataTypes.STRING,
        unique:true
    }

});
// configuraçao de servidor

const app=express();
app.use(cors());
app.use(express.json());

const port= 3001;

// 4. rotas
//ROTA GET -LISTAR TODOS OS CLIENTES 
app.post('/clientes',async(requestAnimationFrame,res)=>{
    const{nome,email,telefone}=requestAnimationFrame.body;
    try{
        const novoCliente=await Cliente.create({nome,email,telefone});
        res.status(201).json(novoCliente);
    }catch(error){
        res.status(500).json({error:'erro ao criar cliente'});

    }
});

sequelize.sync().then(()=> {
    app.listen(port,() => {
        console.log(`servidor rodando na porta ${port}`);
        console.log('banco de dados sicronizados com sucesso');

    }),0;

}).catch(error => {
    console.log('Erro so conectar com banco de dados:',error);

});