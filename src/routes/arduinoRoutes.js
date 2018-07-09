import { Router } from 'express'
import { arduinoSecret } from '../config/consts'
import { validateAccess } from '../controllers/User'

const router = new Router

/**
 * Middleware de validação (verifica se tem os cabeçalhos do arduino)
 */
router.use(({ headers }, res, next) => {
    if (headers['x-arduino-secret'] !== arduinoSecret)
        return res.status(403).send("no-authentication");
    next();
})

/**
 * Autenticação Arduino por codigo
 */
router.all('/auth/:code', ({params}, res) => {
    console.log(params.code)
    validateAccess(params.code) ?
        res.json(1) :
        res.status(401).json(0)
}
)

export default router