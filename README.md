# 🥗 Eatsy
> **A sua dieta, sem culpa!**

Eatsy é uma plataforma SaaS B2B2C gamificada, focada em transformar a experiência nutricional. Em vez do tradicional e desmotivador "PDF chato" com a dieta, o paciente recebe um aplicativo web bonito, fluido e interativo com design *Glassmorphism*.

## 🚀 O Projeto (MVP)
Este repositório contém a versão **MVP (Minimum Viable Product)** focada na experiência do Paciente (Patient-first).

### 🎯 Funcionalidades Atuais
- **Design Premium**: Interface responsiva com efeito de vidro translúcido (*Glassmorphism*), gradientes suaves e micro-interações para dar a sensação de um app premium nativo da Apple.
- **Timeline Interativa**: Uma linha do tempo clara com os cartões de refeições do dia.
- **Check-in Gamificado**: O paciente dá "Check" no que comeu, ativando pequenas animações de celebração em tempo real.
- **Anel de Progresso Diário**: Indicador visual no topo da tela que é preenchido dinamicamente conforme as refeições são concluídas, encorajando a adesão à dieta.

## 🛠️ Tecnologias Utilizadas
A arquitetura atual prioriza velocidade de carregamento, leveza e facilidade de deploy contínuo:
- **HTML5 & Vanilla CSS**: Para máxima flexibilidade e controle total sobre os filtros de desfoque (*backdrop-filter*) e animações `@keyframes`.
- **Vanilla JavaScript**: Lógica de interatividade pura e performática.
- **Vite**: Ferramenta de build moderna e ultrarrápida.
- **Vercel**: Preparado de fábrica para Continuous Deployment (CD).

## 🏃 Como rodar localmente
1. Clone este repositório no seu computador.
2. Instale as dependências executando:
   ```bash
   npm install
   ```
3. Inicie o servidor local de desenvolvimento:
   ```bash
   npm run dev
   ```
4. Abra o seu navegador e acesse `http://localhost:5173`.
