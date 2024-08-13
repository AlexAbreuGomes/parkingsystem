const express = require('express');
const cors = require('cors'); // Importar o middleware cors
const { Pool } = require('pg');
const app = express();
const path = require('path');


app.use(cors()); // Adicionar o middleware cors
app.use(express.json()); // Para parsear JSON no body da requisição

// Configuração da conexão com o PostgreSQL
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'autoPark',
    password: 'BemVindo!', // BemVindo!
    port: 5432,
});

// Middleware para tratar erros de conexão com o PostgreSQL
pool.on('error', (err, client) => {
    console.error('Erro na conexão com o PostgreSQL:', err);
    process.exit(-1);
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota para registrar a saída do veículo
app.post('/registrarSaida', async (req, res) => {
    const { placa, veiculo, entrada, saida, valorPago } = req.body;

    try {
        const query = `
            INSERT INTO veiculos (placa, veiculo, entrada, saida, valor_pago)
            VALUES ($1, $2, $3, $4, $5)
        `;
        const values = [placa, veiculo, entrada, saida, valorPago];

        await pool.query(query, values);

        res.status(200).json({ message: 'Dados salvos com sucesso!' });
    } catch (err) {
        console.error('Erro ao salvar no banco de dados:', err);
        res.status(500).json({ error: 'Erro ao salvar no banco de dados' });
    }
});

// Rota para deletar o veículo do banco de dados
app.delete('/removerVeiculo/:placa', async (req, res) => {
    const { placa } = req.params;

    try {
        const query = `
            DELETE FROM veiculos WHERE placa = $1
        `;
        await pool.query(query, [placa]);

        res.status(200).json({ message: 'Registro deletado com sucesso!' });
    } catch (err) {
        console.error('Erro ao deletar no banco de dados:', err);
        res.status(500).json({ error: 'Erro ao deletar no banco de dados' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
