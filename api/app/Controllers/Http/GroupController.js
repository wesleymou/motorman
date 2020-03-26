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

/** @type {require('@adonisjs/validator/src/Validator/index').validate} */
const { validate } = use('Validator')

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
            return response.json(groups.toJSON())
        else
            return response.notFound()
    }

    /**
     * 
     * @param {object} ctx
     * @param {Response} ctx.request
     * @param {Response} ctx.response
     */
    async store({ request, response }) {
        const data = request.only(['name', 'description'])
        const permission_id = request.only(['permission_id'])

        const rules = {
            name: 'required|string',
            description: 'required|string',
            permission_id: 'required|array'
        }

        const validation = await validate(request.all(), rules)

        if (validation.fails())
            return response.unprocessableEntity()

        const group = await Group.create(data)

        await group.permissions().attach(permission_id)


        return response.created()
    }

    /**
    * @param {object} ctx
    * @param {Response} ctx.request
    * @param {Response} ctx.response
    */
    async show({ params, request, response }) {

        const rules = {
            id: 'required|integer'
        }

        // group.permissions = await group.permissions().fetch()
        const validation = await validate(params, rules)

        if (validation.fails())
            return response.unprocessableEntity()

        const { id } = params

        const group = await Group.find(id)

        if (group) {
            await group.load('permissions')
            return response.json(group.toJSON())
        } else {
            return response.notFound()
        }
    }

    /**
     * 
     * @param {object} ctx
     * @param {Response} ctx.request
     * @param {Response} ctx.response
     */
    async update({ params, request, response }) {

        const { id } = params
        const data = request.only(['name', 'description'])
        const permission_id = request.only(['permission_id'])

        const rules = {
            id: 'required|integer',
            name: 'required|string',
            description: 'required|string',
            permission_id: 'array'
        }

        const validation = await validate({ ...params, ...request.all() }, rules)

        if (validation.fails())
            return response.unprocessableEntity()

        const group = await Group.find(id)

        if (group) {
            group.merge(data)
            await group.save()

            if (permission_id)
                await group.permissions().sync(permission_id)

            return response.ok()
        } else {
            return response.notFound()
        }

    }

    /**
     * 
     * @param {object} ctx
     * @param {Response} ctx.request
     * @param {Response} ctx.response
     */
    async destroy({ params, request, response }) {
        const { id } = params

        const rules = {
            id: 'required|integer'
        }

        const validation = await validate(params, rules)

        if (validation.fails())
            return response.unprocessableEntity()
            
        const group = await Group.find(id)

        if (group) {
            await group.delete()
            return response.ok()
        } else {
            return response.notFound()
        }

    }

}

module.exports = GroupController
