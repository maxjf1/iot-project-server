import { Router } from 'express'
import ambientSensorRoutes from './ambientSensorRoutes'

const router = new Router

router.use('/sensor/ambient', ambientSensorRoutes)

router.use(({ url }, res) =>
    res.status(404).send({ error: `No endpoint ${url}` })
);

export default router