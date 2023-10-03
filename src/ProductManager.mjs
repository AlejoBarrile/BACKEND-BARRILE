

import { error } from "console";

import fs,{ readFileSync, readFile, writeFile } from "fs";



class ProductManager {
    constructor() {
        this.products = [];
        this.path = "products.json"
        this.createFile()
    }
    showError(error){
        console.log("Error al leer el archivo: ", error)
    }
    
    async getProducts() {
            try {
                const data = readFileSync(this.path, 'utf-8')
                this.products = await JSON.parse(data);
                
                return this.products;
                
            } catch (error) {
                this.showError(error);
                return this.products; // Devolver el array vacío en caso de error
            }
        }

    async saveChanges(prods) {
        try {
            const data = JSON.stringify(prods, null, 2);
            await fs.promises.writeFile(this.path, data);
            console.log('¡Guardado exitosamente!');
        } catch (error) {
            this.showError(error);
        }
      }
    

    getId(){
        let max=0
        this.products.forEach(prod =>{
            max = prod.id > max && prod.id
        })
        return(max+1)
    }

        async createFile() {
            if (!fs.existsSync(this.path)) {
            try {
                // Si el archivo no existe, crea un archivo vacío con un array JSON.
                await fs.promises.writeFile(this.path, '[]');
            } catch (error) {
                this.showError(error);
            }
            } else {
            try {
                const data = readFileSync(this.path, 'utf-8');
                // Intenta analizar el contenido del archivo como JSON.
                const parsedData = JSON.parse(data);
                if (Array.isArray(parsedData)) {
                // Verifica si el contenido es un array válido.
                this.products = parsedData;
                } else {
                // Si no es un array válido, muestra un mensaje de error o maneja la situación de manera adecuada.
                console.error('El archivo no contiene un array JSON válido.');
                }
            } catch (error) {
                this.showError(error);
            }
            }
        }
      

    async addProduct (newProduct) {

        try{
            if(this.products){
                const existingProduct =  this.products.find((prod) => prod.code === newProduct.code)

                if (existingProduct) {

                     const mensaje = ("Error: El producto con código "+newProduct.code+" ya existe.")
                     return mensaje
                
                }
                else{
                    const product = {id: this.getId(), title:newProduct.title, description:newProduct.description, price:newProduct.price, thumbnail:newProduct.thumbnail, code:newProduct.code, stock:newProduct.stock, category:newProduct.category}
                    this.products.push(product)
                    console.log("Producto con código "+ product.code +" agregado correctamente.")
                    await this.saveChanges(this.products)
                    const mensaje = ("Proceso de agregado terminado.")      
                    return mensaje        }
            }   }
        catch(error){
            this.showError(error)
            }
    }
 
    async updateProduct(index, updated){

        let pos = index
        
            
                this.products[pos].title = updated.title 
            
            
                this.products[pos].description = updated.description 
              
            
                this.products[pos].price = updated.price
            
            
                this.products[pos].thumbnail = updated.thumbnail
            
            
                this.products[pos].code = updated.code
            
            
                this.products[pos].stock = updated.stock
            
        
                this.products[pos].category = updated.category





            
            
            await this.saveChanges(this.products)
            console.log("Producto actualizado correctamente")
         

    } 

  async  deleteProduct(id){
        
        let existe = this.products.some((prod) => prod.id === id )
        if(existe===true){
            this.products = this.products.filter((prod) => prod.id !== id)
           await this.saveChanges(this.products)
            console.log("Producto con ID: #"+id +" eliminado")
            return this.products
        } 
        else{
            console.log("Error! el ID ingresado no existe entre los productos")
        } 
        

        
    }
    
  

   getProductById(id) {
        const productById = this.products.find((prod) => prod.id === id);
        if (productById) {
            return productById;
        } else {
            console.error('PRODUCTO CON ID #'+id +" NOT FOUND");
        }
  
}
}




const productNew = new ProductManager();


// MUESTRO TODOS LOS PRODUCTOS QUE TENGO EN products.json
/* productNew.getProducts()
    .then(products=>{
        console.log(products)
    }) */

// AL YA HABERLOS CREADO, LOS COMENTO PARA QUE NO ARROJE ERROR
/* 
const product1 = {
                title:'Jabón Dove',
                description: 'Jabón de crema con ph neutro, sin aromatizantes ni colorantes',
                price: 300 ,
                thumbnail: 'imagen' ,
                code: 'P3' , 
                stock:  10,
                category: "bath"}
                
productNew.addProduct(product1)
  .then((mensaje) => {
    console.log(mensaje)

})
  .catch((error) => {
    console.log("Error:"+error);
});    */    // ESTE METODO ESTA APLICADO CON ASINCRONIA CORRECTAMENTE

/* productNew.addProduct('Jabón Dove',
    'Jabón de crema con ph neutro, sin aromatizantes ni colorantes',
    300,
    'imagen',
    'P1',
    10)


  productNew.addProduct('Shampoo Orgánico',
    'Shampoo sin agregados químicos de 500ml',
    1200,
    'imagen2',
    'P2',
    5)


 productNew.addProduct('Neutrogena HydroBoost',
    'Gel con base de agua hidratante para pieles grasas',
    3500,
    'imagen3',
    'P3',
    8)

productNew.addProduct('Acondicionador Loreal',
    'Acondicionador de aloe vera de 500ml, regenera y fortalece',
    900,
    'imagen4',
    'P4',
    3)

productNew.addProduct('Cepillo de dientes Colgate Bamboo',
    'Cepillo de dientes de bamboo, orgánico y reciclable, cerdas ultra suaves',
    800,
    'imagen5',
    'P5',
    12)
  */


//ACÁ ARROJARÁ ERROR PORQUE SE REPITE EL CODE DE PRODUCTO
/* productNew.addProduct('Jabón Dove',
'Jabón de crema con ph neutro, sin aromatizantes ni colorantes',
300,
'imagen',
'P1',
10) 
 */


// MUESTRO PRODUCTO CON ID=3
/* console.log( productNew.getProductById(3) ) */



// MUESTRO ERROR NOT FOUND DEL PROD NO ENCONTRADO
/* productNew.getProductById(11)
.then(prod=>{
    console.log("PRODUCTO ENCONTRADO: ",prod)
})
.catch(error=>{
    console.log("No se encontró el producto: ",error)
}) */

 // ELIMINO PRODUCTO CON ID: 4
/* productNew.deleteProduct(3)
.then(products=>{
    console.log("Producto eliminado", products)
})
.catch(error=>{
    console.log("Error, no se encontró el producto indicado ", error)
})
 */
// MUESTRO QUE SE ELIMINÓ CORRECTAMENTE
/* console.log(productNew.getProductById(5)) */

 // ACTUALIZO EL PRODUCTO CON ID 4
/* productNew.updateProduct(4, "Crema para peinar Sedal",
                            "Crema con tecnologia nutricional para rizos definidos",
                            1000,
                            "imagen4",
                            "P4",
                            3,) 
 */



// MUESTRO LA INSTANCIA GENERADA
/* console.log(productNew) */

export {ProductManager}
