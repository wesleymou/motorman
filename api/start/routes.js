'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
const Helpers = use('Helpers')

Route.group(() => {
  Route.resource('/user', 'UserController').apiOnly()
  Route.post('/user/restore/:id', 'UserController.restore')
  Route.resource('/permission', 'PermissionController').apiOnly()
  Route.resource('/group','GroupController').apiOnly()
  Route.resource('/team','TeamController').apiOnly()
}).prefix('api/v1')
.middleware('auth')

Route.group(() => {
  Route.post('/authenticate', 'AuthController.authenticate')
}).prefix('api/v1')

Route.any('*', ({ response }) => response.download(Helpers.publicPath('index.html')))
