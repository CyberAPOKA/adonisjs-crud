import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'notes'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
      table.text('description')
      table.decimal('potential', 8, 2)
      table.string('categorization')
      table.dateTime('reminder')
      table.string('photo_name')
      table.string('photo_path')
      table.timestamps(true, true)
      
    });
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
