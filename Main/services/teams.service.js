const faker = require('faker');
const boom = require('@hapi/boom');
const {
  validateData,
  NOTFOUND,
  CONFLICT
} = require('./../utils');

class teamsServices {
  constructor() {
    this.teams = [];
  }

  generate(MongoTeams) {
    this.teams = null;
    this.teams = MongoTeams;

    /* const limit = 2;
    for (let index = 0; index < limit; index++) {
      this.teams.push({

        isActive: faker.datatype.boolean(),
        id: faker.datatype.uuid(),
        name: faker.animal.bear(),
        descripción: faker.company.bsBuzz(),

      });
    } */

  }
  //Desplegar todos los draw
  find() {
    return new Promise((resolve, rejected) => {

      var teams = this.teams.slice(0, this.teams.length);
      if (teams.length > 0) {
        resolve(teams);
      } else {
        rejected('');
      }
    });
  }

  //Encontrar Users Activos

  findActiveTeams() {
    return new Promise((resolve) => {

      const activeTeams = this.teams.filter((x) => x.isActive === true);
      resolve(activeTeams);
    });
  }
  async findOne(id) {
    //const name = this.getTotal(); PRUEBA DE ERROR DE TRY Y CATCH
    const teams = this.teams.find((item) => item.id === id);
    //NOT FOUND
    validateData(teams, NOTFOUND, 'NOT FOUND Teams', (data) => !data);
    validateData(teams, CONFLICT, 'CONFLICTO, el producto esta bloqueado.', (data) => data.isActive == false);
    return teams;
  }



  //FAKER
  create(data) {
    const newTeams = {
      id: faker.random.uuid(),
      ...data,
    };
    this.teams.push(newTeams);
    return newTeams;
  }

  async update(id, changes) {
    const index = this.teams.findIndex((item) => item.id === id);

    if (index === -1) throw boom.notFound('Error 404 not Found Draw');
    //throw new Error('Product not found'); Forma tradicional

    var currentsTeams = this.teams[index];
    this.teams[index] = {
      ...currentsTeams,
      ...changes,
    };
    return this.teams[index];
  }

  async delete(id) {
    const index = this.teams.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound('Error 404 not Found Draw');
    }
    const deleteTeams = this.teams[index];


    this.teams.splice(index, 1);
    return deleteTeams;
  }


}

module.exports = teamsServices;
