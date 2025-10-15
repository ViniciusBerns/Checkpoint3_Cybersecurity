# Checkpoint 3 - Cybersecurity

## Missão: DevSecOps – Testes de Segurança Automatizados

Este projeto implementa uma pipeline CI/CD com **OWASP ZAP** para detectar vulnerabilidades automaticamente antes do deploy.

### 🧩 Componentes
- Node.js (Express)
- OWASP ZAP CLI via Docker
- GitHub Actions (CI/CD)

### 🚀 Executando localmente
```bash
npm install
npm start
```
Acesse [http://localhost:8080](http://localhost:8080)

### ⚙️ Estrutura do projeto
```
Checkpoint3_Cybersecurity/
├── app/
│   ├── index.js
│   ├── package.json
│   └── public/
│       └── index.html
├── Dockerfile
└── .github/workflows/zap-scan.yml
```

### 🔒 Pipeline OWASP ZAP
O pipeline faz:
1. Build da imagem da aplicação;
2. Executa container da app;
3. Roda ZAP Baseline para escanear `http://clickseguro-app:8080`;
4. Falha se encontrar vulnerabilidades *High* ou *Critical*;
5. Salva relatórios (HTML e JSON) como artefatos.

### 🧠 Vulnerabilidades propositalmente inseridas
- Reflected XSS: `/search?q=<script>alert(1)</script>`
- Echo de input não sanitizado em `/login`

### 📄 Relatórios
Os relatórios do ZAP serão gerados em `zap_reports/` e anexados automaticamente como artefatos no GitHub Actions.
