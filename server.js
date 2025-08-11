const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const conexao = mysql.createConnection({
  host: '10.129.76.12',           // IP do servidor MySQL da UOL
  user: 'login_site',             // Usuário MySQL fornecido
  password: 'Rm@2025',            // Senha MySQL
  database: 'login_rm',           // Nome do banco
  port: 3306,
  charset: 'latin1'
});

conexao.connect(err => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conectado ao banco de dados MySQL remoto!');
});

app.post('/login', (req, res) => {
  const { usuario, senha } = req.body;

  if (!usuario || !senha) {
    return res.status(400).json({ sucesso: false, mensagem: 'Usuário e senha são obrigatórios' });
  }

  const sql = 'SELECT nivel_de_acesso FROM login WHERE usuario = ? AND senha = ?';
  conexao.query(sql, [usuario, senha], (err, results) => {
    if (err) {
      console.error('Erro ao consultar o banco:', err);
      return res.status(500).json({ sucesso: false, mensagem: 'Erro no servidor' });
    }

    if (results.length > 0) {
      const { nivel_de_acesso } = results[0];
      console.log(`Login bem-sucedido! Nível de acesso: ${nivel_de_acesso}`);
      return res.json({ sucesso: true, nivel_de_acesso });
    }

    console.log('Usuário ou senha incorretos.');
    return res.json({ sucesso: false, mensagem: 'Usuário ou senha incorretos' });
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
