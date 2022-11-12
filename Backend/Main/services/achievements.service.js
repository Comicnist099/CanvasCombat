const faker = require('faker');
const boom = require('@hapi/boom');
const {
  validateData,
  NOTFOUND,
  CONFLICT
} = require('./../utils');

class achievementsServices {
  constructor() {
    this.achievements = [];
  }
  
  generate(MongoAchievements) {
    this.achievements = null;
    this.achievements = MongoAchievements;
    
  }
  //Desplegar todos los draw
  find(limit) {
    return new Promise((resolve, rejected) => {

      var achievements = this.achievements.slice(0, limit);
      if (achievements.length > 0) {
        resolve(achievements);
      } else {
        rejected('');
      }
    });
  }

  //Encontrar Users Activos

  findActiveProducts() {
    return new Promise((resolve) => {

      const activeAchievements = this.achievements.filter((x) => x.isActive === true);
      resolve(activeAchievements);
    });
  }
  async findOne(id) {
    //const name = this.getTotal(); PRUEBA DE ERROR DE TRY Y CATCH
    const achievements = this.achievements.find((item) => item.id === id);
    //NOT FOUND
    validateData(achievements, NOTFOUND, 'NOT FOUND Draw', (data) => !data);
    validateData(achievements, CONFLICT, 'CONFLICTO, el producto esta bloqueado.', (data) => data.isActive == false);
    return achievements;
  }



  //FAKER
  create(data) {
    const newAchievements = {
      id: faker.random.uuid(),
      ...data,
    };
    this.achievements.push(newAchievements);
    return newAchievements;
  }

  async update(id, changes) {
    const index = this.achievements.findIndex((item) => item.id === id);

    if (index === -1) throw boom.notFound('Error 404 not Found Draw');
    //throw new Error('Product not found'); Forma tradicional

    var currentAchievements = this.achievements[index];
    this.achievements[index] = {
      ...currentAchievements,
      ...changes,
    };
    return this.achievements[index];
  }

  async delete(id) {
    const index = this.achievements.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound('Error 404 not Found Draw');
    }
    const deleteAchievements = this.achievements[index];


    this.achievements.splice(index, 1);
    return deleteAchievements;
  }


}

module.exports = achievementsServices;
