import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class IndexController {
    public async index({ view }: HttpContextContract) {
        return view.render('index');
    }
}
