import { Application, NextFunction, Request, Response } from "express";
import { product, ProductStore } from "../Models/ProductModel";

const productstore = new ProductStore()

const Index = async (req:Request, res:Response)=>{

     const data = await productstore.index()
res.json(data)
console.log(req.header)
}
    



const Create = async (req:Request, res:Response, next:NextFunction)=>{
const product:product ={
    ProductName:req.body.ProductName,
    Counts:Number(req.body.Counts),
    Price:Number(req.body.Price)
}

    try{
const create = await productstore.create(product)

res.json(create)

}catch{
res.status(400)
res.json("thers wrong")
}

}








const Product = (app:Application)=>{
app.get('/product', Index)
app.post('/product', Create)


}

export default Product