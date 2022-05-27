import { Application, NextFunction, Request, Response } from "express";
import { UserStore , User } from "../Models/UsersModels";

const userstore = new UserStore()

const Index = async (req:Request, res:Response)=>{

     const data = await userstore.index()
res.json(data)
}
    



const Create = async (req:Request, res:Response, next:NextFunction)=>{
const user:User ={
    UserName:req.body.UserName,
    Password:req.body.Password,
    FirstName:req.body.FirstName,
    LastName:req.body.LastName,
    GroupID:Number(req.body.GroupID),
    Email:req.body.Email

}

    try{
const create = await userstore.create(user)

res.json(create?.FirstName)
}catch{
res.status(400)
res.json("thers wrong")
}

}





const Users = (app:Application)=>{
app.get('/index', Index)
app.post('/create', Create)


}

export default Users