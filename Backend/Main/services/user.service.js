const faker = require("faker");
const boom = require("@hapi/boom");
const errNotFound = "No se logró encontrar lo buscado";
const errEmpty = "Aún no hay cuentas creadas";
const { validateData, NOTFOUND, CONFLICT } = require("./../utils");

class UserServices {
  constructor() {
    this.users = [];
  }

  generate(MongoUser) {
    this.users = null;
    this.users = MongoUser;

    /*
    const limit = 10;
    for (let index = 0; index < limit; index++) {

      this.users.push({

        isActive: user[index].isActive,
        id: user[index].id,
        nameUser: user[index].nameUser,
        nickname: user[index].nickname,
        creationDate: user[index].creationDate,
        team: user[index].team,
        facebook: user[index].facebook,
        instagram: user[index].instagram,
        extra: user[index].extra,
        image: user[index].image,
        points: user[index].points,
        ban: user[index].ban,
        typeUser: user[index].typeUser,

        achievements1: user[index].achievements1,
        achievements2: user[index].achievements2,
        achievements3: user[index].achievements3,
        achievements4: user[index].achievements4,
        achievements5: user[index].achievements5,
        achievements6: user[index].achievements6,
        achievements7: user[index].achievements7,
        achievements8: user[index].achievements8,
        achievements9: user[index].achievements9,
        achievements10: user[index].achievements10,
        achievements11: user[index].achievements11,
      });
    }*/
  }

  //Desplegar todos los Users
  find() {
    return new Promise((resolve, rejected) => {
      let users = this.users.slice(0, this.users.length);
      if (users.length > 0) {
        resolve(users);
      } else {
        rejected("");
      }
    });
  }

  async find2(limit, UsersSearch) {
    let usersBuff = UsersSearch;

    if (usersBuff == undefined)
      throw boom.notFound(errNotFound);
    if (usersBuff.length <= 0) throw boom.notFound(errEmpty);
    let usersFinish = usersBuff.filter((item, index) => item && index < limit);

    return usersFinish;
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
    validateData(users, NOTFOUND, "NOT FOUND user", (data) => !data);
    validateData(
      users,
      CONFLICT,
      "CONFLICTO, el producto esta bloqueado.",
      (data) => data.isActive == false
    );
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

    if (index === -1) throw boom.notFound("Error 404 not Found User");
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
      throw boom.notFound("Error 404 not Found User");
    }
    const deleteUser = this.users[index];

    this.users.splice(index, 1);
    return deleteUser;
  }
}

module.exports = UserServices;
