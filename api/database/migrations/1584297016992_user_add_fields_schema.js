'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserAddFieldsSchema extends Schema {
  up() {
    this.table('users', (table) => {
      table.string('avatar', 512)
      table.string('nomeCompleto')
      table.string('apelido')
      table.string('telefone')
      table.string('rg', 20)
      table.string('cpf', 11)
      table.string('cep', 8)
      table.string('estado')
      table.string('cidade')
      table.string('bairro')
      table.string('endereco')
      table.integer('numero')
      table.string('complemento')
      table.decimal('peso')
      table.integer('altura')
      table.datetime('dataNasc')
      table.string('nomeResponsavel')
      table.string('emailResponsavel')
      table.string('telefoneResponsavel')
      table.string('grauParentescoResponsavel')
      table.string('planoSaude')
      table.string('sexo')
      table.boolean('active').notNullable().defaultTo(true)
    })
  }

  down() {
    this.table('users', (table) => {
      table.dropColumns(
        'avatar',
        'nomeCompleto',
        'apelido',
        'telefone',
        'rg',
        'cpf',
        'cep',
        'estado',
        'cidade',
        'bairro',
        'endereco',
        'numero',
        'complemento',
        'peso',
        'altura',
        'dataNasc',
        'nomeResponsavel',
        'emailResponsavel',
        'telefoneResponsavel',
        'grauParentescoResponsavel',
        'planoSaude',
        'sexo',
        'active'
      )
    })
  }
}

module.exports = UserAddFieldsSchema
