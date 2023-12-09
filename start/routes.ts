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
  Route.post('create-note', 'NoteController.store')
  Route.get('minhas-anotacoes', 'NoteController.notes')
}).middleware('auth')
