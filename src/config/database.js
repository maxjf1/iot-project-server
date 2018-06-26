import lowDB from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'
import { dbPath } from './consts'

const adapter = new FileSync(dbPath)
const db = lowDB(adapter)

// Set some defaults (required if your JSON file is empty)
db.defaults({ users: [], accessLog: [], tempLog: [] }).write()

export default db