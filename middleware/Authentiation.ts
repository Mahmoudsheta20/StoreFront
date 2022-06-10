import { Request, Response, NextFunction } from 'express'
import jwt, { Secret } from 'jsonwebtoken'
import { User } from '../src/Models/UsersModels'
const SECRET = process.env.TOKEN as Secret

export function getTokenByUser (user: User) {
  return jwt.sign({ user }, SECRET)
}

const validate = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = String(req.headers.authorization).split(' ')[1]

    jwt.verify(token, SECRET)
    next()
  } catch (err) {
    console.error(err)

    res.status(401)
    res.json('Access denied, invalid token')

    return false
  }
}
export default validate
