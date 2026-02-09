import User, { IUser } from '../models/user.model'

interface CreateUserInput {
  name: string
  email: string
  password: string
}

type UpdateUserInput = Partial<CreateUserInput>

export class UserRepository {
  async create({ name, email, password }: CreateUserInput): Promise<IUser> {
      const user = new User({ name, email, password })
      await user.save()
      return user
  }
  
  async findById(id: string): Promise<IUser | null> {
    const user = await User.findById(id)
    return user
  }

  async findAll(): Promise<IUser[] | null> {
    const users = await User.find()
    return users
  }

  async update(id: string, updates: UpdateUserInput): Promise<IUser | null> {
    const user = await User.findByIdAndUpdate(id, updates, { new: true })
    return user
  }

  async deleteById(id: string): Promise<string> {  // Retornar mensagem
    await User.findByIdAndDelete(id)
    return id
  }
}