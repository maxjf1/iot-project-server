import { getDb } from '../config/sensorDatabase'

const generateRegisterEntry = (topic, sanitizeFunction = (val => val)) =>
    (value, time = new Date) =>
        getDb(db =>
            db.get(topic)
                .push({ time, value: sanitizeFunction(value) })
                .write()
        )

export const registerHumidityEntry = generateRegisterEntry('humidity', val => Number(val))
export const registerTemperatureEntry = generateRegisterEntry('temperature', val => Number(val))