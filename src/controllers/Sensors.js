import { getDb } from '../config/sensorDatabase'

/**
 * Registrador do sensor de ambiente (temperatura, humidade)
 * 
 * @param {string} value JSON do sensor
 * @param {Date} time Momento de captura
 */
export function registerAmbientEntry(value, time = new Date) {
    value = JSON.parse(value)
    const { humidity, temperature } = value
    getDb(db =>
        db.get('ambient')
            .push({ time, humidity, temperature })
            .write()
    )
}

export function getPeriodEntries(begin, end = new Date) {
    return new Promise(resolve =>
        getDb(db => resolve(db
            .get('ambient')
            .filter(({ time }) => time >= begin && time <= end)
            .value()
        ))
    )
}

export const getLastEntries = (time) => getPeriodEntries(new Date(new Date() - time))