/*
|--------------------------------------------------------------------------
| Application middleware
|--------------------------------------------------------------------------
|
| This file is used to define middleware for HTTP requests. You can register
| middleware as a `closure` or an IoC container binding. The bindings are
| preferred, since they keep this file clean.
|
*/

import Server from '@ioc:Adonis/Core/Server'

/*
|--------------------------------------------------------------------------
| Global middleware
|--------------------------------------------------------------------------
|
| An array of global middleware, that will be executed in the order they
| are defined for every HTTP requests.
|
*/
Server.middleware.register([() => import('@ioc:Adonis/Core/BodyParser')])

/*
|--------------------------------------------------------------------------
| Named middleware
|--------------------------------------------------------------------------
|
| Named middleware are defined as key-value pair. The value is the namespace
| or middleware function and key is the alias. Later you can use these
| alias on individual routes. For example:
|
| { auth: () => import('App/Middleware/Auth') }
|
| and then use it as follows
|
| Route.get('dashboard', 'UserController.dashboard').middleware('auth')
|
*/
Server.middleware.registerNamed({
  auth: 'App/Middleware/Auth',
})

import View from '@ioc:Adonis/Core/View'

View.global('formatCurrency', (value) => {
    return `R$ ${parseFloat(value).toFixed(2).replace('.', ',')}`;
});

View.global('formatDate', (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString('pt-BR');
});

View.global('getBgColor', (categorization) => {
  switch (categorization) {
      case 'Urgente':
          return 'bg-red-600';
      case 'Importante':
          return 'bg-orange-500';
      case 'Média':
          return 'bg-yellow-400';
      case 'Baixa':
          return 'bg-green-600';
      case 'Rotina':
          return 'bg-blue-600';
      default:
          return '';
  }
});