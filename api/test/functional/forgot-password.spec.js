'use strict'

const moment = require('moment')

const Suite = use('Test/Suite')('Forgot Password')

const { test, trait, beforeEach, afterEach } = Suite

trait('Test/ApiClient')
trait('DatabaseTransactions')
trait('Auth/Client')

const Mail = use('Mail')
const Factory = use('Factory')
const Hash = use('Hash')

const Token = use('App/Models/Token')

test('envio de e-mail com link de recuperação', async ({ assert, client }) => {
  Mail.fake()

  const user = await Factory.model('App/Models/User').create()

  const response = await client.post(`/api/v1/forgot-password/request/${user.email}`).end()

  response.assertStatus(200)

  const recentEmail = Mail.pullRecent()
  assert.equal(recentEmail.message.to[0].address, user.email)

  Mail.restore()
})

test('alteração de senha com token de recuperação', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create()

  const token = await Token.createPasswordRecoveryToken(user.id)

  const payload = {
    token: token.token,
    password: 'NEWPASSWORD'
  }

  const response = await client
    .post('/api/v1/forgot-password/change')
    .send(payload)
    .end()

  response.assertStatus(200)

  await user.reload()
  await token.reload()

  const matches = await Hash.verify(payload.password, user.password)

  assert.isTrue(Boolean(matches))
  assert.isTrue(Boolean(token.is_revoked))
})

test('rejeitar token de recuperação expirado', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create({
    password: 'OLDPASSWORD'
  })

  // token expirado a 1h
  const token = await Token.createPasswordRecoveryToken(user.id)
  token.expires_at = moment().subtract(1, 'hour')
  await token.save()

  const payload = {
    token: token.token,
    password: 'NEWPASSWORD'
  }

  const response = await client
    .post('/api/v1/forgot-password/change')
    .send(payload)
    .end()

  await user.reload()

  const matches = await Hash.verify(payload.password, user.password)

  response.assertStatus(400)
  assert.isFalse(matches)
})


test('rejeitar token de recuperação já utilizado', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create({
    password: 'OLDPASSWORD'
  })

  // token já utililzado
  const token = await Token.createPasswordRecoveryToken(user.id)
  token.is_revoked = true
  await token.save()

  const payload = {
    token: token.token,
    password: 'NEWPASSWORD'
  }

  const response = await client
    .post('/api/v1/forgot-password/change')
    .send(payload)
    .end()

  await user.reload()

  const matches = await Hash.verify(payload.password, user.password)

  response.assertStatus(400)
  assert.isFalse(matches)
})