const faker = require('faker');
const boom = require('@hapi/boom');
const {
  validateData,
  NOTFOUND,
  CONFLICT
} = require('./../utils');

class commentServices {
  constructor() {
    this.comments = [];
    this.generate();
  }
  generate() {
    const limit = 2;
    for (let index = 0; index < limit; index++) {
      this.comments.push({

        isActive: faker.datatype.boolean(),
        id: faker.datatype.uuid(),
        idDraw:faker.datatype.uuid(),
        name: faker.animal.bear(),
        descripción: faker.company.bsBuzz(),




      });
    }
  }
  //Desplegar todos los draw
  find(limit) {
    return new Promise((resolve, rejected) => {

      var comments = this.comments.slice(0, limit);
      if (comments.length > 0) {
        resolve(comments);
      } else {
        rejected('');
      }
    });
  }

  //Encontrar Users Activos

  findActiveComments() {
    return new Promise((resolve) => {

      const activeComments = this.comments.filter((x) => x.isActive === true);
      resolve(activeComments);
    });
  }
  async findOne(id) {
    //const name = this.getTotal(); PRUEBA DE ERROR DE TRY Y CATCH
    const comments = this.comments.find((item) => item.id === id);
    //NOT FOUND
    validateData(comments, NOTFOUND, 'NOT FOUND Comments', (data) => !data);
    validateData(comments, CONFLICT, 'CONFLICTO, el producto esta bloqueado.', (data) => data.isActive == false);
    return comments;
  }

  async findCommentsDraw(id) {
    //const name = this.getTotal(); PRUEBA DE ERROR DE TRY Y CATCH
    const comments = this.comments.find((item) => item.idDraw === id);
    //NOT FOUND
    validateData(comments, NOTFOUND, 'NOT FOUND Comments', (data) => !data);
    validateData(comments, CONFLICT, 'CONFLICTO, el producto esta bloqueado.', (data) => data.isActive == false);
    return comments;
  }




  //FAKER
  create(data) {
    const newComments = {
      id: faker.random.uuid(),
      ...data,
    };
    this.comments.push(newComments);
    return newComments;
  }

  async update(id, changes) {
    const index = this.comments.findIndex((item) => item.id === id);

    if (index === -1) throw boom.notFound('Error 404 not Found Draw');
    //throw new Error('Product not found'); Forma tradicional

    var currentsComments = this.comments[index];
    this.comments[index] = {
      ...currentsComments,
      ...changes,
    };
    return this.comments[index];
  }

  async delete(id) {
    const index = this.comments.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound('Error 404 not Found Draw');
    }
    const deleteComments = this.comments[index];


    this.comments.splice(index, 1);
    return deleteComments;
  }


}

module.exports = commentServices;
