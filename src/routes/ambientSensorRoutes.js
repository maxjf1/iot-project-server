import { Router } from 'express'
import { getLastEntries, getPeriodEntries } from '../controllers/Sensors'

const router = new Router

const generateGetter = (multiplier = 1) =>
    (req, res) => getLastEntries(Number(req.params.time) * multiplier)
        .then(values => res.send(reduceAverage(multiplier, values)))


function reduceAverage(base, baseValues) {
    const values = [...baseValues]
    const groups = []

    // Separação por grupos com base no tempo base
    while (values.length) {
        let end = values.findIndex(({ time }, i) => i !== 0 && time - values[0].time > base)
        if (end === -1)
            end = values.length
        
        groups.push(values.splice(0, end))
    }
    // Média dos valores
    return groups.map(group => {
        const groupLength = group.length
        group = group.reduce(
            (total, item) => ({
                time: total.time + item.time.getTime(),
                humidity: total.humidity + item.humidity,
                temperature: total.temperature + item.temperature
            }),
            { time: 0, humidity: 0, temperature: 0 }
        )
        return {
            time: new Date(group.time / groupLength),
            humidity: group.humidity / groupLength,
            temperature: group.temperature / groupLength
        }
    })
}

router.get('/period/:begin/:end', (req, res) =>
    getPeriodEntries(new Date(req.params.begin), new Date(req.params.end))
        .then(values => res.send(values))
)

// Delay test
// router.use((req, res, next) => setTimeout(next, 3000))

router.get('/last/:time', generateGetter())

router.get('/last/:time/seconds', generateGetter(1000))

router.get('/last/:time/minutes', generateGetter(1000 * 60))

router.get('/last/:time/hours', generateGetter(1000 * 60 * 60))

router.get('/last/:time/days', generateGetter(1000 * 60 * 60 * 24))

router.get('/last/:time/weeks', generateGetter(1000 * 60 * 60 * 24 * 7))

router.get('/last/:time/months', generateGetter(1000 * 60 * 60 * 24 * 30))

router.get('/last/:time/years', generateGetter(1000 * 60 * 60 * 24 * 365))

export default router