const express = require('express');
const app = express();
const path = require('path');

// Middleware para interpretar corpo da requisição
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Servir arquivos estáticos da pasta "public"
app.use(express.static(path.join(__dirname, 'public')));

// Rota principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota de busca (GET com parâmetro não sanitizado)
app.get('/search', (req, res) => {
  const q = req.query.q;
  res.send(`<html><body><h2>Resultados para: ${q}</h2></body></html>`);
});

// Rota de login (sem validação de entrada — propositalmente vulnerável)
app.post('/login', (req, res) => {
  const { user } = req.body;
  res.send(`<h1>Bem-vindo, ${user}</h1>`);
});

// Rota de contato (simula campo de texto sem sanitização)
app.post('/contato', (req, res) => {
  const { mensagem } = req.body;
  res.send(`<p>Mensagem recebida: ${mensagem}</p>`);
});

// Iniciar servidor escutando em todas as interfaces
const PORT = process.env.PORT || 8080;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ App rodando em http://0.0.0.0:${PORT}`);
});
