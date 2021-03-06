import { Pool } from 'pg'
import 'dotenv/config'

export const {
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  ENV,
  POSTGRES_DB_TEST
} = process.env

const Store = new Pool({
  host: POSTGRES_HOST,
  database: ENV === 'dev' ? POSTGRES_DB : POSTGRES_DB_TEST,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  port: Number(POSTGRES_PORT)
})

export default Store
