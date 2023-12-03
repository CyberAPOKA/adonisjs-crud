import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class AuthController {
    public async register({ request, response }: HttpContextContract) {
        // Lógica de registro
    }

    public async login({ auth, request, response }: HttpContextContract) {
        // Lógica de login
    }

    public async logout({ auth, response }: HttpContextContract) {
        // Lógica de logout
    }

    // Outros métodos para reset de senha, etc.
}
