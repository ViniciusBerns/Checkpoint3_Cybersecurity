const express = require('express');
const app = express();
const path = require('path');
const validator = require('validator');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Página principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota de busca com sanitização
app.get('/search', (req, res) => {
  let q = req.query.q || '';
  q = validator.escape(q); // evita XSS
  res.send(`<html><body><h2>Resultados para: ${q}</h2></body></html>`);
});

// Rota de login com validação
app.post('/login', (req, res) => {
  const { user } = req.body;
  if (!user || !validator.isAlphanumeric(user)) {
    return res.status(400).send('Entrada inválida.');
  }
  const safeUser = validator.escape(user);
  res.send(`<h1>Bem-vindo, ${safeUser}</h1>`);
});

// Rota de contato com validação
app.post('/contato', (req, res) => {
  const { mensagem } = req.body;
  if (!mensagem || mensagem.length > 500 || !validator.isAscii(mensagem)) {
    return res.status(400).send('Mensagem inválida.');
  }
  const safeMsg = validator.escape(mensagem);
  res.send(`<p>Mensagem recebida: ${safeMsg}</p>`);
});

// Iniciar servidor
const PORT = process.env.PORT || 8080;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ App rodando em http://0.0.0.0:${PORT}`);
});
