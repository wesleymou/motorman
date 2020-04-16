'use strict'
const AdonisType = require('../../../types')

/** @typedef {typeof AdonisType.Http.Request} Request */
/** @typedef {typeof AdonisType.Http.Response} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/** @type {typeof import('../../Models/Team')} */
const Team = use('App/Models/Team')

/** @type {typeof import('../../Models/Role')} */
const Role = use('App/Models/Role')

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
    const teams = await Team.all()
    if (teams) return response.json(teams.toJSON())
    else return response.notFound()
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

    if (validation.fails()) return response.unprocessableEntity()

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

    if (validation.fails()) return response.unprocessableEntity()

    const team = await Team.query()
      .where({ id })
      .with('members', members => {
        members.with('user')
        members.with('group')
      })
      .fetch()

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
   * POST teams/enroll/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async createEnroll({ params, request, response }) {
    const { id } = params
    const { group_name, user_id } = request.only(['group_name', 'user_id'])

    const rules = {
      id: 'required|integer',
      group_name: 'required|string',
      user_id: 'required|integer',
    }

    const validation = await validate({ ...params, ...request.all() }, rules)

    if (validation.fails()) return response.unprocessableEntity()

    const team = await Team.find(id)
    const group = await Group.findBy('name', group_name)

    if (team && group) {
      await Role.create({ team_id: id, user_id, group_id: group.id })

      return response.noContent()
    } else return response.notFound()
  }

  /**
   * Delete enroll between users and team.
   * POST teams/enroll/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async deleteEnroll({ params, request, response }) {
    const { id } = params
    const { group_name, user_id } = request.only(['group_name', 'user_id'])

    const rules = {
      id: 'required|integer',
      group_name: 'required|string',
      user_id: 'required|integer',
    }

    const validation = await validate({ ...params, ...request.all() }, rules)

    if (validation.fails()) return response.unprocessableEntity()

    const group = await Group.findBy('name', group_name)

    if (group) {
      const Role = await Role.query()
        .where({ team_id: id, user_id, group_id: group.id })
        .first()

      if (Role) {
        await Role.delete()

        const team = await Team.find(id)
        return response.noContent()
      }
    } else return response.notFound()
  }
}

module.exports = TeamController
