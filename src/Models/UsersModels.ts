import Store from "../config/configdb";
import bcrypt from 'bcrypt'
const{

    BCRYPT_PASSWORD,
    SALT_ROUNDS
    } =process.env
    const paper = BCRYPT_PASSWORD
    const salte = SALT_ROUNDS

export type User={
UserID?:string
UserName:string
Password:string
FirstName:string
LastName:string
GroupID:number
Email:string
}

export class UserStore{

    async index(): Promise<User[] | undefined> {
        try {
          // @ts-ignore
          const conn = await Store.connect()
          const sql = 'SELECT * FROM users'
    
          const result = await conn.query(sql)
       console.log(result.rows)
          
          
       conn.release()
       return result.rows
        } catch (err) {
          
        }
      }



      async create(user:User):Promise<User | null> {
        try {
      const sql = 'INSERT INTO users (UserName, Password, FirstName, LastName, GroupID, Email) VALUES($1, $2, $3,$4, $5,$6)'
      // @ts-ignore
      const HashPassword = bcrypt.hashSync(user.Password + paper, parseInt(salte))
      const conn = await Store.connect()
  
      const result = await conn
          .query(sql, [user.UserName, HashPassword , user.FirstName ,user.LastName ,user.GroupID, user.Email])
  
      const book = result.rows[0]
  
      conn.release()
         console.log(book)
      return book
        } catch (err) {
            console.log(err)
            return  null
        }
    }
  




}