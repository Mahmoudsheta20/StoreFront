import Store from '../config/configdb'

export type Order = {
  id?:number
  user_id:string
  status:string
};
export type OrderProduct = {
   order_id:string
   product_id:string
  quantity:number

};

export class OrderStore {
  async index (): Promise<Order[] | undefined> {
    try {
      // @ts-ignore
      const conn = await Store.connect()
      const sql = 'SELECT * FROM orders'

      const result = await conn.query(sql)

      conn.release()
      return result.rows
    } catch (err) {
      console.log(err)
    }
  }

  async createOrder (orders:Order):Promise<Order | undefined> {
    try {
      const conn = await Store.connect()
      const sql = 'INSERT INTO orders (user_id, status) VALUES ($1, $2) RETURNING *'
      const result = await conn.query(sql, [
        orders.user_id,
        orders.status
      ])
      conn.release()
      return result.rows[0]
    } catch (err) {
      console.log(err)
    }
  }

  async AddOrderProduct (orders:OrderProduct):Promise<OrderProduct | undefined> {
    try {
      const conn = await Store.connect()
      const sql = 'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *'
      const result = await conn.query(sql, [
        orders.quantity,
        orders.order_id,
        orders.product_id

      ])
      conn.release()
      return result.rows[0]
    } catch (err) {
      console.log(err)
    }
  }

  async delete (id: number) {
    try {
      const sql = 'DELETE  FROM orders WHERE id=$1 RETURNING *'
      const conn = await Store.connect()
      const result = await conn.query(sql, [id])
      conn.release()

      return result.rows[0]
    } catch (err) {
      throw new Error(`Could not delete order ${id}. Error: ${err}`)
    }
  }

  async CurrentOrder (userId: number): Promise<Order> {
    try {
      const conn = await Store.connect()
      const sql = `SELECT * FROM orders WHERE user_id = ${userId} ORDER BY id DESC LIMIT 1`
      const result = await conn.query(sql)
      conn.release()

      return result.rows[0]
    } catch (err) {
      throw new Error(`Could not get current order. Error: ${err}`)
    }
  }

  async update (status:string, id:number) {
    try {
      const conn = await Store.connect()
      const sql = 'UPDATE orders SET status=$1 WHERE id=$2 RETURNING *'
      const result = await conn.query(sql, [
        status,
        id

      ])
      conn.release()
      return result.rows[0]
    } catch (err) {
      console.log(err)
    }
  }

  //   // Get active order by user id
  //   async ActiveOrders (userId: number): Promise<Order[]> {
  //     try {
  //       const status = 'active'
  //       const conn = await Store.connect()
  //       const sql = `SELECT * FROM orders WHERE useroreder = ${userId} AND status = $1`
  //       const result = await conn.query(sql, [status])
  //       conn.release()

  //       return result.rows
  //     } catch (err) {
  //       throw new Error(`Could not get active order. Error: ${err}`)
  //     }
  //   }

  //   // select completed order by user id
  //   async CompletedOrders (userId: number): Promise<Order[]> {
  //     try {
  //       const status = 'complete'
  //       const conn = await Store.connect()
  //       const sql = `SELECT * FROM ${this.tablename} WHERE user_id = ${userId} AND status = $1`
  //       const result = await conn.query(sql, [status])
  //       conn.release()

//       return result.rows
//     } catch (err) {
//       throw new Error(`Could not get completed orders. Error: ${err}`)
//     }
//   }
}
