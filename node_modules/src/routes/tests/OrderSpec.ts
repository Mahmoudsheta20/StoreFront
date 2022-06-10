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

    const { token: usertoken } = res.body.data

    token = usertoken
  })
  it('order create ', async () => {
    const res = await request.post('/order/create').set('Content-type', 'application/json').send({

      product_id: 2,
      quantity: 5,
      user_id: 1,
      status: 'active'
    })
    expect(res.body.data).toEqual({
      id: 2,
      product_id: 2,
      quantity: 5,
      user_id: 1,
      status: 'active'
    })
  })
//   it('user update', async () => {
//     const res = await request.post('/order/update/2').set('Content-type', 'application/json').set('Authorization', 'Bearer ' + token).send({
//       status: 'complete'
//     })
//     expect(res.body.data).toEqual(
//         id: 2,
//         product_id: 2,
//         quantity: 5,
//         user_id: 1,
//         status: 'complete'

//     )
//   })
  it('user show', async () => {
    const res = await request.get('/oreder/user/1').set('Content-type', 'application/json').set('Authorization', 'Bearer ' + token)
    expect(res.body.data).toEqual({ id: 2, product_id: 2, quantity: 5, user_id: 1, status: 'active' })
  })

  it('user delete', async () => {
    const res = await request.delete('/order/delete/1').set('Content-type', 'application/json').set('Authorization', 'Bearer ' + token)
    expect(res.body.data).toEqual(
      { id: 2, product_id: 2, quantity: 5, user_id: 1, status: 'active' }
    )
  })
})
function user_id(id: any, arg1: number, product_id: any, arg3: number, quantity: any, arg5: number, user_id: any, arg7: number, status: string, arg9: string) {
    throw new Error('Function not implemented.')
}

