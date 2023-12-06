import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('register', 'IndexController.register')
  Route.get('login', 'IndexController.login').as('login')
  Route.post('register', 'AuthController.register')
  Route.post('login', 'AuthController.login')
})

Route.group(() => {
  Route.get('logout', 'AuthController.logout')
  Route.get('/', 'IndexController.index')
  Route.post('login', 'AuthController.login')
}).middleware('auth')
