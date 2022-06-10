/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import supertest from 'supertest'
import app from '../../index'
const request = supertest(app)
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJpZCI6MzEsInVzZXJuYW1lIjoidGVzdDEiLCJwYXNzd29yZCI6IiQyYiQxMCRLQnhoQlp5Q0NBOS41Yi5BZjl5WXB1czRnZ3BqZ09hVE5wZzFIaVAyTTkuSnhjLjVQVGhQYSIsImZpcnN0bmFtZSI6Ik1haG1vdWQiLCJsYXN0bmFtZSI6IlNoZXRhIiwiZ3JvdXBpZCI6MiwiZW1haWwiOiJ0ZXN0MUBnbWFpbC5jb20ifSwiaWF0IjoxNjU0MjcxOTIwfQ.MpTh2R80WsQ0licQ-q5hZprK7C71wkJT36myZ15WLeM'

describe('User API End point ', () => {
  it('order create ', async () => {
    const res = await request.post('/order/create').set('Content-type', 'application/json').set('Authorization', 'Bearer ' + token).send({

      user_id: '2',
      status: 'active'
    })
    expect(res.body.data).toEqual({

      id: 2,

      user_id: '2',
      status: 'active'

    })
  })
  it('order update', async () => {
    const res = await request.post('/order/addproduct/1').set('Content-type', 'application/json').set('Authorization', 'Bearer ' + token).send({

      product_id: '2',

      quantity: 5
    })
    expect(res.body.data).toEqual({

      order_id: '1',
      product_id: '2',
      quantity: 5
    })
  })
  // it('user show', async () => {
  //   const res = await request.get('/oreder/user/1').set('Content-type', 'application/json').set('Authorization', 'Bearer ' + token)
  //   expect(res.body.data).toEqual({ id: 2, product_id: 2, quantity: 5, user_id: 1, status: 'complete' })
  // })

  // it('user delete', async () => {
  //   const res = await request.delete('/order/delete/1').set('Content-type', 'application/json').set('Authorization', 'Bearer ' + token)
  //   expect(res.body.data).toEqual(
  //     { id: 2, product_id: 2, quantity: 5, user_id: 1, status: 'complete' }
  //   )
  // })
})
