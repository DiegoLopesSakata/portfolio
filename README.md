# Portfólio — Diego Sakata

Site estático (HTML + CSS + JS puro, sem framework e sem build step).

## Estrutura
```
index.html              → todas as seções (Início, Serviços, Resumo, Projetos, Contato)
assets/css/style.css    → paleta roxa, tipografia e animações
assets/js/script.js     → navegação entre seções, transição em onda, tabs, ripple hover
assets/files/CV-Diego-Sakata.pdf → currículo para download no botão "Baixar currículo"
```

## Rodar localmente
Não precisa de nenhuma instalação. Só abrir o `index.html` no navegador,
ou, se preferir um servidor local (recomendado para o botão de download funcionar 100%):
```
python3 -m http.server 8000
```
e acessar `http://localhost:8000`.

## Deploy na Vercel (sem complicação — é 100% estático)
1. Crie um repositório novo no GitHub (ex: `portfolio-sakata`) e suba estes arquivos
   (`index.html`, `README.md` e a pasta `assets/`) na raiz do repositório.
2. Na Vercel: **Add New → Project → Import** esse repositório.
3. Não precisa mexer em nada nas configurações — sem Root Directory, sem Build Command,
   sem Output Directory. A Vercel detecta como projeto estático automaticamente.
4. Clique em **Deploy**.

## O que personalizar depois
- Cores em `assets/css/style.css`, na seção `:root` (variáveis `--accent`, `--bg`, etc.).
- Textos do formulário de contato — hoje ele abre o app de e-mail (`mailto:`) com os dados
  preenchidos. Se quiser que ele envie de verdade sem abrir o e-mail do visitante, dá pra
  integrar depois com um serviço como Formspree ou EmailJS.
