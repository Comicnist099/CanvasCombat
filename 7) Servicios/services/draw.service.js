const faker = require('faker');
class drawService {
  constructor() {
    this.draws = [];
    this.generate();
  }
  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.draws.push({


        id: faker.datatype.uuid(),
        character: faker.name.firstName(),
        owner: faker.name.firstName(),
        cartoonist: faker.name.firstName(),
        creationDate: faker.date.future(),
        team: faker.animal.bear(),
        Background: 2,
        Detail: 2,
        body: 2,
        image: faker.image.imageUrl(),
        points:faker.mersenne.rand(),



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

module.exports = drawService;
