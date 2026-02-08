import { UserRepository } from '../repositories/user-repository.js'

const validatePayload = (payload) => {
  const { fullName, email, password } = payload

  if (!fullName || !email || !password) {
    throw new Error('fullName, email and password are required')
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    throw new Error('Invalid email format')
  }

  if (password.length < 6) {
    throw new Error('Password must be at least 6 characters')
  }
}

export class UserService {
  constructor() {
    this.userRepository = new UserRepository()
  }
  async create({ payload }) {
    try {
      validatePayload(payload)
    }
    catch (error) {
      throw new Error(error.message)
    }
    const { fullName, email, password } = payload
    return await this.userRepository.create({ fullName, email, password })
  }

  async getById(id) {
    return await this.userRepository.findById(id)
  }

  async getAll() {
    return await this.userRepository.findAll()
  }

  async update(id, updates) {
    return await this.userRepository.updateUser(id, updates)
  }

  async delete(id) {
    return await this.userRepository.deleteById(id)
  }
}