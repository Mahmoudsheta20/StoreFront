import { Application, NextFunction, Request, Response } from 'express'
import { UserStore, User } from '../Models/UsersModels'
import validate, { getTokenByUser } from '../../middleware/Authentiation'
const userstore = new UserStore()

const Index = async (req: Request, res: Response) => {
  try {
    const result = await userstore.index()
    res.json({
      status: 'success',
      data: result,
      message: 'user authenticated successfully'

    })
  } catch {}
}

const Create = async (req: Request, res: Response, next: NextFunction) => {
  const user: User = {
    username: req.body.username,
    password: req.body.password,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    groupid: Number(req.body.groupid),
    email: req.body.email
  }

  try {
    const create = await userstore.create(user)

    res.json({
      status: 'success',
      data: { ...create },
      message: 'user authenticated successfully'

    })
  } catch (err) {
    res.status(401)
    res.json('sad')
  }
}

const show = async (req: Request, res: Response) => {
  const id = String(req.params.id)

  try {
    const UserShow = await userstore.show(id)
    res.json({
      status: 'success',
      data: { ...UserShow },
      message: 'user authenticated successfully'

    })
  } catch {
    res.json({
      message: `user id:${id} does not exist`
    })
  }
}

const DELETE = async (req: Request, res: Response) => {
  const id = req.params.id

  try {
    const UserShow = await userstore.delete(id)
    res.json({
      data: { ...UserShow }
    })
  } catch {
    res.status(400)
  }
}

const auth = async (req: Request, res: Response) => {
  const username = req.body.username
  const password = req.body.password

  try {
    const UserAuth = await userstore.authe(username, password)

    if (UserAuth) {
      const token = getTokenByUser(UserAuth)
      res.json({
        status: 'success',
        data: { ...UserAuth, token },
        message: 'user authenticated successfully'

      })
    }
  } catch {
    res.status(400)
    res.json('User or Password is not Exit')
  }
}

const ubdate = async (req: Request, res: Response) => {
  const user: User = {
    username: req.body.username,
    password: req.body.password,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    id: req.params.id as unknown as number
  }

  try {
    const update = await userstore.update(user)
    res.json({
      status: 'success',
      data: { ...update },
      message: 'user authenticated successfully'

    })
  } catch {
    res.status(400)
  }
}

const Users = (app: Application) => {
  app.get('/user/index', validate, Index)
  app.post('/user/create', Create)
  app.get('/user/show/:id', validate, show)
  app.delete('/user/delete/:id', validate, DELETE)
  app.post('/user/auth', auth)
  app.put('/user/update/:id', validate, ubdate)
}

export default Users
