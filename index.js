import app, { start } from './src/config/express'
import arduinoRouter from './src/arduinoRoutes'
import './src/config/mqtt'

app.disable('x-powered-by')
app.use('/arduino', arduinoRouter)

start(app)

export default app