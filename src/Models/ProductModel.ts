import Store from '../config/configdb'

export type product = {
  id?: number;
  productname: string;
  price: number;
  counts: number;
};

export class ProductStore {
  async index (): Promise<product[]> {
    try {
      // @ts-ignore
      const conn = await Store.connect()
      const sql = 'SELECT * FROM product'

      const result = await conn.query(sql)

      conn.release()
      return result.rows
    } catch (err) {
      throw new Error(`Could not index products Error: ${err}`)
    }
  }

  async create (
    product: product
  ): Promise<product> {
    try {
      const sql =
      'INSERT INTO product (productname, price, counts) VALUES($1, $2, $3) RETURNING *'
      // @ts-ignore
      const conn = await Store.connect()

      const result = await conn.query(sql, [
        product.productname,
        product.price,
        product.counts
      ])

      conn.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`Could not create products Error: ${err}`)
    }
  }

  async show (id: string): Promise<product> {
    try {
      const sql = 'SELECT * FROM product WHERE id=($1)'
      // @ts-ignore
      const conn = await Store.connect()

      const result = await conn.query(sql, [id])

      const book = result.rows[0]

      conn.release()
      return book
    } catch (err) {
      throw new Error(`Could not show products ${id}. Error: ${err}`)
    }
  }

  async delete (id: string): Promise<product> {
    try {
      const sql = 'DELETE FROM product WHERE id=($1) RETURNING *'
      // @ts-ignore
      const conn = await Store.connect()

      const result = await conn.query(sql, [id])

      conn.release()

      return result.rows[0]
    } catch (err) {
      throw new Error(`Could not delete product ${id}. Error: ${err}`)
    }
  }

  async update (product: product): Promise<product | null> {
    try {
      const sql =
        'UPDATE product SET productname=($1) , price=($2), counts=($3)  WHERE id=($4) RETURNING *'
      // @ts-ignore
      const conn = await Store.connect()

      const result = await conn.query(sql, [
        product.productname,
        product.price,
        product.counts,
        product.id
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
