/* eslint-disable no-undef */
import { UserStore } from '../UsersModels'

const store = new UserStore()

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

  it('should have a update method', () => {
    expect(store.update).toBeDefined()
  })

  it('should have a delete method', () => {
    expect(store.delete).toBeDefined()
  })

  it('create method should add a user', async () => {
    const result = await store.create({
      username: 'test2',
      password: 'test2',
      firstname: 'Mahmoud',
      lastname: 'Sheta',
      groupid: 2,
      email: 'test2@gmail.com'
    })

    expect(result?.id).toEqual(2)
    expect(result?.firstname).toEqual('Mahmoud')
    expect(result?.password).not.toEqual('test1')
    expect(result?.lastname).toEqual('Sheta')
    expect(result?.username).toEqual('test2')
    expect(result?.groupid).toEqual(2)
    expect(result?.email).toEqual('test2@gmail.com')
  })

  it('index method should return a list of user', async () => {
    const result = await store.index()

    expect(result?.length).toBe(2)
  })
  it('show method should return the correct user', async () => {
    const result = await store.show('2')
    expect(result?.id).toEqual(2)
    expect(result?.firstname).toEqual('Mahmoud')
    expect(result?.password).not.toEqual('test2')
    expect(result?.lastname).toEqual('Sheta')
    expect(result?.username).toEqual('test2')
    expect(result?.groupid).toEqual(2)
    expect(result?.email).toEqual('test2@gmail.com')
  })
  it('auth delete method should authintaction the user', async () => {
    const result = await store.authe('test2', 'test2')
    expect(result?.id).toEqual(2)
    expect(result?.firstname).toEqual('Mahmoud')
    expect(result?.password).not.toEqual('test2')
    expect(result?.lastname).toEqual('Sheta')
    expect(result?.username).toEqual('test2')
    expect(result?.groupid).toEqual(2)
    expect(result?.email).toEqual('test2@gmail.com')
  })

  it('update method should update the user', async () => {
    const result = await store.update({
      username: 'test3',
      password: 'test2',
      firstname: 'Mahmoud',
      lastname: 'Sheta',
      groupid: 2,
      email: 'test2@gmail.com',
      id: 2
    })
    expect(result).toEqual({

      username: 'test3',
      password: 'test2',
      firstname: 'Mahmoud',
      lastname: 'Sheta',
      groupid: 2,
      email: 'test2@gmail.com',
      id: 2

    })
  })
})
