'use strict'
// @ts-chec

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

/** @type {typeof import('../../Models/Group')} */
const Group = use('App/Models/Group')

/** @type {typeof import('../../Models/Permission')} */
const Permission = use('App/Models/Permission')

/** @type {import('@adonisjs/lucid/src/Database')} */
const Database = use('Database')

class GroupController {
    /**
   * Show a list of all permissions available on system.
   * GET permissions
   *
   * @param {object} ctx
   * @param {Response} ctx.request
   * @param {Response} ctx.response
   */
    async index({ response }) {
        const groups = await Group.all()
        if (groups)
            response.json(groups.toJSON())
        else
            response.notFound()
    }

    async store({ request, response }) {
        const props = request.only(['name', 'description', 'permission_id'])

        const group = await Group.create({
            name: props.name,
            description: props.description
        })

        await group.permissions().attach(props.permission_id)

        response.created()
    }

    /**
    * @param {object} ctx
    * @param {Response} ctx.request
    * @param {Response} ctx.response
    */
    async show({ params, request, response }) {
        const { id } = params

        const group = await Group.find(id)

        if (group) {
            await group.load('permissions')
            response.json(group.toJSON())
        } else {
            response.notFound()
        }
    }

    async update({ params, request, response }) {

    }

    async destroy({ params, request, response }) {

    }

}

module.exports = GroupController
