const { hash } = require("bcrypt")
const AppError = require("../utils/AppError")

class UserCreateService {
  constructor(userRepository) {
    this.userRepository = userRepository
  }

  async execute({ name, email, password }) {
    const userAlreadyExists = await this.userRepository.findByEmail(email)

    if(!name || !email || !password) {
      throw new AppError("Insira todos os dados.")
    }

    if(userAlreadyExists) {
      throw new AppError("Este email ja está em uso.")
    }

    const encryptedPassword = await hash(password, 8)

    const userCreated = await this.userRepository.create({ name, email, password: encryptedPassword })

    return userCreated
  }
}

module.exports = UserCreateService