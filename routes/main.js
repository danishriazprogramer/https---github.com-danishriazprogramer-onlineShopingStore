const express=require("express");
const cookieparser=require("cookie-parser");
const product=require("../src/shopingstoreschema");
const appsetting=require("../src/settingSchema");
const appsettingApi=require("../routes/appSetting")
const routes=express.Router();
const jwt=require("jsonwebtoken");
const auth=require("./auth")


routes.use(cookieparser());

const user=require("../src/user");

const BodyParser= require("body-parser");
const BcryptJS=require("bcryptjs");
const settingSchema = require("../src/settingSchema");
const { json } = require("body-parser");
const { parse } = require("dotenv");
routes.use(express.json());
routes.use(express.urlencoded({extended:false}));



routes.get("/",(req,resp)=>{
  resp.render("register")
 
})

routes.get("/register",(req,resp)=>{
  resp.render("register")
 
})

//app setting

routes.get("/setting", async(req,resp)=>{

  let setting=await appsetting.find();
               
              
  resp.render("setting",{setting:setting})
   

})

//invoice 


routes.get("/invoice/:id", async(req,resp)=>{
 
      
  try{ 

    let productList= await product.findById(req.params.id)
      console.log(productList)

       
        resp.render("invoice",{productList:productList} );
   

  }catch(e){
           console.log(e)
  }

  resp.render("invoice");
})

routes.get("/login",(req,resp)=>{
  resp.render("login")
 
})


routes.get('/index', function(req, res, next) {
  var perPage = 9
  var page = req.params.page || 1

  const products=product
      .find({})
      .skip((perPage * page) - perPage)
      .limit(perPage)
      .exec(function(err, products) {
          product.count().exec(function(err, count) {
              if (err) return next(err)
              res.render('index',{products})
          })
      })
})






// register api


routes.post("/register", async(req,resp)=>{
 
  try{
    
      const registerUser = new user({
        userName:req.body.userName,
        Email:req.body.Email,
        Password:req.body.Password,
        isAdmin:req.body.isAdmin,
      })
      const token= await registerUser.generateToken();
      const register=registerUser.save();
      typeof(token)

      resp.cookie("JsonWEbToken", token,{

        expires: new Date(Date.now() + 1000*60*60*24),
        httpOnly: true,
        
      })
            
        resp.render("login")

  
  }catch(e){
           console.log(e)
           resp.render("register fail")
  }
  
})



//login api

 routes.post("/login", async(req,resp)=>{
   try{

    console.log("get coocies", req.cookies.JsonWEbToken)
             let Password=req.body.Password;
             
             const regadata= await user.findOne({Email:req.body.Email})
            

            const daaa=await BcryptJS.compareSync(Password, regadata.Password)

              if(daaa){
 
                let productList=await product.find();
               
              
                resp.render("index",{productList})
              
              
             }
   }catch(e){
    console.log(e)
   }
})
//additems

routes.post("/addItemModal", async(req,resp)=>{
 
  try{
    const connect= await product.create(req.body);
    resp.redirect("index")
     
  }catch(e){
           console.log(e)
  }
  
})

//edit user list api

routes.get("/editUserList/:id",async(req,resp)=>{
 
  try{ 

    let result= await product.findById(req.params.id)
      console.log(result)

       
        resp.render("edit",{productList:result} );
   

  }catch(e){
           console.log(e)
  }
  
})


//updateuserlist 

routes.post("/editUserList/updateUserList/:id", async(req,resp)=>{
 
  try{ 
  
    const employeesdel= await product.findByIdAndUpdate(req.params.id, req.body)
    let result= await product.findById(req.params.id)
    console.log("params id"+result)  
    resp.redirect("/index");
    
  }catch(e){
           console.log(e)
  }
  
})


// delete api

routes.get("/deleteUser/:id", async(req,resp)=>{
  try{ 

    let result= await product.findById(req.params.id)
    console.log(result)
    const employeesdel= await product.deleteOne(result)
    
    resp.redirect("/index" );
    
    
  }catch(e){
           console.log(e)
  }
  
})




//add product settings

routes.post("/addsetting", async(req,resp)=>{
 
  try{
    const connect= await appsetting.create(req.body);
    resp.redirect("setting")
     
  }catch(e){
           console.log(e)
  }
  
})





//edit  setting

routes.get("/editSetting/:id",async(req,resp)=>{
 
  try{ 

    let result= await appsetting.findById(req.params.id)
      console.log(result)

       
        resp.render("settingEdit",{productList:result} );
   

  }catch(e){
           console.log(e)
  }
  
})




//update setting

routes.post("/editSetting/updateSetting/:id", async(req,resp)=>{
 
  try{ 
  
    const employeesdel= await appsetting.findByIdAndUpdate(req.params.id, req.body)
    let result= await appsetting.findById(req.params.id)
    console.log("params id"+result)  
    resp.redirect("/setting");
    
  }catch(e){
           console.log(e)
  }
  
})



// delete  setting

routes.get("/deleteSetting/:id", async(req,resp)=>{
  try{ 

    let result= await appsetting.findById(req.params.id)
    console.log(result)
    const employeesdel= await appsetting.deleteOne(result)
    
    resp.redirect("/setting" );
    
    
  }catch(e){
           console.log(e)
  }
  
})



routes.get("/ajax",(req,resp)=>{
  resp.render("ajax")
 
})

// Handling request


// feacting produt name by ajax
routes.post("/request", async(req, resp) => {


let productPrice= await appsetting.findOne({productName:req.body.name})



if(productPrice){
  console.log(req.body.name)
  productPrice= productPrice.price;
  console.log(productPrice)
  
   resp.json({
  productPrice:productPrice,
  
   })

}else{

  resp.send("This product is not in Recode")
}



})


// feacting produt quantity by ajax

routes.post("/calculaction", async(req, resp) => {
    console.log(req.body.quantity)
    console.log(req.body.proPrice)
             let amount=req.body.quantity*req.body.proPrice;

             resp.json({
              amount:amount,
             
              })
  
  })


 

module.exports=routes;

















































