import Route from '@ioc:Adonis/Core/Route';

Route.get('/', 'IndexController.index')

Route.group(() => {
  Route.post('register', 'AuthController.register');
  Route.post('login', 'AuthController.login');
  Route.post('logout', 'AuthController.logout');
  Route.post('password/forgot', 'AuthController.forgotPassword');
  Route.post('password/reset', 'AuthController.resetPassword');
}).prefix('auth');
