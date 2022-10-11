//que lindaaaaaa la moniii
const faker = require('faker');
const boom = require('@hapi/boom');
const {
  validateData,
  NOTFOUND,
  CONFLICT
} = require('./../utils');

class UserServices {
  constructor() {
    this.users = [];
    this.generate();
  }
  generate() {
    const limit = 10;
    for (let index = 0; index < limit; index++) {
      this.users.push({

        isActive: faker.datatype.boolean(),
        id: faker.datatype.uuid(),
        nameUser: faker.name.firstName(),
        nickname: faker.name.firstName(),
        creationDate: faker.date.future(),
        team: faker.animal.bear(),
        facebook: faker.company.bsBuzz(),
        instagram: faker.company.bsBuzz(),
        extra: faker.company.bsBuzz(),
        image: faker.image.imageUrl(),
        points: faker.mersenne.rand(),
        ban: faker.datatype.boolean(),
        typeUser: faker.datatype.boolean(),

        achievements1: faker.datatype.boolean(),
        achievements2: faker.datatype.boolean(),
        achievements3: faker.datatype.boolean(),
        achievements4: faker.datatype.boolean(),
        achievements5: faker.datatype.boolean(),
        achievements6: faker.datatype.boolean(),
        achievements7: faker.datatype.boolean(),
        achievements8: faker.datatype.boolean(),
        achievements9: faker.datatype.boolean(),
        achievements10: faker.datatype.boolean(),
        achievements11: faker.datatype.boolean(),




      });
    }
  }

  async create(data) {
    const newUser = {
      id: faker.datatype.uuid(),
      ...data,
    };
    this.products.push(newUser);
    return newUser;
  }
  //Desplegar todos los Users
  find(limit) {
    return new Promise((resolve, rejected) => {

      var users = this.users.slice(0, limit);
      if (users.length > 0) {
        resolve(users);
      } else {
        rejected('');
      }
    });
  }

  //Encontrar Users Activos

  findActiveProducts() {
    return new Promise((resolve) => {

      const activeUsers = this.users.filter((x) => x.isActive === true);
      resolve(activeUsers);
    });
  }
  async findOne(id) {
    //const name = this.getTotal(); PRUEBA DE ERROR DE TRY Y CATCH
    const users = this.users.find((item) => item.id === id);
    //NOT FOUND
    validateData(users, NOTFOUND, 'NOT FOUND user', (data) => !data);
    validateData(users, CONFLICT, 'CONFLICTO, el producto esta bloqueado.', (data) => data.isActive == false);
    return users;
  }





  //FAKER
  create(data) {
    const newUser = {
      id: faker.random.uuid(),
      ...data,
    };
    this.users.push(newUser);
    return newUser;
  }


  async update(id, changes) {
    const index = this.users.findIndex((item) => item.id === id);

    if (index === -1) throw boom.notFound('Error 404 not Found User');
    //throw new Error('Product not found'); Forma tradicional

    var currentProduct = this.users[index];
    this.users[index] = {
      ...currentProduct,
      ...changes,
    };
    return this.users[index];
  }

  async delete(id) {
    const index = this.users.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound('Error 404 not Found User');
    }
    const deleteUser = this.users[index];


    this.users.splice(index, 1);
    return deleteUser;
  }


}

module.exports = UserServices;
