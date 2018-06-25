import lowDB from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'
import { dbPath } from './consts'

const adapter = new FileSync(dbPath)
const db = lowDB(adapter)

export default db