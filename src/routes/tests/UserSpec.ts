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
    const { id, username, token: usertoken } = res.body.data
    expect(id).toBe(1)
    expect(username).toBe('test1')
    token = usertoken
  })
  it('users index', async () => {
    const res = await request.get('/user/index')
      .set('Authorization', 'Bearer ' + token)
    expect(res.status).toBe(200)
  })

  it('user create', async () => {
    const res = await request.post('/user/create').set('Content-type', 'application/json').send({
      username: 'test4',
      password: 'test4',
      firstname: 'Mahmoud',
      lastname: 'Sheta',
      groupid: 2,
      email: 'test4@gmail.com'
    })
    expect(res.body.data.id).toEqual(3)
    expect(res.body.data.firstname).toEqual('Mahmoud')
    expect(res.body.data.password).not.toEqual('test4')
    expect(res.body.data.lastname).toEqual('Sheta')
    expect(res.body.data.username).toEqual('test4')
    expect(res.body.data.groupid).toEqual(2)
    expect(res.body.data.email).toEqual('test4@gmail.com')
  })
  it('user update', async () => {
    const res = await request.put('/user/update/3').set('Content-type', 'application/json').set('Authorization', 'Bearer ' + token).send({
      username: 'test5',
      password: 'test4',
      firstname: 'Mahmoud',
      lastname: 'Sheta',
      groupid: 2,
      email: 'test4@gmail.com'
    })
    expect(res.body.data).toEqual({
      id: 3,
      username: 'test5',
      password: 'test4',
      firstname: 'Mahmoud',
      lastname: 'Sheta',
      groupid: 2,
      email: 'test4@gmail.com'

    })
  })
  it('user show', async () => {
    const res = await request.get('/user/show/3').set('Content-type', 'application/json').set('Authorization', 'Bearer ' + token)
    expect(res.body.data).toEqual({

      id: 3,
      username: 'test5',
      password: 'test4',
      firstname: 'Mahmoud',
      lastname: 'Sheta',
      groupid: 2,
      email: 'test4@gmail.com'
    })
  })

  it('user delete', async () => {
    const res = await request.delete('/user/delete/3').set('Content-type', 'application/json').set('Authorization', 'Bearer ' + token)
    expect(res.body.data).toEqual({

      id: 3,
      username: 'test5',
      password: 'test4',
      firstname: 'Mahmoud',
      lastname: 'Sheta',
      groupid: 2,
      email: 'test4@gmail.com'
    })
  })
})
