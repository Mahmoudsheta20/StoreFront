import Store from '../config/configdb'
import bcrypt from 'bcrypt'
const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env
const paper = BCRYPT_PASSWORD
const salte = SALT_ROUNDS

export type User = {
  id?: number;
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  groupid?: number;
  email: string;
};

export class UserStore {
  async index (): Promise<User[] | undefined> {
    try {
      // @ts-ignore
      const conn = await Store.connect()
      const sql = 'SELECT * FROM users'

      const result = await conn.query(sql)

      conn.release()
      return result.rows
    } catch (err) {}
  }

  async create (user: User): Promise<User | undefined> {
    try {
      const sql =
        'INSERT INTO users (UserName, Password, FirstName, LastName, GroupID, Email) VALUES($1, $2, $3,$4, $5,$6) RETURNING *'
      // @ts-ignore
      const HashPassword = bcrypt.hashSync(
        user.password + paper,
        Number(salte)
      )
      const conn = await Store.connect()

      const result = await conn.query(sql, [
        user.username,
        HashPassword,
        user.firstname,
        user.lastname,
        user.groupid,
        user.email
      ])

      conn.release()

      return result.rows[0]
    } catch (err) {
      console.log(err)
    }
  }

  async show (ID: string): Promise<User | null> {
    try {
      const sql = 'SELECT * FROM users WHERE id=($1)'
      // @ts-ignore
      const conn = await Store.connect()

      const result = await conn.query(sql, [ID])

      const book = result.rows[0]

      conn.release()
      return book
    } catch (err) {
      console.log(err)
      return null
    }
  }

  async delete (id: string): Promise<User | undefined> {
    try {
      const sql = 'DELETE  FROM users WHERE id=($1) RETURNING *'
      // @ts-ignore
      const conn = await Store.connect()

      const result = await conn.query(sql, [id])

      conn.release()

      return result.rows[0]
    } catch (err) {
      console.log(err)
    }
  }

  async authe (username: string, password: string): Promise<User | null> {
    try {
      const conn = await Store.connect()
      const sql = 'SELECT password FROM users WHERE username=$1'

      const result = await conn.query(sql, [username])
      const user = result.rows[0]
      if (result.rows.length) {
        if (bcrypt.compareSync(password + paper, user.password)) {
          const userinfo = await conn.query(
            'SELECT * FROM users WHERE username=($1)',
            [username]
          )

          return userinfo.rows[0]
        }
      }
    } catch (err) {
      throw new Error(`Could not delete book . Error: ${err}`)
    }

    return null
  }

  async update (User: User): Promise<User | null> {
    try {
      const sql =
        'UPDATE users SET username=($1) , firstname=($2), lastname=($3), password = ($4), email= ($5) WHERE id=($6) RETURNING *'
      // @ts-ignore
      const conn = await Store.connect()

      const result = await conn.query(sql, [
        User.username,
        User.firstname,
        User.lastname,
        User.password,
        User.email,
        User.id
      ])

      const book = result.rows[0]

      conn.release()
      return book
    } catch (err) {
      console.log(err)
      return null
    }
  }
}
