import { UserService } from '../services/user-service.js'

export class UserController {
  constructor() {
    this.userService = new UserService()
  }

  async create(req, res) {
    try {
      const { payload } = req.body

      const user = await this.userService.create({ payload })

      res.status(201).json({
        data: user
      })
    } catch (error) {
      res.status(400).json({
        error: error.message
      })
    }
  }

  async getById(req, res, next) {
    try {
      const { id } = req.params

      if (!id) {
        return res.status(400).json({
          success: false,
          error: 'User ID is required'
        })
      }

      const user = await this.userService.getById(id)

      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'User not found'
        })
      }

      res.json({
        success: true,
        data: user
      })
    } catch (error) {
      next(error)
    }
  }

  async getAll(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1
      const limit = parseInt(req.query.limit) || 10

      // Validação de paginação
      if (page < 1 || limit < 1) {
        return res.status(400).json({
          success: false,
          error: 'Page and limit must be positive numbers'
        })
      }

      const users = await this.userService.getAll()

      // Implementar paginação manualmente
      const startIndex = (page - 1) * limit
      const endIndex = startIndex + limit

      const paginatedUsers = users.slice(startIndex, endIndex)

      res.json({
        success: true,
        data: paginatedUsers,
        pagination: {
          currentPage: page,
          limit,
          totalItems: users.length,
          totalPages: Math.ceil(users.length / limit)
        }
      })
    } catch (error) {
      next(error)
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params
      const updates = req.body

      if (!id) {
        return res.status(400).json({
          success: false,
          error: 'User ID is required'
        })
      }

      if (Object.keys(updates).length === 0) {
        return res.status(400).json({
          success: false,
          error: 'At least one field must be provided for update'
        })
      }

      // Validação de email se estiver sendo atualizado
      if (updates.email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(updates.email)) {
          return res.status(400).json({
            success: false,
            error: 'Invalid email format'
          })
        }
      }

      // Validação de senha se estiver sendo atualizada
      if (updates.password && updates.password.length < 6) {
        return res.status(400).json({
          success: false,
          error: 'Password must be at least 6 characters'
        })
      }

      const user = await this.userService.update(id, updates)

      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'User not found'
        })
      }

      res.json({
        success: true,
        message: 'User updated successfully',
        data: user
      })
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params

      if (!id) {
        return res.status(400).json({
          success: false,
          error: 'User ID is required'
        })
      }

      const result = await this.userService.delete(id)

      if (!result) {
        return res.status(404).json({
          success: false,
          error: 'User not found'
        })
      }

      res.json({
        success: true,
        message: 'User deleted successfully'
      })
    } catch (error) {
      next(error)
    }
  }
}