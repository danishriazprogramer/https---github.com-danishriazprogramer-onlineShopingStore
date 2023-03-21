const express=require("express");
const routes=express.Router();


routes.use(cookieparser());

const product=require("../src/shopingstoreschema");
routes.post("/addItemModal", async(req,resp)=>{
 
    try{
      const connect= await product.create(req.body);
      resp.redirect("/");
    }catch(e){
             console.log(e)
    }
    
  })