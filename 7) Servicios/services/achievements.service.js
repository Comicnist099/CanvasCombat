const faker = require('faker');
class achievementsService {
  constructor() {
    this.draws = [];
    this.generate();
  }
  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.draws.push({


        id: faker.datatype.uuid(),
        name:faker.name.firstName(),
        descripcion:"Esto es un test",

      });
    }
  }
  find(limit) {
    return this.draws.slice(0, limit);
  }
  findOne(id) {
    return this.draws.find((item) => item.id === id);
  }
  //FAKER
  create(data) {
    const newProduct = {
      id: faker.random.uuid(),
      ...data,
    };
    this.draws.push(newProduct);
    return newProduct;
  }
  async update(id, changes) {
    const index = this.draws.findIndex((item) => item.id === id);
    var currentProduct = this.draws[index];
    this.draws[index] = {
      ...currentProduct,
      ...changes,
    };
    return this.draws[index];
  }

  async delete(id) {
    const index = this.draws.findIndex((item) => item.id == id);
    this.draws.splice(index, 1);
    return {
      message: 'Eliminado',
      id,
    };
  }
}

module.exports = achievementsService;
