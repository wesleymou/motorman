/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const chance = require('chance')
const mail = require('../../mail')

/** @type {typeof import('../../Models/User')} */
const User = use('App/Models/User')

/** @type {typeof import('../../Models/Annotation')} */
const Annotation = use('App/Models/Annotation')

const { validate } = use('Validator')

/**
 * Resourceful controller for interacting with users
 */
class UserController {
  /**
   * Show a list of all users.
   * GET user
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async index({ response }) {
    const users = await User.query()
      .with('teams')
      .with('plan')
      .with('logs', (builder) => {
        builder.with('logType')
      })
      .with('annotations')
      .fetch()

    return response.json(users.toJSON())
  }

  /**
   * Search users by name.
   * GET user/search
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async search({ request, response }) {
    const { fullName } = request.qs

    const users = await User.query()
      .where('fullName', 'ilike', `%${fullName}%`)
      .with('roles', (builder) => {
        builder.with('team')
        builder.with('role')
      })
      .fetch()
    return response.json(users.toJSON())
  }

  /**
   * Create/save a new user.
   * POST user
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const payload = request.only([
      'username',
      'email',
      'fullName',
      'avatar',
      'phone',
      'nickname',
      'rg',
      'cpf',
      'cep',
      'state',
      'city',
      'neighborhood',
      'street',
      'buildingNumber',
      'complement',
      'weight',
      'height',
      'dob',
      'emergencyName',
      'emergencyPhone',
      'emergencyEmail',
      'emergencyConsanguinity',
      'healthInsurance',
      'sex',
      'plan_id',
    ])

    const generatedPassword = chance().string({
      length: 8,
      alpha: true,
      numeric: true,
      symbols: false,
    })

    const user = await User.create({
      ...payload,
      password: generatedPassword,
      active: true,
    })

    try {
      if (user.plan_id) {
        await user.load('plan')
      }

      await mail.sendWelcomeMessage({
        ...user,
        to: user.email,
        generatedPassword,
      })

      return response.created(user.toJSON())
    } catch (error) {
      await user.delete()
      return response.internalServerError('Internal Server Error')
    }
  }

  /**
   * Display a single user.
   * GET user/:id
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, response }) {
    const users = await User.all()
    response.json(users.toJSON())

    const { id } = params

    const user = await User.query()
      .with('roles', (userRole) => {
        userRole.with('role')
        userRole.with('team')
      })
      .with('group')
      .with('logs', (build) => {
        build.with('logType')
      })
      .with('annotations')
      .with('plan')
      .where('id', id)
      .first()

    if (user) {
      return response.json(user.toJSON())
    }
    return response.notFound()
  }

  /**
   * Update user details.
   * PUT or PATCH user/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const { id } = params

    const payload = request.only([
      'username',
      'email',
      'fullName',
      'avatar',
      'phone',
      'nickname',
      'rg',
      'cpf',
      'cep',
      'state',
      'city',
      'neighborhood',
      'street',
      'buildingNumber',
      'complement',
      'weight',
      'height',
      'dob',
      'emergencyName',
      'emergencyPhone',
      'emergencyEmail',
      'emergencyConsanguinity',
      'healthInsurance',
      'sex',
      'plan_id',
    ])

    const user = await User.find(id)

    if (user) {
      user.merge(payload)
      await user.save()
      return response.status(200).send()
    }

    return response.status(404).send()
  }

  /**
   * Delete a user with id.
   * DELETE user/:id
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async destroy({ params, response }) {
    const { id } = params
    const user = await User.find(id)

    if (user) {
      user.active = false
      await user.save()
      return response.status(200).send()
    }

    return response.status(404).send()
  }

  /**
   * Delete a user with id.
   * POST user/restore/:id
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async restore({ params, response }) {
    const { id } = params
    const user = await User.find(id)

    if (user) {
      user.active = true
      await user.save()
      return response.status(200).send('OK')
    }

    return response.status(404).send('OK')
  }

  /**
   * Update the user password
   * POST user/:id/change-password
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async changePassword({ params, request, response, auth }) {
    const { id } = params
    const { currentPassword, password } = request.body

    const user = await User.find(id)

    if (user) {
      const verified = await auth.attempt(user.email, currentPassword)

      if (verified) {
        user.password = password
        await user.save()

        const token = await auth.generate(user, { user: user.toJSON() })

        return response.status(200).send(token)
      }
    }
    return response.status(400).send('Bad Request')
  }

  /**
   * Create/save a new annotation.
   * POST annotation
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async storeAnnotation({ params, request, response }) {
    const rules = {
      id: 'required|integer',
      tittle: 'required|string',
      annotation: 'required|string',
    }

    const validation = await validate({ ...params, ...request.all() }, rules)

    if (validation.fails()) return response.unprocessableEntity()

    const { id } = params
    const data = request.only(['tittle', 'annotation'])

    const annotation = Object.assign(new Annotation(), { ...data })

    const user = await User.find(id)

    if (user) {
      await user.annotations().save(annotation)
      return response.created()
    }
    return response.notFound()
  }

  /**
   * Update/edit a annotation.
   * UPDATE annotation
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async updateAnnotation({ params, request, response }) {
    const rules = {
      user_id: 'required|integer',
      annotation_id: 'required|integer',
      tittle: 'required|string',
      annotation: 'required|string',
    }

    const validation = await validate({ ...params, ...request.all() }, rules)

    if (validation.fails()) return response.unprocessableEntity()

    const { user_id, annotation_id } = params
    const data = request.only(['tittle', 'annotation'])

    const annotation = await Annotation.query().where({ id: annotation_id, user_id }).first()

    if (annotation) {
      annotation.merge(data)
      await annotation.save()
      return response.noContent()
    }
    return response.notFound()
  }

  async destroyAnnotation({ params, response }) {
    const rules = {
      user_id: 'required|integer',
      annotation_id: 'required|integer',
    }

    const validation = await validate(params, rules)

    if (validation.fails()) return response.unprocessableEntity()

    const { user_id, annotation_id } = params

    const deleted = await Annotation.query()
      .where({
        id: annotation_id,
        user_id,
      })
      .delete()

    if (deleted) {
      return response.noContent()
    }
    return response.notFound()
  }
}

module.exports = UserController
