import { User } from 'models/user-model'

export class UserRepository {
  async create({ fullName, email, password }) {
      const user = new User({ fullName, email, password })
      await user.save()
  }
  
  async findById(id) {
    const user = await User.findById(id)
    return user
  }

  async findAll() {
    const users = await User.find()
    return users
  }

  async updateUser(id, updates) {
    // Implementar
    const user = await User.findByIdAndUpdate(id, updates, { new: true })
    return user
  }

  async deleteById(id) {
    await User.findByIdAndDelete(id)
  }
}