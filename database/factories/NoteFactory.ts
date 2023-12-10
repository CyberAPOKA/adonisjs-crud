import Factory from '@ioc:Adonis/Lucid/Factory'
import Note from 'App/Models/Note'
import { DateTime } from 'luxon'

export const NoteFactory = Factory.define(Note, ({ faker }) => {
  return {
    userId: faker.number.int({ min: 1, max: 10 }),
    description: faker.lorem.sentence(),
    potential: faker.number.float({ min: 1000, max: 10000, precision: 0.01 }),
    categorization: faker.helpers.arrayElement([
      'Urgente',
      'Importante',
      'Média',
      'Baixa',
      'Rotina',
    ]),
    reminder: DateTime.fromJSDate(faker.date.future()),
  }
}).build()
