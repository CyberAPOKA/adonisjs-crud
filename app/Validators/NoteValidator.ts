import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class NoteValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    description: schema.string([rules.required(), rules.maxLength(255)]),
    potential: schema.number([rules.required(), rules.range(0.01, 99999999.99)]),
    reminder: schema.date({}, [rules.required(), rules.after('today')]),
    categorization: schema.string([rules.required(), rules.maxLength(100)]),
  })

  public messages: CustomMessages = {
    'required': 'Este campo é obrigatório.',
    'maxLength': 'Máximo de :maxLength para este campo.',
    'photo.size': 'A foto deve ter no máximo 3MB de tamanho.',
    'potential.range': 'Insira um valor válido.',
    'reminder.after': 'A data do lembrete deve ser no futuro.',
    'reminder.dateFormat': 'Formato de data inválido.',
  }
}
