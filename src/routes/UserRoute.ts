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

res.json({
    data:{...create}
})
}catch{
res.status(400)
res.json("thers wrong")
}

}


const show =async(req:Request, res:Response)=>{
    
 const id = String(req.params.id)
 console.log(id)
    

 try{
     const UserShow= await userstore.show(id)
     res.json(UserShow)
 }catch{

 }
    
    
    
    }

const DELETE = async(req:Request, res:Response)=>{
    
const id = req.params.id
    
 
    

 try{
     const UserShow= await userstore.delete(id)
     res.json({
data: {...UserShow}

     })
 }catch{

    res.status(400)
 }
    
    
    
    }






const Users = (app:Application)=>{
app.get('/user/index', Index)
app.post('/user/create', Create)
app.get('/user/show/:id', show)
app.post('/delete/:id', DELETE)


}

export default Users