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
  Route.resource('/user', 'UserController')
    .apiOnly()
    .middleware(['access:application/users/manage'])

  Route.post('/user/restore/:id', 'UserController.restore').middleware([
    'access:application/users/manage',
  ])
  Route.post('/user/:id/annotation', 'UserController.storeAnnotation').middleware([
    'access:application/users/manage',
  ])
  Route.put(
    '/user/:user_id/annotation/:annotation_id',
    'UserController.updateAnnotation'
  ).middleware(['access:application/users/manage'])
  Route.delete(
    '/user/:user_id/annotation/:annotation_id',
    'UserController.destroyAnnotation'
  ).middleware(['access:application/users/manage'])

  Route.post('/user/:id/change-password', 'UserController.changePassword')

  Route.resource('/team', 'TeamController')
    .apiOnly()
    .middleware(['access:application/teams/manage'])

  Route.put('/team/restore/:id', 'TeamController.restore').middleware([
    'access:application/teams/manage',
  ])

  Route.post('/team/:team_id/member/:user_id', 'TeamController.addMember').middleware([
    'access:application/teams/manage',
  ])

  Route.delete('/team/:team_id/member/:user_id', 'TeamController.deleteMember').middleware([
    'access:application/teams/manage',
  ])

  Route.resource('/permission', 'PermissionController').apiOnly()
  Route.resource('/group', 'GroupController').apiOnly()

  Route.resource('/event', 'EventController').apiOnly()
  Route.get('/event/:log_id/user/:user_id', 'EventController.showLogUser')
  Route.put('/event/:log_id/user/:user_id', 'EventController.updateLogUser')
  Route.delete('/event/:log_id/user/:user_id', 'EventController.destroyLogUser')
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
