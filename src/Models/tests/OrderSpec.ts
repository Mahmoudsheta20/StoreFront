
import { OrderStore } from '../OrderModels'
import { ProductStore } from '../ProductModel'
import { UserStore } from '../UsersModels'

/* eslint-disable no-undef */
const order = new OrderStore()

describe('User Model', () => {
  it('should have an index method', () => {
    expect(order.index).toBeDefined()
  })

  it('should have a show method', () => {
    expect(order.create).toBeDefined()
  })
  it('should have a show method', () => {
    expect(order.delete).toBeDefined()
  })
  it('should have a show method', () => {
    expect(order.CurrentOrder).toBeDefined()
  })
  it('should have a show method', () => {
    expect(order.update).toBeDefined()
  })
})

describe('Craete Order', () => {
  const user = new UserStore()
  const product = new ProductStore()

  beforeAll(async () => {
    await user.create({
      username: 'test1',
      password: 'test1',
      firstname: 'Mahmoud',
      lastname: 'Sheta',
      groupid: 2,
      email: 'test1@gmail.com'
    })
    await product.create({
      productname: 'IPHONE X',
      price: 999,
      counts: 5
    })
  })

  it('create method should add a user', async () => {
    const result = await order.create(
      {
        product_id: 1,
        quantity: 5,
        user_id: 1,
        status: 'active'

      }

    )

    expect(result).toEqual({
      id: 1,
      product_id: 1,
      quantity: 5,
      user_id: 1,
      status: 'active'

    })
  })
  it('create method should add a user', async () => {
    const result = await order.CurrentOrder(1)

    expect(result).toEqual({
      id: 1,
      product_id: 1,
      quantity: 5,
      user_id: 1,
      status: 'active'

    })
  })
  it('create method should add a user', async () => {
    const result = await order.update('complete', 1)
    expect(result).toEqual({
      id: 1,
      product_id: 1,
      quantity: 5,
      user_id: 1,
      status: 'complete'

    })
  })
  it('create method should add a user', async () => {
    const result = await order.delete(1)

    expect(result).toEqual({
      id: 1,
      product_id: 1,
      quantity: 5,
      user_id: 1,
      status: 'complete'

    })
  })
})
