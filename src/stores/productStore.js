import { defineStore } from 'pinia';
import axios from "axios";


export const useProductStore = defineStore("product", {
    state: () => ({
      products: [],
      productErrors: null,
    }),
    getters: {
      getProducts: (state) => state.products,
    },
    actions: {
      async fetchProducts() {
        try {
          const response = await axios.get("http://127.0.0.1:8000/api/products");
          this.products = response.data;
          
        } catch (error) {
          console.error("Error al obtener productos:", error);
        }
      },
      async fetchProductById(id_producto){
        try {
          const response = await axios.get("http://127.0.0.1:8000/api/products/"+id_producto);
          this.product = response.data;
          return response.data;
        } catch (error) {
          console.error("Error al obtener productos:", error);
        }
      }
      ,
  
      async addProduct(productData) {
            try {
                
                await axios.post("http://127.0.0.1:8000/api/products", productData);
                await this.fetchProducts(); // Actualizar lista después de agregar
            } catch (error) {
                if (error.response) {
                    console.error("Error en la respuesta del servidor:", error.response.data);
                    this.productErrors = error.response.data.errors || error.response.data.message || "Error desconocido";
                } else if (error.request) {
                    console.error("No hubo respuesta del servidor:", error.request);
                    this.productErrors = "No se recibió respuesta del servidor.";
                } else {
                    console.error("Error al procesar la solicitud:", error.message);
                    this.productErrors = error.message;
                }
            }
        },
  
      async updateProduct(productId, updatedData) {
        try {
          await axios.put(`http://127.0.0.1:8000/api/products/${productId}`, updatedData);
          await this.fetchProducts(); // Actualizar lista después de editar
        } catch (error) {
          this.productErrors = error.response?.data.errors || "Error desconocido";
        }
      },
  
      async deleteProduct(productId) {
        try {
          await axios.delete(`http://127.0.0.1:8000/api/products/${productId}`);
          this.products = this.products.filter((p) => p.id !== productId); // Eliminar producto de la lista
        } catch (error) {
          console.error("Error al eliminar producto:", error);
        }
      },
    },
  });