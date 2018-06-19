import express from 'express'; 

const serverPort = 3000; // porta do servidor

const app = express();
app.get('/', (req, res) => {
    res.send('Hello World')
})
app.listen(serverPort, () => {
  console.log(`Servidor inciado na porta ${serverPort} (http://localhost:${serverPort}/)`);
});

export default app;