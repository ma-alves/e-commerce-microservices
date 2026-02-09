// https://github.com/fiston-user/chatapp-yt/blob/main/services/user-service/src/services/user.service.ts

// validações são aqui

import { HttpError } from '@e-commerce/common'
import { UserRepository } from '../repositories/user.repository'
import { IUser } from '../models/user.model'

interface CreateUserInput {
  name: string
  email: string
  password: string
}

type UpdateUserInput = Partial<CreateUserInput>

class UserService {
  private userRepository: UserRepository

  constructor() {
    this.userRepository = new UserRepository()
  }

  async create(userData: CreateUserInput): Promise<IUser> {
    try {
      return await this.userRepository.create(userData)
    } catch (error) {
      throw new HttpError(500, `Failed to create user: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  async findById(id: string): Promise<IUser> {
    try {
      const user = await this.userRepository.findById(id)
      if (!user) throw new Error('User not found')
      return user
    } catch (error) {
      throw new HttpError(404, 'User not found')
    }
  }

  async findAll(): Promise<IUser[]> {
    try {
      const users = await this.userRepository.findAll()
      return users || []
    } catch (error) {
      throw new HttpError(500, `Failed to fetch users: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  async update(id: string, updates: UpdateUserInput): Promise<IUser> {
    try {
      const user = await this.userRepository.update(id, updates)
      if (!user) throw new HttpError(404, 'User not found')
      return user
    } catch (error) {
      throw new HttpError(500, `Failed to update user: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  async deleteById(id: string): Promise<string> {
    try {
      return await this.userRepository.deleteById(id)
    } catch (error) {
      throw new HttpError(500, `Failed to delete user: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }
}

const userService = new UserService()

export default userService