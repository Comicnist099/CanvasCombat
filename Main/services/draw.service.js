const faker = require('faker');
const boom = require('@hapi/boom');
const {
  validateData,
  NOTFOUND,
  CONFLICT
} = require('./../utils');

class drawServices {
  constructor() {
    this.draws = [];
  }
  generate(MongoDraw) {

    this.draws = null;
    this.draws = MongoDraw;

  }
  //Desplegar todos los draw
  find(limit) {
    return new Promise((resolve, rejected) => {

      var draws = this.draws.slice(0, limit);
      if (draws.length > 0) {
        resolve(draws);
      } else {
        rejected('');
      }
    });
  }

  //Encontrar Users Activos

  findActiveProducts() {
    return new Promise((resolve) => {

      const activeDraws = this.draws.filter((x) => x.isActive === true);
      resolve(activeDraws);
    });
  }

  async findOne(id) {
    //const name = this.getTotal(); PRUEBA DE ERROR DE TRY Y CATCH
    const draws = this.draws.find((item) => item.id === id);
    //NOT FOUND
    validateData(draws, NOTFOUND, 'NOT FOUND Draw', (data) => !data);
    validateData(draws, CONFLICT, 'CONFLICTO, el producto esta bloqueado.', (data) => data.isActive == false);
    return draws;
  }



  //FAKER
  create(data) {
    const newDraw = {
      id: faker.random.uuid(),
      ...data,
    };
    this.draws.push(newDraw);
    return newDraw;
  }

  async update(id, changes) {
    const index = this.draws.findIndex((item) => item.id === id);

    if (index === -1) throw boom.notFound('Error 404 not Found Draw');
    //throw new Error('Product not found'); Forma tradicional

    var currentProduct = this.draws[index];
    this.draws[index] = {
      ...currentProduct,
      ...changes,
    };
    return this.draws[index];
  }

  async delete(id) {
    const index = this.draws.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound('Error 404 not Found Draw');
    }
    const deleteDraw = this.draws[index];


    this.draws.splice(index, 1);
    return deleteDraw;
  }


}

module.exports = drawServices;