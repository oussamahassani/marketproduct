import axios from 'axios';

const API_URL = 'http://localhost:8080/produits';

class ProductServices {

  getAllProducts(page = 0, pageSize = 20) {
    return axios.get(`${API_URL}?page=${page}&pageSize=${pageSize}`);
  }

  getProductById(id) {
    return axios.get(`${API_URL}/${id}`);
  }

  createProduct(product) {
    return axios.post(`${API_URL}`, product);
  }

  updateProduct(productId, product) {
    return axios.patch(`${API_URL}/${productId}`, product)
      .then(response => {
        console.log("Product updated:", response.data);
        return response.data;
      })
      .catch(error => {
        console.error("Error updating product:", error.response ? error.response.data : error.message);
        throw error;
      });
  }

  deleteProduct(productId) {
    return axios.delete(`${API_URL}/${productId}`);
  }
}

export default new ProductServices();
