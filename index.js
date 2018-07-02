import app, { start } from './src/config/express'
import arduinoRouter from './src/routes/arduinoRoutes'
import apiRouter from './src/routes/apiRoutes'
import './src/config/mqtt'

app.disable('x-powered-by')
app.use('/arduino', arduinoRouter)
app.use('/api', apiRouter)

start(app)

export default app