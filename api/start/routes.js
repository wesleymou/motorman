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

// Protected routes
Route.group(() => {
  Route.resource('/user', 'UserController').apiOnly()
  Route.post('/user/:id/change-password', 'UserController.changePassword')
  Route.post('/user/restore/:id', 'UserController.restore')

  Route.resource('/team', 'TeamController').apiOnly()
  Route.put('/team/restore/:id', 'TeamController.restore')

  Route.post('/team/:team_id/member/:user_id', 'TeamController.addMember')
  Route.delete('/team/:team_id/member/:user_id', 'TeamController.deleteMember')

  Route.resource('/permission', 'PermissionController').apiOnly()
  Route.resource('/group', 'GroupController').apiOnly()
})
  .prefix('api/v1')
  .middleware('auth')

Route.group(() => {
  Route.post('/authenticate', 'AuthController.authenticate')

  Route.post('/forgot-password/reset', 'ForgotPasswordController.reset')
  Route.post('/forgot-password/request/:email', 'ForgotPasswordController.request')
  Route.get('/forgot-password/verify/:token', 'ForgotPasswordController.verify')
}).prefix('api/v1')

Route.any('*', ({ response }) => response.download(Helpers.publicPath('index.html')))
