import { Router } from "express";
import { CartManager } from "../cartManager.mjs";

const cartsRouter = Router()
const CM = new CartManager();

cartsRouter.post('/', async (req, res) => {
    try{
        CM.newCart()
    } 
    catch (error) {
        res.status(500).send({ status:"error", message: "Error al agregar el carrito" });
      }
    res.status(200).send({status:"OK", message:"Nuevo carrito añadido exitosamente"});
  });


  cartsRouter.get('/:cid', async (req, res) => {
    let cid = Number(req.params.cid)
    const carts = await CM.getCarts()
    const cartById =  carts.find((cart) => cart.id === cid);
        if(cartById){
            try{
            res.send(cartById.products);
        }
            catch(error) {
                console.log(error)
            }
        }
        
        else{

            res.status(404).send({status:"error", message: 'Carrito no encontrado',});
        }
  });


  cartsRouter.post('/:cid/product/:pid', async (req, res) => {
    const cid = Number(req.params.cid);
    const pid = Number(req.params.pid);
  
    try {
      if (await CM.addProduct(cid, pid)) {
        res.status(200).send({
          status: "OK",
          message: "Producto #" + pid + " agregado correctamente al carrito #" + cid
        });
      } else {
        res.status(400).send({
          status: "error",
          message: "Carrito no encontrado"
        });
      }
    } catch (error) {
      res.status(500).send({
        status: "error",
        message: "Error al agregar el producto",
        error: error.message // Solo envía el mensaje de error en lugar de todo el objeto error
      });
    }
  });
  



export default cartsRouter