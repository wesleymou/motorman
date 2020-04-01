'use strict'
const AdonisType = require('../../types')

/** @type {typeof AdonisType.Model} */
const Model = use('Model')
Model

/** @type {typeof AdonisType.Hash} */
const Hash = use('Hash')

class User extends Model {
  /** @type {string} */
  username

  /** @type {string} */
  password

  /** @type {string} */
  email

  /** @type {string} */
  nomeCompleto

  /** @type {string} */
  avatar

  /** @type {string} */
  telefone

  /** @type {string} */
  apelido

  /** @type {string} */
  rg

  /** @type {string} */
  cpf

  /** @type {string} */
  cep

  /** @type {string} */
  estado

  /** @type {string} */
  cidade

  /** @type {string} */
  bairro

  /** @type {string} */
  endereco

  /** @type {number} */
  numero

  /** @type {string} */
  complemento

  /** @type {number} */
  getPeso(peso) {
    return Number(peso) || null
  }

  /** @type {number} */
  altura

  /** @type {Date} */
  dataNasc

  /** @type {string} */
  nomeResponsavel

  /** @type {string} */
  telefoneResponsavel

  /** @type {string} */
  emailResponsavel

  /** @type {string} */
  grauParentescoResponsavel

  /** @type {string} */
  planoSaude

  /** @type {string} */
  sexo

  static get hidden() {
    return ['password']
  }

  static get dates() {
    return super.dates.concat(['dataNasc'])
  }

  static boot() {
    super.boot()

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }

      if (!userInstance.dirty.apelido) {
        userInstance.apelido = userInstance.nomeCompleto.split(' ')[0]
      }

      if (!userInstance.dirty.username) {
        userInstance.username = userInstance.email
      }
    })
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {typeof AdonisType.Relationship.HasMany}
   */
  tokens() {
    return this.hasMany('App/Models/Token')
  }

  /**
   * @method teams
   * @return {Object}
   */
  teams() {
    return this.manyThrough('App/Models/UserRole', 'team','id', 'user_id')
  }

/**
   * @method groups
   * @return {Object}
   */
  groups() {
    return this.manyThrough('App/Models/UserRole', 'group','id', 'user_id')
  }
}

module.exports = User