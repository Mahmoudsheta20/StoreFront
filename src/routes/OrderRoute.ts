import { Application, Request, Response } from 'express'
import validate from '../../middleware/Authentiation'
import { OrderStore, Order } from '../Models/OrderModels'

const orderstore = new OrderStore()

const index = async (req: Request, res: Response) => {
  try {
    const result = await orderstore.index()

    res.json({
      status: 'success',
      data: result,
      message: 'user authenticated successfully'

    })
  } catch (err) {
    console.log(err)
  }
}

const createorder = async (req: Request, res: Response) => {
  const orders:Order = {
    product_id: req.body.product_id,
    quantity: req.body.quantity,
    user_id: req.body.user_id,
    status: req.body.status

  }

  try {
    const result = await orderstore.create(orders)
    res.json({
      status: 'success',
      data: { ...result },
      message: 'user authenticated successfully'

    })
  } catch (err) { res.json(err) }
}

const current = async (req: Request, res: Response) => {
  const id = req.params.id as unknown as number

  try {
    const result = await orderstore.CurrentOrder(id)
    res.json({
      status: 'success',
      data: result,
      message: 'user authenticated successfully'

    })
  } catch (err) {
    res.json({
      status: 'worng',

      message: `${err}`

    })
  }
}

const deleteOrder = async (req:Request, res:Response) => {
  const id = req.params.id as unknown as number
  try {
    const result = await orderstore.delete(id)

    res.json({
      status: 'success',
      data: { ...result },
      message: 'user authenticated successfully'

    })
  } catch (err) {
    res.json(err)
  }
}

const UpdateStatus = async (req:Request, res:Response) => {
  const id = req.params.id as unknown as number
  const status = req.body.status
  try {
    const result = await orderstore.update(status, id)

    res.json({
      status: 'success',
      data: { ...result },
      message: 'user authenticated successfully'

    })
  } catch (err) {
    res.json(err)
  }
}

const Orders = (app: Application) => {
  //
  app.put('/order/update/:id', validate, UpdateStatus)
  app.delete('/order/delete/:id', validate, deleteOrder)
  app.get('/order/index', validate, index)
  app.post('/order/create', validate, createorder)
  app.get('/oreder/user/:id', validate, current)
}
export default Orders
