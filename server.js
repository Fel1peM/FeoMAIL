// Este é o arquivo server.js onde seu bot será hospedado 24/7. Não edite nada aqui ou seu bot não funcionará.

const express = require('express');
const server = express();

server.all('/', (req, res) => {
  res.send(`<title>ModMail.js</title><b><size=50>ModMail.js - [V1.2.1] <i>por T.F.A#7524</i></size></b><br><br><i><color=green>O Server.js está pronto!</color> Seu bot ficará online 24/7 se você hospedá-lo no uptimerobot.</i><br><br>Clique no botão abaixo para entrar no servidor oficial do Discord do T.F.A!<br><a type="button" href="https://discord.gg/7zrFC2NPrd"><button>Entrar para obter suporte</button></a><footer><br><br>Aviso:<br><b>Não remova os créditos ou o nome do desenvolvedor nesta página inicial!! Você pode alterar o nome do desenvolvedor (T.F.A) no index.js ou outros arquivos, exceto nesta página inicial!</b></footer>`)
})

function keepAlive() {
  server.listen(3000, () => { 
    console.log('\x1b[36m%s\x1b[0m','[MODMAIL] ModMail.js está em execução!')
    console.log('\x1b[36m%s\x1b[0m','[MODMAIL] Versão: V1.2.1 [OFICIAL]')
    console.log('\x1b[35m%s\x1b[0m','[CONFIGURAÇÃO] Se você tiver algum problema com o bot, por favor, leia SETUP.md ou envie uma mensagem direta para o Desenvolvedor: T.F.A#1887')
    console.log('\x1b[37m%s\x1b[0m','---------------------------------------------------------')
    console.log('\x1b[31m%s', '[AVISO] Se este projeto estiver preso na parte "[SERVER] Server.js está carregando..." , Leia SETUP.md para obter ajuda!');
    console.log('\x1b[33m%s','[SERVER] Server.js está carregando...')
  ;});
}

module.exports = keepAlive;
