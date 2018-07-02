import lowDB from 'lowdb'
import FileAsync from 'lowdb/adapters/FileAsync'
import { dbPathSensors } from './consts'

/**
 * Função para deserializar dados
 * 
 * Transforma a data do evento em um Objeto Date JavaScript
 *
 * @param {string} data JSON do BD
 * @returns {Object} Dados deserializados
 */
function deserializeData(data) {
    data = JSON.parse(data)

    for (var sensor in data)
        data[sensor].forEach(entry => entry.time = new Date(entry.time))
    return data
}

const adapter = new FileAsync(dbPathSensors, {
    deserialize: deserializeData,
    serialize: data => JSON.stringify(data, null, 4)
    // serialize: JSON.stringify
})

const dbPromise = lowDB(adapter).then(db => {
    // DB Default
    db.defaults({ ambient: [] }).write()
    return db
})

export default dbPromise

export const getDb = callback => dbPromise
    .then(callback)
    .catch(console.error)
    