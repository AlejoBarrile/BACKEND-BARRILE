import { Router } from "express";

import { ProductManager } from "../ProductManager.mjs";


const productsRouter = Router()
const status = true
const PM = new ProductManager();

// Endpoint para obtener todos los productos con límite opcional
productsRouter.get("/", async (req, res) => {
  const limit = parseInt(req.query.limit); // Parsee el query param 'limit' como número entero
  try {
    const products = await PM.getProducts();
    if (!isNaN(limit)) {
      if(limit===0){
        res.status(400).send({error: "El límite ingresado debe ser mayor a 0"})
      }
      else{
      const limitProducts=products.slice(0, limit)
      res.send({limitProducts}); // Devolver los primeros 'limit' productos
      }
    } else {
      res.send({products}); // Devolver todos los productos
    }
  } catch (error) {
    res.status(500).send({ error: "Error al obtener los productos" });
  }
});

// Endpoint para obtener un producto por su id (pid)
productsRouter.get("/:pid", async (req, res) => {
  const pid = Number(req.params.pid);
  try {
    const products = await PM.getProducts();
    const product = products.find((p) => p.id === pid);
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ status:"error", message: "Producto no encontrado"  });
    }
  } catch (error) {
    res.status(500).send({ status:"error", message: "Error al obtener el producto" });
  }
});

// Método POST para agregar un nuevo producto

 productsRouter.post('/', async (req, res) => {
    const products = await PM.getProducts();
    let {title, description, code, price, stock, category, thumbnail} = req.body
    const newProduct = 
        {
            ...req.body, status
        };
                if (
                    !title ||
                    !description ||
                    !price ||
                    !code ||
                    !stock||
                    !category
                    ) 
                {
                     res.status(400).send({status: "error", message:" Todos los campos son obligatorios!"});
                            return false
                }
                 if((thumbnail.length === 0) || (!Array.isArray(thumbnail))){
                    res.status(400).send({status: "error", message: "Complete thumbnail con un array válido!"});
                            return false
                } 
                
        try{
            if(PM.addProduct(newProduct)){
                res.send({status:"OK"   , message:"El producto se agregó exitosamente!"})
                req.io.emit('createProduct')
            } 
        }
            
        catch (error) {
            res.status(500).send({ status:"error", message: "Error al agregar el producto" });
          }
    
  });

  // Método PUT para actualizar un producto

  productsRouter.put('/:pid', async (req, res) => {
    const products = await PM.getProducts();
    const productId = Number(req.params.pid);
    let {title, description, code, price, stock, category, thumbnail} = req.body
    const updated = {...req.body}
    if (
        !title ||
        !description ||
        !price ||
        !code ||
        !stock||
        !category
        ) 
    {
         res.status(400).send({status: "error", message:" Todos los campos son obligatorios!"});
                return false
    } 
  
    const productIndex = products.findIndex((product) => product.id === productId);

    if (productIndex > -1) {
        try{
            PM.updateProduct(productIndex,  updated)
                
            
            res.status(200).send({ status:"OK", message: 'Producto actualizado correctamente' });
            }
        catch(error){
            res.status(404).send({ status:"error", error: 'Producto no encontrado' });
            }
    } 
})

productsRouter.delete('/:pid', async (req, res) => {
    const products = await PM.getProducts();
    const productId = Number(req.params.pid);
    try{
        PM.deleteProduct(productId)
        res.status(200).send({ status:"OK", message: 'Producto eliminado correctamente' });
    }
    catch(error){
        res.status(404).send({ status:"error", error: 'Producto no encontrado' });
    }
    
})

export default productsRouter