import express from 'express';
import { serverPort } from './consts'

const app = express();

export const start = (app, port = serverPort) => {
    app
        .listen(port, () => console.log(`Servidor inciado na porta ${port} (http://localhost:${port}/)`))
        .on('error', () => {
            console.error(`Error starting server in port ${port}, trying with another port in 3 seconds...`)
            setTimeout(() => start(app, port + 1), 3000)
        })
}


export default app;