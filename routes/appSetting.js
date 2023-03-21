const express=require("express");
const cookieparser=require("cookie-parser");
const product=require("../src/shopingstoreschema");
const appsetting=require("../src/settingSchema");
const routes=express.Router();
const jwt=require("jsonwebtoken");
const auth=require("./auth")


routes.use(cookieparser());

const user=require("../src/user");

const BodyParser= require("body-parser");
const BcryptJS=require("bcryptjs");
routes.use(express.json());
routes.use(express.urlencoded({extended:false}));





//add product settings

routes.post("/addsetting", async(req,resp)=>{
 
    try{
      const connect= await appsetting.create(req.body);
      resp.redirect("setting")
       
    }catch(e){
             console.log(e)
    }
    
  })

//edit 

routes.get("/editUserList/:id",async(req,resp)=>{
 
    try{ 
  
      let result= await product.findById(req.params.id)
        console.log(result)
  
         
          resp.render("settingEdit",{productList:result} );
     
  
    }catch(e){
             console.log(e)
    }
    
  })


