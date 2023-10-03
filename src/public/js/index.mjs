import { ProductManager } from "../../ProductManager.mjs";



const socket = io();
socket.emit("message", "HOLAAAAAAAAAAAAAAA")
const PM = new ProductManager;

// Función para actualizar la lista de productos en el DOM
function updateList() {
   const products =  PM.getProducts()
  const lista = document.getElementById('lista');
  lista.innerHTML = ''; // Limpiar la lista actual

  // Iterar sobre los productos y agregarlos al DOM
  products.forEach((item) => {
    const product = document.createElement('div');
    product.innerHTML = `
      <p class="product">ID: ${item.id}</p>
      <p class="product">Nombre: ${item.title}</p>
      <p class="product">Descripción: ${item.description}</p>
      <p class="product">Precio: $${item.price}</p>
    `;

    lista.appendChild(product);
  });
}

// Escuchar el evento "createProduct" para actualizar la lista cuando se crea un producto
socket.on('createProduct', ()=> {
  // Actualizar la lista de productos con el nuevo producto
  updateList(newProduct);
});

/* // Escuchar el evento "deleteProduct" para actualizar la lista cuando se elimina un producto
socket.on('deleteProduct', (productId) => {
  // Eliminar el producto de la lista en el DOM (puedes implementar esta lógica según tus necesidades)
  // Por ejemplo, podrías buscar el elemento con el ID y eliminarlo del DOM.
});
 */