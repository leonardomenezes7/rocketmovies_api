const AppError = require("../utils/AppError")
const { compare, hash } = require("bcrypt")
const knex = require("../database/knex")
const UserRepository = require("../repositories/UserRepository")
const UserCreateService = require("../services/UserCreateService")

class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body

    const userRepository = new UserRepository()
    const userCreateService = new UserCreateService(userRepository)

    await userCreateService.execute({ name, email, password })

    return response.json({message: "Usuário cadastrado com sucesso!"})
  }

  async update(request, response) {
    const { name, email, password, old_password } = request.body
    const user_id = request.user.id 

    const user = await knex("users").where({id: user_id}).first()

    if(!user) {
      throw new AppError("Usuário não encontrado.")
    }

    const emailAlreadyExists = await knex("users").where({email}).first()

    if(emailAlreadyExists && emailAlreadyExists.id !== user.id) {
      throw new AppError("Este E-mail ja está em uso.")
    }

    user.name = name ?? user.name
    user.email = email ?? user.email

    if(password && !old_password) {
      throw new AppError("Informe a senha antiga para criar uma nova senha.")
    }

    if(password && old_password) {
      const checkPasswords = await compare(old_password, user.password)

      if(!checkPasswords) {
        throw new AppError("A senha antiga está incorreta.")
      }

      user.password = await hash(password, 8)
    }

    await knex("users").where({id: user_id}).update({
      name: name,
      email: email,
      password: user.password
    })

    response.json({user})
  }
}

module.exports = UsersController