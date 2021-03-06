import express from 'express'
import Users from './routes/UserRoute'
import bodyparser from 'body-parser'
import Product from './routes/ProductRoute'
import Orders from './routes/OrderRoute'
// import cors from 'cors'
const app: express.Application = express()
app.use(bodyparser.json())
// app.use(cors)
app.get('/', (req, res) => {
  res.send('hello api ')
})
app.listen(3000, () => {
  console.log('localhost')
})
Users(app)
Product(app)
Orders(app)
export default app
