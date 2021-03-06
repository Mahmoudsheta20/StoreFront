import { Application, NextFunction, Request, Response } from 'express'
import validate from '../../middleware/Authentiation'
import { product, ProductStore } from '../Models/ProductModel'

const productstore = new ProductStore()

const Index = async (req: Request, res: Response) => {
  const data = await productstore.index()
  res.json(data)
}

const Create = async (req: Request, res: Response, next: NextFunction) => {
  const product: product = {
    productname: req.body.productname,
    counts: Number(req.body.counts),
    price: Number(req.body.price)
  }

  try {
    const create = await productstore.create(product)

    res.json({
      status: 'success',
      data: { ...create },
      message: 'user authenticated successfully'

    })
  } catch {
    res.status(400)
    res.json('thers wrong')
  }
}

const Delete = async (req: Request, res: Response) => {
  const id = req.params.id

  try {
    const delet = await productstore.delete(id)
    res.json({
      status: 'success',
      data: { ...delet },
      message: 'user authenticated successfully'

    })
  } catch {
    res.status(400)
  }
}

const show = async (req: Request, res: Response) => {
  const id = req.params.id
  try {
    const show = await productstore.show(id)
    res.json({
      status: 'success',
      data: { ...show },
      message: 'user authenticated successfully'

    })
  } catch (err) {
    res.json(err)
  }
}
const updateProduct = async (req: Request, res: Response) => {
  const product:product = {

    productname: req.body.productname,
    counts: req.body.counts,
    price: req.body.price,
    id: req.params.id as unknown as number
  }

  try {
    const update = await productstore.update(product)
    res.json({
      status: 'success',
      data: { ...update },
      message: 'user authenticated successfully'

    })
  } catch {
    res.status(400)
  }
}

const Product = (app: Application) => {
  app.get('/product', Index)
  app.post('/product', validate, Create)
  app.get('/product/:id', validate, show)
  app.delete('/product/delete/:id', validate, Delete)
  app.put('/product/:id', validate, updateProduct)
}

export default Product
