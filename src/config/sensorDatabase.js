import lowDB from 'lowdb'
import FileAsync from 'lowdb/adapters/FileAsync'
import { dbPathSensors } from './consts'

const adapter = new FileAsync(dbPathSensors, {
    serialize: data => JSON.stringify(data, null, 4)
    // serialize: JSON.stringify
})

const dbPromise = lowDB(adapter).then(db => {
    // DB Default
    db.defaults({ temperature: [], humidity: [] }).write()
    return db
})

export default dbPromise

export const getDb = callback => dbPromise
    .then(callback)
    .catch(console.error)