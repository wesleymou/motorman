'use strict'
const AdonisType = require('../../../types')

/** @typedef {typeof AdonisType.Http.Request} Request */
/** @typedef {typeof AdonisType.Http.Response} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/** @type {typeof import('../../Models/Team')} */
const Team = use('App/Models/Team')

/** @type {typeof import('../../Models/User')} */
const User = use('App/Models/User')

/** @type {typeof import('../../Models/Role')} */
const Role = use('App/Models/Role')

/** @type {typeof import('../../Models/UserRole')} */
const UserRole = use('App/Models/UserRole')

/** @type {typeof import('../../Models/Group')} */
const Group = use('App/Models/Group')

const { validate } = use('Validator')

/**
 * Resourceful controller for interacting with teams
 */
class TeamController {
  /**
   * Show a list of all teams.
   * GET teams
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    const teams = await Team.query()
      .with('members', role => {
        role.with('role')
        role.with('user')
      })
      .fetch()
    return response.json(teams.toJSON())
  }

  /**
   * Create/save a new team.
   * POST teams
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const data = request.only(['name', 'description'])

    const rules = {
      name: 'required|string',
      description: 'required|string',
    }

    const validation = await validate(request.all(), rules)

    if (validation.fails()) {
      return response.unprocessableEntity()
    }

    const team = await Team.create(data)

    response.json(team.toJSON())
    return response.created()
  }

  /**
   * Display a single team.
   * GET teams/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response }) {
    const { id } = params

    const rules = {
      id: 'required|integer',
    }

    const validation = await validate(params, rules)

    if (validation.fails()) {
      return response.unprocessableEntity()
    }

    const team = await Team.query()
      .where({ id })
      .with('members', role => {
        role.with('role')
        role.with('user')
      })
      .first()

    if (team) {
      return response.json(team)
    } else {
      return response.notFound()
    }
  }

  /**
   * Update team details.
   * PUT or PATCH teams/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const { id } = params
    const data = request.only(['name', 'description'])

    const rules = {
      id: 'required|integer',
      name: 'required|string',
      description: 'required|string',
    }

    const validation = await validate({ id: id, ...data }, rules)

    if (validation.fails()) return response.unprocessableEntity()

    const team = await Team.find(id)

    if (team) {
      team.merge(data)
      await team.save()
      response.json(team.toJSON())
      response.ok()
      return
    } else return response.notFound()
  }

  /**
   * Set a team to inactive.
   * DELETE teams/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const { id } = params

    const rules = {
      id: 'required|integer',
    }

    const validation = await validate(params, rules)

    if (validation.fails()) return response.unprocessableEntity()

    const team = await Team.find(id)

    if (team) {
      team.merge({ active: false })
      await team.save()

      return response.json(team.toJSON())
    } else return response.notFound()
  }

  /**
   * Set a team to active.
   * PUT teams/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async restore({ params, request, response }) {
    const { id } = params

    const rules = {
      id: 'required|integer',
    }

    const validation = await validate(params, rules)

    if (validation.fails()) return response.unprocessableEntity()

    const team = await Team.find(id)

    if (team) {
      team.merge({ active: true })
      await team.save()

      return response.json(team.toJSON())
    } else return response.notFound()
  }

  /**
   * Enroll users in a team.
   * POST team/:team_id/member/:user_id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async addMember({ params, request, response }) {
    const { team_id, user_id } = params
    const { group_id, role_id } = request.only(['group_id', 'user_id', 'role_id'])

    const rules = {
      team_id: 'required|integer',
      user_id: 'required|integer',
      //group_id: 'required|integer',
      role_id: 'required|integer',
    }

    const validation = await validate({ ...params, ...request.all() }, rules)

    if (validation.fails()) {
      return response.unprocessableEntity()
    }

    const user = await User.find(user_id)
    const team = await Team.find(team_id)
    // const group = await Group.find(group_id)
    const role = await Role.find(role_id)

    if (user && team && role /* &&  group */) {
      const userRole = await UserRole.create({
        team_id,
        user_id,
        role_id,
        group_id: 1,
      })

      await userRole.loadMany(['user', 'role'])

      return response.send(userRole.toJSON())
    } else {
      return response.notFound()
    }
  }

  /**
   * Delete enroll between users and team.
   * DELETE team/:team_id/member/:user_id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async deleteMember({ params, request, response }) {
    const { team_id, user_id } = params

    const rules = {
      team_id: 'required|integer',
      user_id: 'required|integer',
    }

    const validation = await validate(params, rules)

    if (validation.fails()) {
      return response.unprocessableEntity()
    }

    await UserRole.query()
      .where({
        team_id,
        user_id
      })
      .delete()

    return response.send('Ok')
  }
}

module.exports = TeamController
