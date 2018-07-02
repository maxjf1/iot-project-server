import { Router } from 'express'
import { getLastEntries } from '../controllers/Sensors'

const router = new Router

const generateGetter = (multiplier = 1) =>
    (req, res) => getLastEntries(Number(req.params.time) * multiplier)
        .then(values => res.send(values))


router.get('/last/:time', generateGetter())

router.get('/last/:time/seconds', generateGetter(1000))

router.get('/last/:time/minutes', generateGetter(1000 * 60))

router.get('/last/:time/hours', generateGetter(1000 * 60 * 60))

router.get('/last/:time/days', generateGetter(1000 * 60 * 60 * 24))

router.get('/last/:time/weeks', generateGetter(1000 * 60 * 60 * 24 * 7))

router.get('/last/:time/months', generateGetter(1000 * 60 * 60 * 24 * 30))

router.get('/last/:time/years', generateGetter(1000 * 60 * 60 * 24 * 365))

export default router