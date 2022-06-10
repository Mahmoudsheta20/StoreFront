/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import supertest from 'supertest'
import app from '../../index'
const request = supertest(app)
let token = ''

describe('User API End point ', () => {
  it('user auth ', async () => {
    const res = await request.post('/user/auth').set('Content-type', 'application/json').send({
      username: 'test1',
      password: 'test1'

    })
    expect(res.status).toBe(200)
    const { token: usertoken } = res.body.data

    token = usertoken
  })
  it('product index', async () => {
    const res = await request.get('/product')
      .set('Authorization', 'Bearer ' + token)
    expect(res.status).toBe(200)
  })

  it('product create', async () => {
    const res = await request.post('/product').set('Content-type', 'application/json').set('Authorization', 'Bearer ' + token).send({
      productname: 'iphone 12 pro',
      counts: 100,
      price: 499
    })
    expect(res.body.data).toEqual({
      id: 3,
      productname: 'iphone 12 pro',
      counts: 100,
      price: 499
    })
  })
  it('product show', async () => {
    const res = await request.get('/product/3').set('Content-type', 'application/json').set('Authorization', 'Bearer ' + token)
    expect(res.body.data).toEqual({

      id: 3,
      productname: 'iphone 12 pro',
      counts: 100,
      price: 499
    })
  })

  it('product update', async () => {
    const res = await request.put('/product/3').set('Content-type', 'application/json').set('Authorization', 'Bearer ' + token).send({

      productname: 'iphone 12 pro max',
      counts: 100,
      price: 499
    })
    expect(res.body.data).toEqual({
      id: 3,
      productname: 'iphone 12 pro max',
      counts: 100,
      price: 499

    })
  })

  it('user delete', async () => {
    const res = await request.delete('/product/delete/3').set('Content-type', 'application/json').set('Authorization', 'Bearer ' + token)
    expect(res.body.data).toEqual({
      id: 3,
      productname: 'iphone 12 pro max',
      counts: 100,
      price: 499

    })
  })
})
