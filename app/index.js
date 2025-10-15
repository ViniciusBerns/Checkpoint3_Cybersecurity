const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/search', (req, res) => {
  const q = req.query.q || '';
  res.send(`<html><body><h2>Resultados para: ${q}</h2></body></html>`);
});

app.post('/login', (req, res) => {
  const { user } = req.body;
  res.send(`<h1>Bem-vindo, ${user}</h1>`);
});

app.listen(8080, () => console.log('App rodando em http://0.0.0.0:8080'));
