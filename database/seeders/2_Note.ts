import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { NoteFactory } from '../factories/NoteFactory'

export default class NoteSeeder extends BaseSeeder {
  public async run() {
    await NoteFactory.createMany(50)
  }
}
