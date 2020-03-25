'use strict'

/** @typedef {import('@adonisjs/framework/src/Response')} Response */

/** @type {typeof import('../../Models/Permission')} */
const Permission = use('App/Models/Permission')

class PermissionController {
    /**
   * Show a list of all permissions available on system.
   * GET permissions
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
    async index({ response }) {
        const permission = await Permission.all()
        if (permission)
            response.json(permission.toJSON())
        else
            response.notFound()
    }

    async store({ response }) {
        response.notImplemented()
    }

    /**
   * Show a list of all permissions available on system.
   * GET permissions
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
    async show({ response }) {
        const permission = await Permission.all()
        if (permission)
            response.json(permission.toJSON())
        else
            response.notFound()
    }

    async update({ request, response }) {
        response.notImplemented()
    }

    async destroy({ request, response }) {
        response.notImplemented()
    }



}

module.exports = PermissionController
