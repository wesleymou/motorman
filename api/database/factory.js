'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

const Hash = use('Hash')

Factory.blueprint('App/Models/User', async (faker, i, data) => {
  return {
    username: faker.username(),
    email: faker.email(),
    password: await Hash.make(faker.password()),
    avatar: `https://api.adorable.io/avatars/285/${faker.string().replace()}.png`,
    nomeCompleto: faker.name(),
    apelido: faker.first(),
    telefone: faker.phone({ formatted: false, country: 'br' }),
    rg: faker.ssn({ dashes: false }),
    cpf: faker.cpf().replace(/\D/g, ''),
    cep: faker.zip().padEnd(8, '0'),
    estado: faker.state(),
    cidade: faker.city(),
    bairro: faker.word(),
    endereco: faker.street(),
    numero: faker.natural({ max: 50000 }),
    complemento: faker.string({ length: 8, casing: 'upper', alpha: true, numeric: true }),
    peso: faker.floating({ min: 0, max: 300 }),
    altura: faker.natural({ max: 250 }),
    dataNasc: faker.birthday(),
    nomeResponsavel: faker.name(),
    emailResponsavel: faker.email(),
    telefoneResponsavel: faker.phone({ formatted: false }),
    grauParentescoResponsavel: faker.word(),
    planoSaude: faker.word(),
    sexo: faker.pickone(['Feminino', 'Masculino']),
    active: 1,
    ...data,
  }
})

Factory.blueprint('App/Models/Token', async (faker, i, data) => {
  return {
    user_id: faker.natural({ max: 100 }),
    type: 'jwt_refresh_token',
    token: faker.guid(),
  }
})

Factory.blueprint('App/Models/Permission', async (faker, i, data) => {
  return {
    name: faker.string({ length: 10 }),
    description: faker.string({ length: 50 }),
    ...data,
  }
})

Factory.blueprint('App/Models/Group', async (faker, i, data) => {
  return {
    name: faker.string({ length: 10 }),
    description: faker.string({ length: 50 }),
    ...data,
  }
})

Factory.blueprint('App/Models/Team', async (faker, i, data) => {
  return {
    name: faker.string({ length: 10 }).replace('%', ''),
    description: faker.string({ length: 50 }),
    ...data,
  }
})
