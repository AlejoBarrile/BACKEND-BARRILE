import { Router } from "express";
import { ProductManager } from "../ProductManager.mjs";

const PM = new ProductManager
const router = Router()

router.get("/", async (req, res)=>{
    try{
      
      const products = await PM.getProducts()
      res.render('home', { products });
    }catch(error){
      console.log(error)
    }

          
})

router.get("realtimeproducts", async (req, res)=>{
  try{
    
    const products = await PM.getProducts()
    res.render('realTimeProducts', { products });
  }catch(error){
    console.log(error)
  }


})


export default router