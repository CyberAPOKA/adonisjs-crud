import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Note from 'App/Models/Note'
import Application from '@ioc:Adonis/Core/Application'
import { DateTime } from 'luxon'
import { v4 as uuidv4 } from 'uuid'
import NoteValidator from 'App/Validators/NoteValidator'

export default class NoteController {
  public async store({ request, response, auth, session }: HttpContextContract) {
    try {
      const potentialValue = request.input('potential')
      if (potentialValue) {
        const convertedPotential = convertValueToNumber(potentialValue)
        request.updateBody({
          ...request.body(),
          potential: convertedPotential,
        })
      }

      const validatedData = await request.validate(NoteValidator)

      const { photo, ...dataWithoutPhoto } = validatedData

      let photoName = ''
      let photoPath = ''

      const photoFile = request.file('photo', {
        size: '2mb',
        extnames: ['jpg', 'png', 'jpeg'],
      })

      if (photoFile) {
        const hashName = `${uuidv4()}`
        await photoFile.move(Application.publicPath('uploads'), {
          name: hashName,
        })

        photoName = photoFile.clientName
        photoPath = `uploads/${hashName}`
      }

      const note = new Note()
      note.fill(dataWithoutPhoto)
      if (!auth.user) {
        throw new Error('Usuário não autenticado')
      }

      function convertValueToNumber(value) {
        if (!value || value.trim() === '') {
          return null
        }
        value = value.replace('R$', '').replace(/\./g, '').replace(',', '.')
        return parseFloat(value)
      }

      note.userId = auth.user.id
      note.potential = convertValueToNumber(potentialValue)
      note.description = request.input('description')
      note.categorization = request.input('categorization')
      note.reminder = DateTime.fromISO(request.input('reminder'))
      note.photoName = photoName
      note.photoPath = photoPath

      await note.save()

      session.flash('success', 'Nota salva com sucesso.')
      console.log('success')
    } catch (error) {
      console.log('Erro capturado:', error)

      if (error.code === 'E_VALIDATION_FAILURE') {
        session.flash('errors', error.messages)
      } else {
        session.flash('errors', { error: 'Ocorreu um erro durante o processamento.' })
      }
    }

    console.log('response')
    return response.redirect().back()
  }

  public async notes({ request, view }: HttpContextContract) {
    const page = request.input('page', 1)
    const limit = 10

    const notes = await Note.query().paginate(page, limit)
    notes.baseUrl('/notes')

    return view.render('notes', { notes })
  }
}
