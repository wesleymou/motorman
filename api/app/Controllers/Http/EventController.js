/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

/** @type {typeof import('../../Models/Log')} */
const Log = use('App/Models/Log')

/** @type {typeof import('../../Models/Team')} */
const Team = use('App/Models/Team')

/** @type {typeof import('../../Models/LogType')} */
const LogType = use('App/Models/LogType')

/** @type {typeof import('../../Models/User')} */
const User = use('App/Models/User')

/** @type {require('@adonisjs/validator/src/Validator/index').validate} */
const { validate } = use('Validator')

class EventController {
  /**
   * Show a list of all events available on system.
   * GET events
   *
   * @param {object} ctx
   * @param {Response} ctx.request
   * @param {Response} ctx.response
   */
  async index({ response }) {
    const logs = await Log.query()
      .with('users')
      .with('teams')
      .with('logType')
      .where('active', true)
      .fetch()

    if (logs) return response.json(logs.toJSON())
    return response.notFound()
  }

  /**
   *
   * @param {object} ctx
   * @param {Response} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const data = request.only(['start_date', 'end_date', 'comments'])
    const { teams, logType } = request.only(['teams', 'logType'])
    const users = new Set(request.input('users'))

    const rules = {
      start_date: 'required|date',
      end_date: 'date',
      comments: 'string',
      teams: 'array',
      users: 'array',
      logType: 'required|integer',
    }

    const validation = await validate(request.all(), rules)

    if (validation.fails()) return response.unprocessableEntity()

    const allTeamDB = await Team.query().with('members').where('active', true).fetch()
    const teamDB = allTeamDB.toJSON()

    teamDB.forEach((team) => {
      if (teams.includes(team.id)) team.members.forEach((members) => users.add(members.user_id))
    })

    const log = Object.assign(new Log(), {
      ...data,
    })
    await log.save()

    await log.users().attach([...users])
    await log.teams().attach(teams)
    await log.logType().associate(await LogType.find(logType))

    return response.created()
  }

  /**
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async show({ params, response }) {
    const rules = {
      id: 'required|integer',
    }

    const validation = await validate(params, rules)

    if (validation.fails()) return response.unprocessableEntity()

    const { id } = params

    const log = await Log.query()
      .with('users')
      .with('teams')
      .with('logType')
      .where('id', id)
      .where('active', true)
      .firstOrFail()

    if (log) {
      return response.json(log.toJSON())
    }
    return response.notFound()
  }

  /**
   *
   * @param {object} ctx
   * @param {Response} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const rules = {
      id: 'required|integer',
      start_date: 'required|date',
      end_date: 'date',
      comments: 'string',
      teams: 'array',
      users: 'array',
      logType: 'required|integer',
    }

    const validation = await validate({ ...params, ...request.all() }, rules)

    if (validation.fails()) return response.unprocessableEntity()

    const { id } = params
    const data = request.only(['start_date', 'end_date', 'comments'])
    const { teams, logType } = request.only(['teams', 'logType'])
    const users = new Set(request.input('users'))

    const allTeamDB = await Team.query().with('users').where('active', true).fetch()
    const teamDB = allTeamDB.toJSON()

    teamDB.forEach((team) => {
      if (teams.includes(team.id)) team.users.forEach((user) => users.add(user.id))
    })

    const log = await Log.query()
      .with('users')
      .with('teams')
      .with('logType')
      .where('id', id)
      .where('active', true)
      .firstOrFail()

    if (log) {
      log.merge(data)
      await log.save()

      await log.users().sync([...users])
      await log.teams().sync(teams)

      await log.logType().associate(await LogType.find(logType))

      return response.noContent()
    }
    return response.notFound()
  }

  /**
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async destroy({ params, response }) {
    const rules = {
      id: 'required|integer',
    }

    const validation = await validate(params, rules)

    if (validation.fails()) return response.unprocessableEntity()

    const { id } = params

    const log = await Log.find(id)

    if (log) {
      log.merge({ active: false })
      await log.save()

      return response.noContent()
    }
    return response.notFound()
  }

  async showLogUser({ params, response }) {
    const rules = {
      log_id: 'required|integer',
      user_id: 'required|integer',
    }

    const validation = await validate(params, rules)

    if (validation.fails()) return response.unprocessableEntity()

    const { log_id, user_id } = params

    const user = await User.query()
      .with('logs', (builder) => {
        builder.with('teams').with('logType').where('log_id', log_id)
      })
      .where('id', user_id)
      .where('active', true)
      .first()

    if (user) return response.json(user.toJSON())
    return response.notFound()
  }

  async updateLogUser({ params, request, response }) {
    const rules = {
      log_id: 'required|integer',
      user_id: 'required|integer',
      justification: 'string',
      points: 'integer',
      presence: 'required|boolean',
    }

    const validation = await validate({ ...params, ...request.all() }, rules)

    if (validation.fails()) return response.unprocessableEntity()

    const { log_id, user_id } = params
    const { justification, points, presence } = request.all()

    const log = await Log.query()
      .with('users', (builder) => {
        builder.where('user_id', user_id)
      })
      .where('id', log_id)
      .where('active', true)
      .first()

    if (log) {
      // eslint-disable-next-line camelcase
      await log.users().detach([user_id])
      // eslint-disable-next-line camelcase
      await log.users().attach([user_id], (pivot) => {
        // eslint-disable-next-line no-param-reassign
        pivot.justification = justification
        // eslint-disable-next-line no-param-reassign
        pivot.points = points
        // eslint-disable-next-line no-param-reassign
        pivot.presence = presence
      })
      return response.noContent()
    }
    return response.notFound()
  }

  async destroyLogUser({ params, response }) {
    const rules = {
      log_id: 'required|integer',
      user_id: 'required|integer',
    }

    const validation = await validate(params, rules)

    if (validation.fails()) return response.unprocessableEntity()

    const { log_id, user_id } = params

    const log = await Log.find(log_id)

    if (log) {
      // eslint-disable-next-line camelcase
      await log.users().detach([user_id])
      return response.noContent()
    }
    return response.notFound()
  }
}

module.exports = EventController
