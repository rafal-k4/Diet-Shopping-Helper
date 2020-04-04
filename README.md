# Github Page Deploy:

In order to deploy for github static page, run this command:

````
> ng build --prod --output-path docs --base-href /Diet-Shopping-Helper/
````

> ##### Step below is deprecated, do not do this (check next section -> Github Page 404 FIX) 
> Next, make a copy of `docs/index.html` and name it `docs/404.html`

Commit your changes, push and make sure that settings section of github pages is set to `master/docs`

<br>

Another option is to use dedicated helper, guide under this url:

<https://github.com/angular-schule/angular-cli-ghpages>

# Github Page 404 Fix:

In order to fix ` "404 - page not found" ` in github pages, we need do add automatically redirect to the base href url, using web browser localStorage property.

Guide for this approach is here: <https://shermandigital.com/blog/fix-404-errors-from-angular-projects-hosted-on-github-pages/>

 ## :warning: **WARGNING**

This fix exclude copy of `docs/index.html` into `docs/404.html` because we need to create predefined `404.html` file which is used as a proxy for redirecting to application base href!

# DietShoppingHelper

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
