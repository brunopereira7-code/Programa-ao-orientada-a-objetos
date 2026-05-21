const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();

// Configurações obrigatórias
app.use(cors()); // Permite o React acessar essa API
app.use(express.json()); // Permite que a API entenda textos em formato JSON

// 🔌 Os mesmos dados de conexão do XAMPP que vimos antes
const conexao = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // Vazio no XAMPP
    database: 'sistema_comercial'
});

// Testa se a tomada do banco funcionou de verdade
conexao.connect((erro) => {
    if (erro) {
        console.error('Erro ao conectar no XAMPP/MySQL: ' + erro.stack);
        return;
    }
    console.log('🚀 Conectado com sucesso ao MySQL do XAMPP!');
});

// =====================================================================
// 👥 ENDPOINTS DE CLIENTES (GET e POST)
// =====================================================================

// Método GET: Puxa todos os clientes do banco
app.get('/clientes', (req, res) => {
    const sql = 'SELECT * FROM clientes';
    
    conexao.query(sql, (erro, resultados) => {
        if (erro) return res.status(500).json({ erro: erro.message });
        res.json(resultados); // Devolve a lista pro React
    });
});

// Método POST: Salva um cliente novo enviado pelo React
app.post('/clientes', (req, res) => {
    const { nome, email, telefone } = req.body; // Desestruturação do que veio da tela
    const sql = 'INSERT INTO clientes (nome, email, telefone) VALUES (?, ?, ?)';

    conexao.query(sql, [nome, email, telefone], (erro, resultado) => {
        if (erro) return res.status(500).json({ erro: erro.message });
        res.status(201).json({ mensagem: 'Cliente adicionado com sucesso!', id: resultado.insertId });
    });
});

// =====================================================================
// 💼 ENDPOINTS DE FUNCIONÁRIOS (GET e POST)
// =====================================================================

// Método GET: Puxa todos os funcionários
app.get('/funcionarios', (req, res) => {
    const sql = 'SELECT * FROM funcionarios';

    conexao.query(sql, (erro, resultados) => {
        if (erro) return res.status(500).json({ erro: erro.message });
        res.json(resultados);
    });
});

// Método POST: Salva um funcionário novo
app.post('/funcionarios', (req, res) => {
    const { nome, cargo, salario } = req.body;
    const sql = 'INSERT INTO funcionarios (nome, cargo, salario) VALUES (?, ?, ?)';

    conexao.query(sql, [nome, cargo, salario], (erro, resultado) => {
        if (erro) return res.status(500).json({ erro: erro.message });
        res.status(201).json({ mensagem: 'Funcionário adicionado com sucesso!', id: resultado.insertId });
    });
});

// Liga o servidor na porta 5000
app.listen(5000, () => {
    console.log('🌐 Servidor Node.js rodando em http://localhost:5000');
}); 
//--------------------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------------------- 
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
