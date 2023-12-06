import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class IndexController {
    public async index({ view }: HttpContextContract) {
        return view.render('index');
    }

    public async register({ view }: HttpContextContract) {
        return view.render('auth.register');
    }

    public async login({ view }: HttpContextContract) {
        return view.render('auth.login');
    }
}
