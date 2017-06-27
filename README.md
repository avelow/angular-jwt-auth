# avelow-jwt-auth

**avelow-jwt-auth** est un module permettant la mise en place de *guards* pour angular2 pour gérer l'authentification et l'autorisation.

>L'**authentification** consiste à déterminer si quelqu'un est vraiment qui il prétend être.
>
>L'**autorisation** correspond à des règles qui déterminent qui est autorisé à faire quoi. Par exemple: Adam peut être autorisé à créer et à supprimer des bases de données, tandis qu'Osama n'est autorisé qu'à les lire.
>
> https://stackoverflow.com/a/6556548

## Comment fonctionne ce module ?

**avelow-jwt-auth** est basé sur la librairie [angular2-jwt](https://github.com/auth0/angular2-jwt) pour gérer les [Json Web Tokens (JWT)](https://jwt.io/introduction/).
Lors de l'authentification de l'utilisateur grâce au service fourni dans le module, le JWT retourné par l'API est stocké dans le *local storage* du navigateur.
Le JWT token contient les différents rôles possédés par l'utilisateur.

Les *guards* accèdent au JWT pour savoir si un utilisateur est correctement authentifié et pour savoir s'il possède les rôles nécessaires pour accèder à la route demandée.

## Installation

```
npm install avelow-jwt-auth --save
```

Le module fourni 1 service :
- `AvelowJwtAuthService` : permet d'authentifier un utilisateur et de récupérer le JWT.
et 2 guards :
- `AvelowJwtAuthGuard` : bloque une route aux utilisateurs non authentifiés
- `AvelowJwtRolesGuard` : bloque une route aux utilisateurs ne possèdant pas les rôles nécessaires.

## Utilisation Basique
### Protection des routes

On charge le module dans le `app.module.ts` en spécifiant la configuration pour le module.

```javascript
...
import { AvelowJwtAuthModule, AvelowJwtAuthConfig } from 'avelow-jwt-auth';

...

const AVELOW_JWT_AUTH_DI_CONFIG: AvelowJwtAuthConfig = {
	loginUrl: '/login',
	apiUrl: 'http://example.com/login_check'
	usernameParam: 'username',
	passwordParam: 'password',
	tokenName: 'id_token'
};

@NgModule({
  imports: [
	  AvelowJwtAuthModule.forRoot(AVELOW_JWT_AUTH_DI_CONFIG)
  ]
})
export class AppModule {}
```

On utilise les guards au niveau du `app.routing.module.ts`.

```javascript
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 
import { AvelowJwtAuthGuard, AvelowJwtRolesGuard } from 'avelow-jwt-auth';

const heroesRoutes: Routes = [
  { path: 'publicRoute',  component: ...},
  { 
	  path: 'authenticatedRoute', component: ...,
	  canActivate: [AvelowJwtAuthGuard]
  },
  {
	  path: 'moderatorRoute', component: ...,
	  canActivate: [AvelowJwtRolesGuard],
	  data: { roles:['ROLE_MODERATOR', 'ROLE_ADMIN'], accessDeniedUrl: '/login'}
  },
  {
	  path: 'adminRoute', component: ...,
	  canActivate: [AvelowJwtRolesGuard],
	  data: { roles:['ROLE_ADMIN'], accessDeniedUrl: '/restricted-area'}
  }
];
 
@NgModule({
  imports: [
    RouterModule.forChild(heroesRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class HeroRoutingModule { }
```

### Authentification

Pour gérer l'authentification des utilisateurs, il faut passer par le `service: AvelowJwtAuthService` et sa méthode `authenticate(username: string, password: string)`.
Il faut souscrire à cette méthode pour récupérer soit le token si tout c'est bien passé, soit l'erreur en cas d'échec au niveau de l'authentification.

Le format de la réponse dépends de la configuration de votre API.

```javascript
username = 'John';
password = 'password';

this.service.authenticate(username, password).subscribe(
    (token) => {
	    ...
    },
    (error) => {
	    ...
	    console.log(error);
    });
```

Le service propose aussi 3 autres méthodes pour se déconnecter, récupérer un boolean indiquant si un utilisateur est connecté et récupérer le token courant.

```javascript
this.service.logout(): void; 

this.service.loggedIn(): boolean;

this.service.decodedToken(): any;
```
## Communiquer avec l'API

L'objectif est de transmettre le token à l'API à chaque requête qui demande une authentification. Pour cela, il faut utilisater le service `AuthHttp` fourni par [angular2-jwt](https://github.com/auth0/angular2-jwt).
Il vous suffit de suivre les instructions données par angular2-jwt au sujet de [sa configuration](https://github.com/auth0/angular2-jwt/blob/master/README.md#basic-configuration)

**ATTENTION :** définissez bien le même nom de token dans la configuration de `AuthHttp` et dans la configuration du module `AvelowJwtAuthModule`

## Configuration de AvelowJwtAuthModule
- `loginUrl`: l'url de votre application angular permettant à l'utilisateur de se connecter.
- `apiUrl`: l'url de votre API permettant d'authentifier l'utilisateur
- `usernameParam`: le nom du paramètre contenant le nom d'utilisateur que votre API attends
- `passwordParam`: le nom du paramètre contenant le mot de passe de l'utilisateur que votre API attends
- `tokenName`: le nom du token stocké dans le *local storage*

## Configuration des routes pour AvelowJwtRolesGuard

Les routes protégées par `AvelowJwtRolesGuard` attendent 2 paramètres supplémentaires pour fonctionner :
- `roles`: le tableau des rôles ayant accès à cette route
- `accessDeniedUrl`: l'url vers laquelle l'utilisateur est redirigé s'il ne possède pas un des rôles.