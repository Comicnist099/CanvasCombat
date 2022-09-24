const faker = require('faker');
class UserServices {
  constructor() {
    this.users = [];
    this.generate();
  }
  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.users.push({


        id:faker.datatype.uuid(),
        nameUser:faker.name.firstName() ,
        nickname:faker.name.firstName() ,
        creationDate:faker.date.future() ,
        team:faker.animal.bear(),
        facebook:faker.company.bsBuzz(),
        instagram:faker.company.bsBuzz(),
        extra:faker.company.bsBuzz(),
        image: faker.image.imageUrl(),
        points:faker.mersenne.rand() ,
        ban:1,
        typeUser:2,

      });
    }
  }
  find(limit) {
    return this.users.slice(0, limit);
  }
  findOne(id) {
    return this.users.find((item) => item.id === id);
  }
  //FAKER
  create(data) {
    const newProduct = {
      id: faker.random.uuid(),
      ...data,
    };
    this.users.push(newProduct);
    return newProduct;
  }
  async update(id, changes) {
    const index = this.users.findIndex((item) => item.id === id);
    var currentProduct = this.users[index];
    this.users[index] = {
      ...currentProduct,
      ...changes,
    };
    return this.users[index];
  }

  async delete(id) {
    const index = this.users.findIndex((item) => item.id == id);
    this.users.splice(index, 1);
    return {
      message: 'Eliminado',
      id,
    };
  }
}

module.exports = UserServices;
