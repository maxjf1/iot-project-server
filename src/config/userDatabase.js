import lowDB from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'
import { dbPath } from './consts'

const adapter = new FileSync(dbPath, {
    serialize: data => JSON.stringify(data, null, 4)
})

const db = lowDB(adapter)

// DB Default
db.defaults({ users: [], accessLog: [], tempLog: [] }).write()

export default db