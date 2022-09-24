const faker = require('faker');
class ProductService {
  constructor() {
    this.products = [];
    this.generate();
  }
  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
      });
    }
  }
  find(limit) {
    return this.products.slice(0, limit);
  }
  findOne(id) {
    return this.products.find((item) => item.id === id);
  }
  //FAKER
  create(data) {
    const newProduct = {
      id: faker.random.uuid(),
      ...data,
    };
    this.products.push(newProduct);
    return newProduct;
  }
  async update(id, changes) {
    const index = this.products.findIndex((item) => item.id === id);
    var currentProduct = this.products[index];
    this.products[index] = {
      ...currentProduct,
      ...changes,
    };
    return this.products[index];
  }

  async delete(id) {
    const index = this.products.findIndex((item) => item.id == id);
    this.products.splice(index, 1);
    return {
      message: 'Eliminado',
      id,
    };
  }
}

module.exports = ProductService;
