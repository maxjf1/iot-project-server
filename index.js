import app, { start } from './src/config/express'
import arduinoRouter from './src/arduinoRoutes'
import db from './src/config/database'

app.use('/arduino', arduinoRouter)

start(app)

export default app