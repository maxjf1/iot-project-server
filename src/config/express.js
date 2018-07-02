import express from 'express';
import { serverPort } from './consts'

const app = express()
app.disable('x-powered-by')
const retryTimeout = 3000
export const start = (app, port = serverPort) => {
    app
        .listen(port, () => console.log(`Servidor inciado na porta ${port} (http://localhost:${port}/)`))
        .on('error', () => {
            console.error(`Erro iniciando servidor na porta ${port}, tentando em outra porta em ${retryTimeout / 1000} segundos...`)
            setTimeout(() => start(app, port + 1), retryTimeout)
        })
}

export default app;