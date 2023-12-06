import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import UserValidator from 'App/Validators/UserValidator'

export default class AuthController {
  public async register({ auth, request, response, view }: HttpContextContract) {
    try {
      const validatedData = await request.validate(UserValidator)

      const name = request.input('name')
      const email = request.input('email')
      const password = request.input('password')

      const user = new User()
      user.fill(validatedData)
      user.name = name
      user.email = email
      user.password = password

      await user.save()
      await auth.login(user)

      return response.redirect('/')
    } catch (error) {
      return view.render('auth.register', { errors: error.messages })
    }
  }

  public async login({ auth, request, response, view }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')

    try {
      await auth.attempt(email, password)
      return response.redirect('/')
    } catch {
      // Renderizar a mesma página com mensagem de erro
      return view.render('auth.login', { error: 'Credenciais inválidas' })
    }
  }

  public async logout({ auth, response }: HttpContextContract) {
    await auth.logout()

    return response.redirect('/login')
  }
}
