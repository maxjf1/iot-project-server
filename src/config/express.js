import express from 'express';
import { serverPort } from './consts'

const app = express();

app.listen(serverPort, () => {
    console.log(`Servidor inciado na porta ${serverPort} (http://localhost:${serverPort}/)`);
});

export default app;