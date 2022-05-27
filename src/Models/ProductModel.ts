import Store from "../config/configdb";
import bcrypt from 'bcrypt'

export type product={
    ProductID?:string
    ProductName:string 
    Price:number
    Counts:number
}

export class ProductStore{

    async index(): Promise<product[] | undefined> {
        try {
          // @ts-ignore
          const conn = await Store.connect()
          const sql = 'SELECT * FROM product'
    
          const result = await conn.query(sql)
       console.log(result.rows)
          
          
       conn.release()
       return result.rows
        } catch (err) {
          
        }
      }



      async create(product:product):Promise<product | null> {
        try {
      const sql = 'INSERT INTO product (ProductName, Price, Counts) VALUES($1, $2, $3)'
      // @ts-ignore
      const conn = await Store.connect()
  
      const result = await conn
          .query(sql, [product.ProductName, product.Price ,product.Counts ])
  
      const book = result.rows[0]
  
      conn.release()
         console.log(book)
      return product
        } catch (err) {
            console.log(err)
            return  null
        }
    }
  




}