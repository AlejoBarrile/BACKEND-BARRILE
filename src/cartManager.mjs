

import { error } from "console";

import fs,{ readFileSync } from "fs";



class CartManager {
    constructor() {
        this.carts = [];
        this.path = "carrito.json"
        this.createFile()
    }
    showError(error){
        console.log("Error al leer el archivo: ", error)
    }
    
    async getCarts() {
            try {
                const data = await fs.promises.readFile(this.path, 'utf-8')
                this.carts = await JSON.parse(data);
                
                return this.carts;
                
            } catch (error) {
                
                this.carts = []; // Devolver el array vacío en caso de error
            }
        }



    async newCart(){
            this.carts.push({id:this.getId(), products:[]})
            this.saveChanges(this.carts)
            console.log("Carrito guardado")
        }
    
  /*   async addProduct(cid, pid){
        await this.getCarts()
        const index =  this.carts.findIndex((cart) => cart.id === cid);
        
        
        if (index != -1) {
            console.log("EStoy acAAA")
            const cart = this.carts[index];
            const existingProduct = cart.products.find((prod) => prod.product === pid);
            if (existingProduct) {
             try{cart.products[pid].quantity ++;
                    return true
                }

             catch(error){
                console.log(error)
                } 
            } else {
              try{
                  cart.products.push({ product: pid, quantity: 1 });
                  this.saveChanges(this.carts)
                  return true
              }
              catch(error){
                console.log(error)
              } 
            }
          } else {
              return false
            }
            
         

    }
 */

    async addProduct(cid, pid) {
        try {
          await this.getCarts();
          const index = this.carts.findIndex((cart) => cart.id === cid);
      
          if (index !== -1) {
            const cart = this.carts[index];
            const existingProductIndex = cart.products.findIndex((prod) => prod.product === pid);
      
            if (existingProductIndex !== -1) {
              cart.products[existingProductIndex].quantity++;
            } else {
              cart.products.push({ product: pid, quantity: 1 });
            }
      
            await this.saveChanges(this.carts);
            return true;
          } else {
            return false;
          }
        } catch (error) {
          console.error(error);
          throw error; // Propagar el error para manejo superior si es necesario
        }
      }
      


    async saveChanges(carts) {
        try {
            const data = JSON.stringify(carts, null, 2);
            await fs.promises.writeFile(this.path, data);
            console.log('¡Guardado exitosamente!');
        } catch (error) {
            showError(error);
        }
      }
    

    getId(){
        let max=0
        this.carts.forEach((cart) =>{
            max = cart.id > max && cart.id
        })
        return(max+1)
    }

    async createFile(){
        if(!fs.existsSync(this.path)){
            try{
                const data = JSON.stringify(this.carts);
                await fs.promises.writeFile(this.path, data);
            }
            catch(error){
                showError(error)
            }
        }else{
              this.carts = this.getCarts()  
        }
    }


   

}




export {CartManager}
