import { ProductStore } from '../ProductModel'

/* eslint-disable no-undef */
const store = new ProductStore()

describe('User Model', () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined()
  })

  it('should have a show method', () => {
    expect(store.show).toBeDefined()
  })

  it('should have a create method', () => {
    expect(store.create).toBeDefined()
  })

  it('should have a delete method', () => {
    expect(store.delete).toBeDefined()
  })

  it('create method should add a user', async () => {
    const result = await store.create({
      productname: 'IPHONE 12',
      price: 999,
      counts: 5
    })

    expect(result).toEqual({
      id: 2,
      productname: 'IPHONE 12',
      price: 999,
      counts: 5
    })
  })

  it('index method should return a list of user', async () => {
    const result = await store.index()

    expect(result?.length).toBe(2)
  })
  it('show method should return the correct user', async () => {
    const result = await store.show('2')
    expect(result).toEqual({
      id: 2,
      productname: 'IPHONE 12',
      price: 999,
      counts: 5
    })
  })
})
